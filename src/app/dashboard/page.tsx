import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DashboardPage } from "../../components/dashboard-page";
import { Button } from "@/components/ui/button";
import { PlusIcon, SearchX } from "lucide-react";
import { mockPets } from "@/lib/pet-mock-data";
import { PetCard } from "@/components/browse-pets/pet-card";

interface PageProps {
  searchParams: Promise<{
    type?: string;
    age?: string;
    gender?: string;
    size?: string;
    vaccinated?: string;
    neutered?: string;
    sort?: string;
  }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const auth = await currentUser();

  if (!auth) {
    redirect("/sign-in");
  }

  const { type, age, gender, size, vaccinated, neutered, sort } = await searchParams;

  const filteredPets = mockPets
    .filter((pet) => {
      // Type filter
      if (type && pet.type !== type) return false;

      // Age filter
      if (age) {
        const petAgeYears = pet.age / 12;
        if (age === "puppy" && pet.age >= 12) return false;
        if (age === "young" && (petAgeYears < 1 || petAgeYears >= 3)) return false;
        if (age === "adult" && (petAgeYears < 3 || petAgeYears >= 7)) return false;
        if (age === "senior" && petAgeYears < 7) return false;
      }

      // Gender filter
      if (gender && pet.gender !== gender) return false;

      // Size filter
      if (size && pet.size !== size) return false;

      // Health filters
      if (vaccinated === "true" && !pet.vaccinated) return false;
      if (neutered === "true" && !pet.neutered) return false;

      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.addedAt).getTime();
      const dateB = new Date(b.addedAt).getTime();
      return sort === "oldest" ? dateA - dateB : dateB - dateA;
    });

  return (
    <DashboardPage
      title="Find Your Friend"
      subtitle="Browse rescued animals waiting for a loving home — every adoption makes a difference."
      cta={
        <Button>
          <PlusIcon className="size-4 mr-2" />
          Add Pet
        </Button>
      }
    >
      {filteredPets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="size-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <SearchX className="size-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">No pets found</h3>
          <p className="text-gray-500 max-w-xs mx-auto mt-2">
            Try adjusting your filters or search keywords to find what you're looking for.
          </p>
          <Button variant="outline" className="mt-6" asChild>
            <a href="/dashboard">Clear all filters</a>
          </Button>
        </div>
      )}
    </DashboardPage>
  );
};

export default Page;
