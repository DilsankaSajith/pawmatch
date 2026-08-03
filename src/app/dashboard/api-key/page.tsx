import ConfirmationModal from '@/components/confirmation-modal';
import { DashboardPage } from '@/components/dashboard-page';
import { Button } from '@/components/ui/button';
import { currentUser } from '@clerk/nextjs/server';
import { PlusIcon } from 'lucide-react';
import { redirect } from 'next/navigation';

const page = async () => {
  const auth = await currentUser();

  if (!auth) {
    redirect('/sign-in');
  }

  return (
    <DashboardPage
      title="API Keys"
      subtitle="Please keep your API key secure and do not share it with anyone."
      cta={
        <Button>
          <PlusIcon className="size-4 mr-2" />
          Create API Key
        </Button>
      }
    ></DashboardPage>
  );
};

export default page;
