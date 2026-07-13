'use server';

import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export async function markApplicationAsAccepted(applicationId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('You must be signed in to do this.');
  }

  const user = await prisma.user.findUnique({
    where: { externalId: userId },
  });

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
  });

  if (!application) {
    throw new Error('Application not found.');
  }

  if (application.status === 'Approved') {
    throw new Error('Application already accepted');
  }

  if (application.addedById !== user?.id) {
    throw new Error('You are not authorized to accept this application.');
  }

  await prisma.$transaction([
    prisma.application.update({
      where: { id: applicationId },
      data: { status: 'Approved' },
    }),
    prisma.pet.update({
      where: { id: application.petId },
      data: { adoptionStatus: 'Pending' },
    }),
  ]);
}

export async function deleteApplication(applicationId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('You must be signed in to do this.');
  }

  const user = await prisma.user.findUnique({
    where: { externalId: userId },
  });

  const application = await prisma.application.findUnique({
    where: { id: applicationId },
  });

  if (!application) {
    throw new Error('Application not found.');
  }

  if (application.addedById !== user?.id) {
    throw new Error('You are not authorized to accept this application.');
  }

  await prisma.application.delete({
    where: { id: applicationId },
  });
}
