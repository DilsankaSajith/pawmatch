import { NextRequest, NextResponse } from 'next/server';
import { analyzeStrayImage } from '@/lib/gemini-helper';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image') as File;

    if (!imageFile) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Convert file to base64
    const buffer = await imageFile.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');

    // Analyze with Gemini
    const analysis = await analyzeStrayImage(base64, imageFile.type);

    // Add metadata
    const result = {
      ...analysis,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze image' },
      { status: 500 },
    );
  }
}
