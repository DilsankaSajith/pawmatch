import { DashboardPage } from '@/components/dashboard-page';
import ApplicationsList from './application-list';

const page = () => {
  return (
    <DashboardPage
      title="Find Your Friend"
      subtitle="Browse rescued animals waiting for a loving home — every adoption makes a difference."
    >
      <ApplicationsList />
    </DashboardPage>
  );
};

export default page;
