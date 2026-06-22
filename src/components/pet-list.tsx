'use client';

import { getAllPetProfiles } from '@/app/dashboard/actions';
import { useQuery } from '@tanstack/react-query';
import { SearchX } from 'lucide-react';
import { Button } from './ui/button';
import PetCard from './pet-card';

const PetList = () => {
  const { data: pets = [] } = useQuery({
    queryKey: ['pets'],
    queryFn: getAllPetProfiles,
  });

  if (pets.length === 0) {
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="size-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <SearchX className="size-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-bold text-gray-900">No pets found</h3>
      <p className="text-gray-500 max-w-xs mx-auto mt-2">
        Try adjusting your filters or search keywords to find what you're
        looking for.
      </p>
      <Button variant="outline" className="mt-6" asChild>
        <a href="/dashboard">Clear all filters</a>
      </Button>
    </div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  );
};

export default PetList;
