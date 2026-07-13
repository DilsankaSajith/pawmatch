'use client';

import { useQuery } from '@tanstack/react-query';
import { getApplications } from '../pet/[petId]/actions';
import NoItems from '@/components/no-items';
import ApplicationCard from './application-card';

const ApplicationsList = () => {
  const { data: applications = [], isPending } = useQuery({
    queryKey: ['applications'],
    queryFn: getApplications,
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (applications.length === 0) {
    return (
      <NoItems
        heading="No applications found"
        description="You haven't received any applications yet"
        buttonText="Go back to dashboard"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {applications.map((application) => (
        <ApplicationCard key={application.id} application={application} />
      ))}
    </div>
  );
};

export default ApplicationsList;
