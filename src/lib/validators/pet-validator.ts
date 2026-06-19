import z from 'zod';

export const PET_NAME_VALIDATOR = z
  .string()
  .min(1, 'Name is required')
  .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters');

export const PET_AGE_VALIDATOR = z
  .number()
  .int('Age must be a whole number')
  .min(0, 'Age cannot be negative')
  .max(100, 'Age must be realistic');

export const PET_BREED_VALIDATOR = z
  .string()
  .min(1, 'Breed is required')
  .regex(/^[a-zA-Z\s]+$/, 'Breed can only contain letters');

export const PET_DESCRIPTION_VALIDATOR = z
  .string()
  .min(1, 'Description is required')
  .max(1000, 'Description cannot exceed 1000 characters');

export const PET_LAST_VACCINATED_DATE_VALIDATOR = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
  .optional();
