'use server';

import prisma from '@/lib/db';

export async function getAllReports() {
  const reports = await prisma.report.findMany();

  return reports;
}
