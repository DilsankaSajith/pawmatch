'use client';

import { getAllPetProfiles } from '@/app/dashboard/actions';
import { useQuery } from '@tanstack/react-query';
import PetCard from './pet-card';
import NoItems from './no-items';

const PetList = () => {
  const { data: pets = [], isPending } = useQuery({
    queryKey: ['pets'],
    queryFn: getAllPetProfiles,
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (pets.length === 0) {
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
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  );
};

export default PetList;
