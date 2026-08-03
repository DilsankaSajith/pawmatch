import { withApiKeyAuth } from '@/lib/auth/with-api-key';
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';

const similarityRequestSchema = z.object({
  text1: z.string().min(1, 'First text cannot be empty'),
  text2: z.string().min(1, 'Second text cannot be empty'),
});

const similarityResponseSchema = z.object({
  score: z.number(),
  label: z.enum(['similar', 'not_relevant', 'maybe']),
});

// cosine similarity function
const cosineSimilarity = (
  firstEmbArray: number[],
  secondEmbArray: number[],
) => {
  const dot = firstEmbArray.reduce(
    (sum, val, i) => sum + val * secondEmbArray[i],
    0,
  );
  const normA = Math.sqrt(
    firstEmbArray.reduce((sum, val) => sum + val * val, 0),
  );
  const normB = Math.sqrt(
    secondEmbArray.reduce((sum, val) => sum + val * val, 0),
  );
  return dot / (normA * normB);
};

// calling hugging face for convert text into numbers array
const getEmbedding = async (text: string) => {
  const HF_MODEL =
    process.env.HF_MODEL || 'sentence-transformers/all-MiniLM-L6-v2';
  const HF_TOKEN = process.env.HF_TOKEN;

  if (!HF_TOKEN) throw new Error('Missing Hugging Face token');

  const response = await fetch(
    `https://router.huggingface.co/hf-inference/models/${HF_MODEL}/pipeline/feature-extraction`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: text }),
    },
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`HF API Error: ${response.status} - ${err}`);
  }

  return await response.json();
};

// get relevent label to the score
const getLabel = (score: number): 'similar' | 'not_relevant' | 'maybe' => {
  if (score > 0.8) return 'similar';
  if (score < 0.3) return 'not_relevant';
  return 'maybe';
};

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const { text1, text2 } = similarityRequestSchema.parse(body);

//     const emb1 = await getEmbedding(text1);
//     const emb2 = await getEmbedding(text2);

//     const score = cosineSimilarity(emb1, emb2);
//     const label = getLabel(score);

//     const response = { score, label };

//     similarityResponseSchema.parse(response);

//     return NextResponse.json(response, { status: 200 });
//   } catch (err: any) {
//     return NextResponse.json(
//       { error: err.message ?? 'Internal server error. Please try again later' },
//       { status: 400 },
//     );
//   }
// }

export const POST = withApiKeyAuth(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { text1, text2 } = similarityRequestSchema.parse(body);

    const emb1 = await getEmbedding(text1);
    const emb2 = await getEmbedding(text2);

    const score = cosineSimilarity(emb1, emb2);
    const label = getLabel(score);

    const response = { score, label };

    similarityResponseSchema.parse(response);

    return NextResponse.json(response, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message ?? 'Internal server error. Please try again later' },
      { status: 400 },
    );
  }
});
