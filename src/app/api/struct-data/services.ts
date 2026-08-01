import { z } from 'zod';
import { AllowedType } from './types';
import { structureUnstructuredData } from '@/lib/gemini-helper';

export function generateZodSchema(format: Record<string, AllowedType>) {
  const schemaObject: Record<string, z.ZodType> = {};

  for (const [key, type] of Object.entries(format)) {
    let zodType: z.ZodType;

    switch (type) {
      case 'string':
        zodType = z.string().nullable().optional();
        break;
      case 'number':
        zodType = z.number().nullable().optional();
        break;
      case 'boolean':
        zodType = z.boolean().nullable().optional();
        break;
      case 'date':
        zodType = z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)')
          .nullable()
          .optional();
        break;
      case 'enum':
        zodType = z.string().nullable().optional();
        break;
      default:
        zodType = z.any().nullable().optional();
    }

    schemaObject[key] = zodType;
  }

  return z.object(schemaObject);
}

// Validate data against the generated schema
export function validateStructuredData(
  data: Record<string, any>,
  format: Record<string, AllowedType>,
) {
  try {
    const schema = generateZodSchema(format);
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Validation failed`);
    }
    throw error;
  }
}

// Main service function
export async function processStructuredData(
  text: string,
  format: Record<string, AllowedType>,
) {
  try {
    // 1. Extract using gemini
    const extractionResult = await structureUnstructuredData(text, format);
    if (!extractionResult.success) {
      return {
        success: false,
        error: extractionResult.error || 'Failed to extract data',
        rawResponse: extractionResult.rawResponse,
      };
    }

    // 2. Validate the extracted data
    const validatedData = validateStructuredData(extractionResult.data, format);

    return {
      success: true,
      data: validatedData,
      rawResponse: extractionResult.rawResponse,
    };
  } catch (error) {
    console.error('Processing Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      rawResponse: null,
    };
  }
}
