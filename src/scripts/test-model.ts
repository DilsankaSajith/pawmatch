import { pipeline, env } from '@huggingface/transformers';

env.cacheDir = './.model-cache';

async function main() {
  const generator = await pipeline(
    'text2text-generation',
    'Xenova/LaMini-Flan-T5-783M',
  );

  const result = await generator(
    "Extract the pet's name from this text: Pet ID P-3921, goes by the name Luna.",
    { max_new_tokens: 32 },
  );

  console.log(result);
}

main();
