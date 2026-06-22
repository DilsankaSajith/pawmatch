'use client';

import dynamic from 'next/dynamic';

const PetLocationMap = dynamic(
  () => import('@/components/pet-location-map'),
  {
    ssr: false,
    loading: () => (
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
          <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-100" />
          <div className="space-y-2">
            <div className="h-4 w-32 animate-pulse rounded bg-slate-100" />
            <div className="h-3 w-48 animate-pulse rounded bg-slate-100" />
          </div>
        </div>
        <div className="h-[320px] w-full animate-pulse bg-slate-100" />
      </div>
    ),
  },
);

export default PetLocationMap;
