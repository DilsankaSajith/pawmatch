import { z } from 'zod';
import {
  Gender,
  Animal_Type,
  Health_Condition,
} from '@/generated/prisma/enums';

export const PetSchema = z.object({
  name: z.string(),
  age: z.string(),
  breed: z.string(),
  gender: z.enum(Gender).default(Gender.Male),
  description: z.string(),
  address: z.string(),
  animalType: z.enum(Animal_Type).default(Animal_Type.Dog),
  lastVaccinatedDate: z.string().optional(),
  healthCondition: z.enum(Health_Condition).default(Health_Condition.Healthy),
});

export type PetData = z.infer<typeof PetSchema>;
