'use server';

import prisma from '@/lib/db';

export async function getAllReports() {
  const reports = await prisma.report.findMany({
    include: {
      location: true,
      visibleIssues: true,
    },
    orderBy: {
      timeStamp: 'desc',
    },
  });

  return reports;
}
