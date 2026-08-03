'use server';

import prisma from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

export async function getApiKey() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('You must be signed in to do this.');
  }

  const user = await prisma.user.findUnique({
    where: { externalId: userId },
  });

  if (!user) {
    throw new Error('User not found.');
  }

  const apiKey = user.apiKey;

  if (!apiKey) {
    throw new Error('API key not found.');
  }

  return apiKey;
}

export async function generateApiKey() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('You must be signed in to do this.');
  }

  const user = await prisma.user.findUnique({
    where: { externalId: userId },
  });

  if (!user) {
    throw new Error('User not found.');
  }

  const newApiKey = crypto.randomUUID();

  await prisma.user.update({
    where: { externalId: userId },
    data: { apiKey: newApiKey },
  });
}
