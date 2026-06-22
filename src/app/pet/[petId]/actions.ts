import prisma from '@/lib/db';

export async function getPetProfileById(id: string) {
  const pet = await prisma.pet.findUnique({
    where: { id },
    include: {
      addedBy: true,
      location: true,
    },
  });

  if (!pet) {
    throw new Error('Pet not found');
  }

  return pet;
}
