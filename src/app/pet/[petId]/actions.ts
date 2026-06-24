'use server';

import { searchPetsBySemantic } from '@/app/dashboard/search-actions';
import prisma from '@/lib/db';
import { EmbeddingService } from '@/lib/embedding-service';
import { auth } from '@clerk/nextjs/server';

export async function getPetProfileById(id: string) {
  const pet = await prisma.pet.findUnique({
    where: { id },
    include: {
      addedBy: true,
      location: true,
    },
  });

  if (!pet) {
    throw new Error('Pet not found');
  }

  return pet;
}

export async function createApplication(petId: string, addedById: string) {
  const { userId: externalId } = await auth();
  if (!externalId) throw new Error('Not authenticated');

  const applicant = await prisma.user.findUnique({
    where: { externalId },
  });

  if (!applicant) throw new Error('User not found');

  // Quick test: Test semantic search
  // console.log('🔍 Testing semantic search...\n');

  // console.log('📝 Test 1: Search for "friendly dog that loves kids"');
  // const results = await searchPetsBySemantic('friendly dog that loves kids');

  // console.log(`✅ Found ${results.length} matching pets\n`);

  // if (results.length > 0) {
  //   results.slice(0, 3).forEach((pet: any, index: number) => {
  //     console.log(
  //       `${index + 1}. ${pet.name} (Similarity: ${pet.similarity?.toFixed(3)})`,
  //     );
  //     console.log(`   ${pet.description.substring(0, 100)}...\n`);
  //   });
  // }

  const existing = await prisma.application.findFirst({
    where: {
      petId,
      applicantId: applicant.id,
    },
  });

  if (existing) {
    throw new Error('Your Adoption Request Is Already In 🐾');
  }

  const application = await prisma.application.create({
    data: {
      petId,
      applicantId: applicant.id,
      addedById,
    },
  });

  return application;
}
