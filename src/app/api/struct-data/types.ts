import { z } from 'zod';

export const ALLOWED_TYPES = [
  'string',
  'number',
  'boolean',
  'date',
  'enum',
] as const;
export type AllowedType = (typeof ALLOWED_TYPES)[number];

// Zod schema for request validation
export const StructuredDataRequestSchema = z.object({
  text: z.string().min(1, 'Text cannot be empty'),
  format: z.record(
    z.string(),
    z
      .enum(ALLOWED_TYPES)
      .refine(
        (format) => Object.keys(format).length > 0,
        'Format must have at least one field',
      ),
  ),
});

export type StructuredDataRequest = z.infer<typeof StructuredDataRequestSchema>;

// Response types
export interface StructuredDataResponse {
  success: boolean;
  data?: Record<string, any>;
  error?: string;
  rowResponse?: string;
  details?: any[];
}

// Pet-specific format (to be reused)
export const PET_FORMAT = {
  name: 'string',
  age: 'string',
  breed: 'string',
  gender: 'enum',
  description: 'string',
  address: 'string',
  animalType: 'enum',
  lastVaccinatedDate: 'date',
  healthCondition: 'enum',
} as const;
