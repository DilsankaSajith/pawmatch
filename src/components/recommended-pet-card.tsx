'use client';

import Image from 'next/image';
import {
  MapPin,
  Heart,
  Activity,
  Sparkles,
  Calendar,
  PawPrint,
} from 'lucide-react';
import { Pet } from '@/types';
import { Button } from './ui/button';

interface RecommendedPetCardProps {
  pet: Pet;
  matchScore?: number;
}

const adoptionStatusConfig: Record<
  Pet['adoptionStatus'],
  { bg: string; text: string; dot: string }
> = {
  Ready: {
    bg: 'bg-emerald-50 border-emerald-200',
    text: 'text-emerald-700',
    dot: 'bg-emerald-500',
  },
  Pending: {
    bg: 'bg-amber-50 border-amber-200',
    text: 'text-amber-700',
    dot: 'bg-amber-500',
  },
  Adopted: {
    bg: 'bg-slate-50 border-slate-200',
    text: 'text-slate-500',
    dot: 'bg-slate-400',
  },
};

const healthConfig: Record<
  Pet['healthCondition'],
  { color: string; bg: string }
> = {
  Healthy: { color: 'text-emerald-600', bg: 'bg-emerald-50' },
  Recovering: { color: 'text-amber-600', bg: 'bg-amber-50' },
  Critical: { color: 'text-red-500', bg: 'bg-red-50' },
};

function RecommendedPetCard({ pet, matchScore }: RecommendedPetCardProps) {
  const {
    name,
    breed,
    age,
    gender,
    description,
    adoptionStatus,
    imageUrl,
    healthCondition,
    address,
    animalType,
  } = pet;

  const statusStyle = adoptionStatusConfig[adoptionStatus];
  const healthStyle = healthConfig[healthCondition];

  return (
    <div className="group relative flex items-stretch overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-brand-100">
      {/* Gradient accent bar — left edge */}
      <div className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-brand-400 via-brand-600 to-brand-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* ── Thumbnail ── */}
      <div className="relative size-20 shrink-0 overflow-hidden bg-slate-100 sm:size-24">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`Photo of ${name}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100">
            <PawPrint className="size-8 text-brand-300" />
          </div>
        )}


      </div>

      {/* ── Content ── */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 px-4 py-3">
        {/* Row 1: Name, breed, match score, status */}
        <div className="flex items-center gap-2">
          <h3 className="truncate text-sm font-bold text-slate-900">
            {name}
          </h3>
          <span className="hidden text-slate-300 sm:inline">·</span>
          <p className="hidden truncate text-xs text-brand-600 sm:block">
            {breed}
          </p>

          {/* Match score — golden accent */}
          {matchScore !== undefined && (
            <div className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 ring-1 ring-amber-200/60">
              <Sparkles className="size-2.5 text-amber-500" />
              <span className="text-[10px] font-bold text-amber-600">
                {Math.round(matchScore * 100)}%
              </span>
            </div>
          )}

          <span
            className={`${matchScore === undefined ? 'ml-auto' : ''} inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusStyle.bg} ${statusStyle.text}`}
          >
            <span
              className={`inline-block size-1 rounded-full ${statusStyle.dot}`}
            />
            {adoptionStatus}
          </span>
        </div>

        {/* Row 2: Description */}
        <p className="line-clamp-1 text-xs leading-relaxed text-slate-400">
          {description}
        </p>

        {/* Row 3: Meta pills + location */}
        <div className="flex flex-wrap items-center gap-1.5">
          {/* Animal type */}
          <div className="inline-flex items-center gap-1 rounded-md bg-brand-50 px-1.5 py-0.5">
            <PawPrint className="size-2.5 text-brand-500" />
            <span className="text-[10px] font-medium text-brand-700">
              {animalType}
            </span>
          </div>

          {/* Age */}
          <div className="inline-flex items-center gap-1 rounded-md bg-slate-50 px-1.5 py-0.5">
            <Calendar className="size-2.5 text-slate-400" />
            <span className="text-[10px] font-medium text-slate-600">
              {age}
            </span>
          </div>

          {/* Gender */}
          <div className="inline-flex items-center gap-1 rounded-md bg-slate-50 px-1.5 py-0.5">
            <Heart className="size-2.5 text-pink-400" />
            <span className="text-[10px] font-medium text-slate-600">
              {gender}
            </span>
          </div>

          {/* Health */}
          <div
            className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 ${healthStyle.bg}`}
          >
            <Activity className={`size-2.5 ${healthStyle.color}`} />
            <span className={`text-[10px] font-medium ${healthStyle.color}`}>
              {healthCondition}
            </span>
          </div>

          {/* Separator */}
          <div className="hidden h-3 w-px bg-slate-200 sm:block" />

          {/* Location */}
          <div className="hidden items-center gap-1 text-slate-400 sm:inline-flex">
            <MapPin className="size-2.5 shrink-0" />
            <span className="line-clamp-1 text-[10px]">{address}</span>
          </div>
        </div>
      </div>

      {/* ── Adopt Button ── */}
      <div className="flex shrink-0 items-center border-l border-slate-50 px-3 sm:px-4">
        <Button size="sm" className="gap-1.5 rounded-lg text-xs">
          Adopt
        </Button>
      </div>
    </div>
  );
}

export default RecommendedPetCard;
