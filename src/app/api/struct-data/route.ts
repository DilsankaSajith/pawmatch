import { NextRequest, NextResponse } from 'next/server';
import { processStructuredData } from './services';
import { StructuredDataRequestSchema } from './types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validationResult = StructuredDataRequestSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request format',
        },
        { status: 400 },
      );
    }

    const { text, format } = validationResult.data;
    const result = await processStructuredData(text, format);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Processing failed',
          rawResponse: result.rawResponse,
        },
        { status: 422 },
      );
    }

    // Return success response
    return NextResponse.json({
      success: true,
      data: result.data,
      rawResponse: result.rawResponse,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 },
    );
  }
}
