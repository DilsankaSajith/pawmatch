import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function getUserFromApiKey(req: NextRequest) {
  const apiKey =
    req.headers.get('x-api-key') ??
    req.headers.get('authorization')?.replace('Bearer ', '');

  if (!apiKey) return null;

  const user = await prisma.user.findUnique({
    where: { apiKey },
    select: { id: true, email: true, role: true },
  });

  return user;
}

export function unauthorizedResponse() {
  return NextResponse.json(
    { success: false, error: 'Invalid or missing API key' },
    { status: 401 },
  );
}
