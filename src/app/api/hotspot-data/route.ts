import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  const hotspots = await prisma.report.findMany({
    where: {
      location: { isNot: null },
    },
    select: {
      id: true,
      animalType: true,
      animalCount: true,
      urgency: true,
      description: true,
      environment: true,
      imageUrl: true,
      timeStamp: true,
      visibleIssues: {
        select: { id: true, issue: true },
      },
      location: {
        select: { latitude: true, longitude: true },
      },
    },
    orderBy: { timeStamp: 'desc' },
  });

  return NextResponse.json(hotspots);
}
