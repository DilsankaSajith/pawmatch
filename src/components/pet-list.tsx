'use client';

import { getAllPetProfiles } from '@/app/dashboard/actions';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import PetCard from './pet-card';
import NoItems from './no-items';

const PetList = () => {
  const searchParams = useSearchParams();

  const { data: pets = [], isPending } = useQuery({
    queryKey: ['pets'],
    queryFn: getAllPetProfiles,
  });

  const filteredPets = useMemo(() => {
    let result = [...pets];

    // Filter by animal type
    const type = searchParams.get('type');
    if (type) {
      result = result.filter((pet) => pet.animalType === type);
    }

    // Filter by age range
    const age = searchParams.get('age');
    if (age) {
      result = result.filter((pet) => {
        const petAge = parseFloat(pet.age);
        if (isNaN(petAge)) return false;
        switch (age) {
          case 'puppy':
            return petAge >= 0 && petAge <= 1;
          case 'young':
            return petAge > 1 && petAge <= 3;
          case 'adult':
            return petAge > 3 && petAge <= 7;
          case 'senior':
            return petAge > 7;
          default:
            return true;
        }
      });
    }

    // Filter by gender
    const gender = searchParams.get('gender');
    if (gender) {
      result = result.filter(
        (pet) => pet.gender.toLowerCase() === gender.toLowerCase(),
      );
    }

    // Filter by size (if available on pet model)
    const size = searchParams.get('size');
    if (size) {
      result = result.filter(
        (pet) =>
          'size' in pet &&
          typeof pet.size === 'string' &&
          pet.size.toLowerCase() === size.toLowerCase(),
      );
    }

    // Filter by vaccinated
    const vaccinated = searchParams.get('vaccinated');
    if (vaccinated === 'true') {
      result = result.filter(
        (pet) => pet.lastVaccinatedDate !== null,
      );
    }

    // Filter by neutered
    const neutered = searchParams.get('neutered');
    if (neutered === 'true') {
      result = result.filter(
        (pet) =>
          'neutered' in pet && (pet as Record<string, unknown>).neutered === true,
      );
    }

    // Sort
    const sort = searchParams.get('sort');
    if (sort === 'oldest') {
      result.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    } else {
      // default: newest first
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }

    return result;
  }, [pets, searchParams]);

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (filteredPets.length === 0) {
    return (
      <NoItems
        heading="No pets found"
        description="Try adjusting your filters or search keywords to find what you're looking for."
        buttonText="Clear all filters"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredPets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  );
};

export default PetList;

