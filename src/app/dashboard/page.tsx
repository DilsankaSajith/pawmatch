import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { DashboardPage } from '../../components/dashboard-page';

const Page = async () => {
  const auth = await currentUser();

  if (!auth) {
    redirect('/sign-in');
  }

  return (
    <DashboardPage title="Dashboard">dashboard page content</DashboardPage>
  );
};

export default Page;
