'use client';

import Image from 'next/image';
import {
  MapPin,
  Heart,
  Activity,
  Sparkles,
  Calendar,
  PawPrint,
  ArrowRight,
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
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 sm:flex-row">
      {/* Gradient accent bar — top on mobile, left on desktop */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-400 via-brand-600 to-brand-800 sm:inset-y-0 sm:left-0 sm:h-auto sm:w-1 sm:bg-gradient-to-b" />

      {/* ── Image Section ── */}
      <div className="relative h-64 w-full shrink-0 overflow-hidden bg-slate-100 sm:h-auto sm:w-72 md:w-80">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`Photo of ${name}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100">
            <PawPrint className="size-16 text-brand-300" />
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-transparent" />

        {/* Match score badge */}
        {matchScore !== undefined && (
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 shadow-md backdrop-blur-sm">
            <Sparkles className="size-3.5 text-brand-600" />
            <span className="text-xs font-bold text-brand-700">
              {Math.round(matchScore * 100)}% Match
            </span>
          </div>
        )}

        {/* Animal type pill */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-sm sm:bottom-auto sm:top-3 sm:left-auto sm:right-3">
          <PawPrint className="size-3 text-brand-600" />
          <span className="text-xs font-semibold text-slate-700">
            {animalType}
          </span>
        </div>
      </div>

      {/* ── Content Section ── */}
      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        {/* Top row: Name + Status */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              {name}
            </h3>
            <p className="mt-0.5 text-sm font-medium text-brand-600">
              {breed}
            </p>
          </div>
          <span
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}
          >
            <span
              className={`inline-block size-1.5 rounded-full ${statusStyle.dot}`}
            />
            {adoptionStatus}
          </span>
        </div>

        {/* Description */}
        <p className="line-clamp-2 text-sm leading-relaxed text-slate-500">
          {description}
        </p>

        {/* Meta pills */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Age */}
          <div className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-1.5">
            <Calendar className="size-3.5 text-slate-400" />
            <span className="text-xs font-medium text-slate-600">{age}</span>
          </div>

          {/* Gender */}
          <div className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-3 py-1.5">
            <Heart className="size-3.5 text-pink-400" />
            <span className="text-xs font-medium text-slate-600">{gender}</span>
          </div>

          {/* Health */}
          <div
            className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 ${healthStyle.bg}`}
          >
            <Activity className={`size-3.5 ${healthStyle.color}`} />
            <span className={`text-xs font-medium ${healthStyle.color}`}>
              {healthCondition}
            </span>
          </div>
        </div>

        {/* Bottom row: Location + Adopt button */}
        <div className="mt-auto flex flex-col items-start gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-1.5 text-slate-400">
            <MapPin className="size-4 shrink-0" />
            <span className="line-clamp-1 text-sm">{address}</span>
          </div>

          <Button>
            Adopt {name}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RecommendedPetCard;
