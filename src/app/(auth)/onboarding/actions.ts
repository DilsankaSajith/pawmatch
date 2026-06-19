'use server';

import { Role } from '@/generated/prisma/enums';
import prisma from '@/lib/db';
import { UserRole } from '@/types';
import { auth, currentUser } from '@clerk/nextjs/server';

export async function saveUserWithRole(role: UserRole) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Not authenticated');
  }

  const clerkUser = await currentUser();

  if (!clerkUser) {
    throw new Error('Could not retrieve user details');
  }

  const email = clerkUser.emailAddresses[0]?.emailAddress;

  if (!email) {
    throw new Error('No email found on Clerk user');
  }

  await prisma.user.upsert({
    where: { externalId: userId },
    update: { role: role as Role },
    create: {
      externalId: userId,
      email,
      role: role as Role,
    },
  });
}
