import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { DashboardPage } from '../../components/dashboard-page';
import { Button } from '@/components/ui/button';
import { PlusIcon, SearchX } from 'lucide-react';
import PetCard from '@/components/pet-card';
import { CreatePetProfileModal } from '@/components/create-pet-profile-modal';
import PetList from '@/components/pet-list';

const page = async () => {
  const auth = await currentUser();

  if (!auth) {
    redirect('/sign-in');
  }

  return (
    <DashboardPage
      title="Find Your Friend"
      subtitle="Browse rescued animals waiting for a loving home — every adoption makes a difference."
      cta={
        <CreatePetProfileModal>
          <Button>
            <PlusIcon className="size-4 mr-2" />
            Add Pet
          </Button>
        </CreatePetProfileModal>
      }
    >
      <PetList />
    </DashboardPage>
  );
};

export default page;
