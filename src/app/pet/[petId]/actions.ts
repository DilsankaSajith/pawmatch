'use server';

import prisma from '@/lib/db';
import { sendEmail } from '@/lib/email';
import { newApplicationEmail } from '@/lib/email-templates';
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

  const existing = await prisma.application.findFirst({
    where: {
      petId,
      applicantId: applicant.id,
    },
  });

  if (applicant.id === addedById) {
    throw new Error('You cannot apply to adopt your own pet 🐾');
  }

  if (existing) {
    throw new Error('Your Adoption Request Is Already In 🐾');
  }

  const application = await prisma.application.create({
    data: {
      petId,
      applicantId: applicant.id,
      addedById,
    },
    include: {
      pet: true,
      applicant: true,
      addedBy: true,
    },
  });

  const { subject, html } = newApplicationEmail(
    application.pet.name,
    applicant.email,
  );
  await sendEmail(application.addedBy.email, subject, html);

  return application;
}

export async function getApplications() {
  const { userId: externalId } = await auth();
  if (!externalId) throw new Error('Not authenticated');

  const addedBy = await prisma.user.findUnique({
    where: { externalId },
  });

  if (!addedBy) throw new Error('User not found');

  const applications = await prisma.application.findMany({
    where: {
      addedById: addedBy.id,
    },
    include: {
      pet: true,
      addedBy: true,
      applicant: true,
    },
  });

  return applications;
}
