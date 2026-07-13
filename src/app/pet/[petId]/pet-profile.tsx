'use client';

import { DashboardPage } from '@/components/dashboard-page';
import PetLocationMap from '@/components/pet-location-map';
import ShinyButton from '@/components/shiny-button';
import { mockPets } from '@/lib/pet-mock-data';
import {
  Calendar,
  Heart,
  MapPin,
  Activity,
  PawPrint,
  User,
  Clock,
  Dna,
  Syringe,
} from 'lucide-react';
import Image from 'next/image';
import { Pet } from '@/types';
import AdoptionCompletionModal from './adoption-completion-modal';

const pet = mockPets[0];

const adoptionStatusConfig: Record<
  (typeof pet)['adoptionStatus'],
  { label: string; bg: string; text: string; ring: string; dot: string }
> = {
  Ready: {
    label: 'Available for Adoption',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    ring: 'ring-emerald-600/20',
    dot: 'bg-emerald-500',
  },
  Pending: {
    label: 'Adoption Pending',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    ring: 'ring-amber-600/20',
    dot: 'bg-amber-500',
  },
  Adopted: {
    label: 'Already Adopted',
    bg: 'bg-slate-50',
    text: 'text-slate-600',
    ring: 'ring-slate-500/20',
    dot: 'bg-slate-400',
  },
};

const healthConfig: Record<
  (typeof pet)['healthCondition'],
  { color: string; bg: string; label: string }
> = {
  Healthy: {
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    label: 'Healthy',
  },
  Recovering: {
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    label: 'Recovering',
  },
  Critical: { color: 'text-red-600', bg: 'bg-red-50', label: 'Critical' },
};

const PetProfilePage = ({ pet }: { pet: Pet }) => {
  const status = adoptionStatusConfig[pet.adoptionStatus];
  const health = healthConfig[pet.healthCondition];
  const listedDate = new Date(pet.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <DashboardPage
      title={`${pet.name}'s Profile`}
      subtitle={`Meet ${pet.name}, a lovable ${pet.breed} looking for a forever home.`}
    >
      <div className="mx-auto w-full max-w-5xl space-y-8 pb-12">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-square md:aspect-auto md:min-h-[480px] overflow-hidden bg-slate-100">
              {pet.imageUrl ? (
                <Image
                  src={pet.imageUrl}
                  alt={`Photo of ${pet.name}`}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <PawPrint className="h-24 w-24 text-slate-200" />
                </div>
              )}

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 to-transparent md:hidden" />
            </div>

            <div className="flex flex-col gap-6 p-6 sm:p-8 lg:p-10">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-heading text-3xl font-bold tracking-tight text-slate-900">
                    {pet.name}
                  </h2>

                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${status.bg} ${status.text} ${status.ring}`}
                  >
                    <span
                      className={`inline-block h-1.5 w-1.5 rounded-full ${status.dot} animate-pulse`}
                    />
                    {status.label}
                  </span>
                </div>
                <p className="mt-1 text-base text-slate-500">{pet.breed}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <InfoPill
                  icon={<Calendar className="h-3.5 w-3.5" />}
                  label={`${pet.age} months old`}
                />
                <InfoPill
                  icon={<Dna className="h-3.5 w-3.5" />}
                  label={pet.gender}
                />
                <InfoPill
                  icon={<Activity className={`h-3.5 w-3.5 ${health.color}`} />}
                  label={health.label}
                  className={`${health.bg} ${health.color}`}
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                  About
                </h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  {pet.description}
                </p>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

              <AdoptionCompletionModal pet={pet}>
                <ShinyButton className="relative z-10 h-14 w-full max-w-xs text-base shadow-lg transition-shadow duration-300 hover:shadow-xl">
                  Adopt {pet.name}
                </ShinyButton>
              </AdoptionCompletionModal>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <DetailCard
            icon={<MapPin className="h-5 w-5 text-brand-600" />}
            title="Location"
            value={pet.address}
            subtitle={`${pet.location?.latitude.toFixed(4)}°N, ${pet.location?.longitude.toFixed(4)}°E`}
          />
          <DetailCard
            icon={<Activity className={`h-5 w-5 ${health.color}`} />}
            title="Health Condition"
            value={health.label}
            badge={
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${health.bg} ${health.color}`}
              >
                {health.label}
              </span>
            }
          />

          <DetailCard
            icon={<Calendar className="h-5 w-5 text-sky-500" />}
            title="Age"
            value={`${pet.age} months`}
          />
          <DetailCard
            icon={<Dna className="h-5 w-5 text-pink-500" />}
            title="Gender"
            value={pet.gender}
          />
          <DetailCard
            icon={<Clock className="h-5 w-5 text-amber-500" />}
            title="Listed On"
            value={listedDate}
          />
          <DetailCard
            icon={<PawPrint className="h-5 w-5 text-brand-600" />}
            title="Breed"
            value={pet.breed}
          />
          <DetailCard
            icon={<User className="h-5 w-5 text-slate-500" />}
            title="Added By"
            value={pet.addedBy.email}
          />
          <DetailCard
            icon={
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black ${status.bg} ${status.text}`}
              >
                ●
              </span>
            }
            title="Adoption Status"
            value={status.label}
          />
        </div>
        <PetLocationMap
          lat={pet.location?.latitude || 0}
          lng={pet.location?.longitude || 0}
          name={pet.name}
          address={pet.address}
        />
      </div>
    </DashboardPage>
  );
};

export default PetProfilePage;

function InfoPill({
  icon,
  label,
  className = 'bg-slate-100 text-slate-600',
}: {
  icon: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${className}`}
    >
      {icon}
      {label}
    </span>
  );
}

function DetailCard({
  icon,
  title,
  value,
  subtitle,
  badge,
}: {
  icon: React.ReactNode;
  title: string;
  value: any;
  subtitle?: string;
  badge?: React.ReactNode;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
      <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-brand-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 ring-1 ring-slate-100">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {title}
          </p>
          <div className="mt-1 flex items-center gap-2">
            <p className="truncate text-sm font-semibold text-slate-800">
              {value}
            </p>
            {badge}
          </div>
          {subtitle && (
            <p className="mt-0.5 truncate text-xs text-slate-400">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}
