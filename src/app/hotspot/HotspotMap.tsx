'use client';

import { useQuery } from '@tanstack/react-query';
import { getAllReports } from './actions';

const HotspotMap = () => {
  const { data: hotspots = [], isPending } = useQuery({
    queryKey: ['hotspots'],
    queryFn: getAllReports,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  return <div>HotspotMap</div>;
};

export default HotspotMap;
