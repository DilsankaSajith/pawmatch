import { DashboardPage } from '@/components/dashboard-page';
import ApplicationsList from './application-list';

const page = () => {
  return (
    <DashboardPage
      title="Adoption Requests"
      subtitle="Kind hearts are waiting to welcome your companion home. Review each application and help your pet find the family they deserve."
    >
      <ApplicationsList />
    </DashboardPage>
  );
};

export default page;
