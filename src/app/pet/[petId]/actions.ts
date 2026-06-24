'use server';

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

  // Quick test: Generate embedding and store in database
  // console.log('🚀 Quick test: Generate embedding and store in database\n');

  // const service = EmbeddingService.getInstance();
  // const description =
  //   'A friendly golden retriever who loves children and playing fetch';

  // console.log('📝 Generating embedding for:', description);
  // const embedding = await service.generateEmbedding(description);
  // console.log(`✅ Embedding generated: ${embedding.length} dimensions`);

  // const vectorString = `[${embedding.join(', ')}]`;

  // 3. Create pet using raw SQL (since embedding is Unsupported)
  // const pet = await prisma.$transaction(async (tx) => {
  //   // First create the pet without the embedding
  //   const newPet = await tx.pet.create({
  //     data: {
  //       name: 'Test Golden',
  //       age: '3',
  //       breed: 'Golden Retriever',
  //       gender: 'Male',
  //       description: description,
  //       address: '123 Test Street',
  //       animalType: 'Dog',
  //       healthCondition: 'Healthy',
  //       adoptionStatus: 'Ready',
  //       userId: applicant.id,
  //     },
  //   });

  //   // Then update with the embedding using raw SQL
  //   await tx.$executeRaw`
  //       UPDATE "Pet"
  //       SET embedding = ${vectorString}::vector
  //       WHERE id = ${newPet.id}
  //     `;

  //   return newPet;
  // });

  // console.log(`✅ Pet created with ID: ${pet.id}`);

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
