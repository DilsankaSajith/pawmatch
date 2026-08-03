import ConfirmationModal from '@/components/confirmation-modal';
import { DashboardPage } from '@/components/dashboard-page';
import { Button } from '@/components/ui/button';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import ApiKeys from './api-keys';
import { generateApiKey } from './actions';

const page = async () => {
  const auth = await currentUser();

  if (!auth) {
    redirect('/sign-in');
  }

  return (
    <DashboardPage
      title="API Keys"
      subtitle="Please keep your API key secure and do not share it with anyone."
    >
      <ApiKeys />
    </DashboardPage>
  );
};

export default page;
