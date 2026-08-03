'use server';

import prisma from '@/lib/db';
import { sendEmail } from '@/lib/email';
import {
  applicationAcceptedEmail,
  applicationRejectedEmail,
} from '@/lib/email-templates';
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
    include: { pet: true, applicant: true },
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

  const { subject, html } = applicationAcceptedEmail(application.pet.name);
  await sendEmail(application.applicant.email, subject, html);
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
    include: { pet: true, applicant: true },
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

  const { subject, html } = applicationRejectedEmail(application.pet.name);
  await sendEmail(application.applicant.email, subject, html);
}
