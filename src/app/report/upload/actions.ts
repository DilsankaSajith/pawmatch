'use server';

import prisma from '@/lib/db';
import { AnalysisResult } from '@/types';
import { OfflineReport } from '@/types/offline-report';

export const postReport = async ({
  imageUrl,
  analysis,
}: {
  imageUrl: string;
  analysis: AnalysisResult;
}) => {
  const report = await prisma.report.create({
    data: {
      imageUrl,
      animalType: analysis.animalType,
      animalCount: analysis.animalCount,
      environment: analysis.environment,
      urgency: analysis.urgency,
      description: analysis.description,

      visibleIssues: {
        create: analysis.visibleIssues.map((issue) => ({
          issue,
        })),
      },
      location: analysis.location
        ? {
            create: {
              latitude: analysis.location.lat,
              longitude: analysis.location.lng,
            },
          }
        : undefined,
    },
  });

  return report;
};

export async function syncOfflineReports(report: OfflineReport) {
  const created = await prisma.report.create({
    data: {
      animalType: report.animalType,
      animalCount: 1,
      environment: 'Offline Report',
      urgency: 'Medium',
      description: report.description,
      timeStamp: new Date(report.createdAt),
      location: {
        create: {
          latitude: report.location.lat,
          longitude: report.location.lng,
        },
      },
    },
  });

  return { success: true, data: created };
}
