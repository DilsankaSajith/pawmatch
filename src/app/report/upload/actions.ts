'use server';

import prisma from '@/lib/db';
import { AnalysisResult } from '@/types';

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
