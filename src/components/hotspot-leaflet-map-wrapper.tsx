'use client';

import dynamic from 'next/dynamic';

const HotspotLeafletMap = dynamic(
  () => import('@/components/hotspot-leaflet-map'),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse rounded-2xl bg-slate-100" />
    ),
  },
);

export default HotspotLeafletMap;
