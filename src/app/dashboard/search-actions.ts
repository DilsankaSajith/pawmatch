'use server';

import { EmbeddingService } from '@/lib/embedding-service';
import { getAllPetProfiles } from './actions';
import prisma from '@/lib/db';

function formatVectorForPostgres(embedding: number[]): string {
  return `[${embedding.join(', ')}]`;
}

export async function searchPetsBySemantic(searchQuery: string) {
  if (!searchQuery || searchQuery.trim().length === 0) {
    return await getAllPetProfiles();
  }

  console.log(`🔍 Searching for: "${searchQuery}"`);

  const service = EmbeddingService.getInstance();

  // Generate embedding for the search query
  const queryEmbedding = await service.generateEmbedding(searchQuery);
  const vectorString = formatVectorForPostgres(queryEmbedding);

  // Search using pgvector similarity
  const pets = await prisma.$queryRaw`
    SELECT 
      p.*,
      1 - (p.embedding <=> ${vectorString}::vector) as similarity,
      -- Also get the user who added this pet
      json_build_object(
        'id', u.id,
        'email', u.email,
        'role', u.role
      ) as addedBy
    FROM "Pet" p
    LEFT JOIN "User" u ON p."userId" = u.id
    WHERE p.embedding IS NOT NULL
      AND 1 - (p.embedding <=> ${vectorString}::vector) > 0.5
    ORDER BY similarity DESC
    LIMIT 20
  `;

  return pets;
}
