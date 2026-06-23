'use server';

import {
  Adoption_Status,
  Gender,
  Health_Condition,
} from '@/generated/prisma/enums';
import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export interface CreatePetInput {
  name: string;
  age: string;
  breed: string;
  gender: string;
  address: string;
  animalType: string;
  description: string;
  healthCondition: string;
  adoptionStatus: string;
  imageUrl: string;
  lastVaccinatedDate?: string;
  location?: {
    latitude: string;
    longitude: string;
  };
}

export async function createPetProfile(input: CreatePetInput) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Not authenticated');
  }

  // Resolve the internal user record from the Clerk external ID
  const user = await prisma.user.findUnique({
    where: { externalId: userId },
  });

  if (!user) {
    throw new Error(
      'User profile not found. Please complete onboarding first.',
    );
  }

  const pet = await prisma.pet.create({
    data: {
      name: input.name,
      age: input.age,
      breed: input.breed,
      gender: Gender[input.gender as keyof typeof Gender],
      address: input.address,
      description: input.description,
      animalType: input.animalType as 'Dog' | 'Cat',
      healthCondition:
        Health_Condition[
          input.healthCondition as keyof typeof Health_Condition
        ],
      adoptionStatus:
        Adoption_Status[input.adoptionStatus as keyof typeof Adoption_Status],
      imageUrl: input.imageUrl,
      lastVaccinatedDate: input.lastVaccinatedDate || null,
      addedBy: { connect: { id: user.id } },
      location:
        input.location?.latitude && input.location?.longitude
          ? {
              create: {
                latitude: parseFloat(input.location.latitude),
                longitude: parseFloat(input.location.longitude),
              },
            }
          : undefined,
    },
  });

  return pet;
}

export async function getAllPetProfiles() {
  const pets = await prisma.pet.findMany({
    include: {
      addedBy: true,
      location: true,
    },
  });

  return pets;
}
