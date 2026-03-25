"use client";

import { MockPet } from "@/lib/pet-mock-data";
import { Heart, MapPin } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

function formatAge(months: number): string {
  if (months < 12) {
    return `${months} mos`;
  }
  const years = Math.floor(months / 12);
  const remaining = months % 12;
  return remaining > 0 ? `${years}y ${remaining}m` : `${years}y`;
}

const statusStyles: Record<string, { bg: string; label: string }> = {
  Available: { bg: "bg-emerald-100/90 text-emerald-700", label: "Available" },
  Reserved: { bg: "bg-amber-100/90 text-amber-700", label: "Pending" },
  "Needs Medical Care": { bg: "bg-red-100/90 text-red-700", label: "Medical" },
};

export const PetCard = ({ pet }: { pet: MockPet }) => {
  const status = statusStyles[pet.adoptionReadiness] ?? statusStyles.Available;
  const isAvailable = pet.adoptionReadiness === "Available";

  return (
    <div
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden
                 transition-all duration-300 ease-out
                 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
    >
      {/* Image section */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={pet.imageUrl}
          alt={pet.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Status badge */}
        <span
          className={cn(
            "absolute top-3 left-3 px-2.5 py-1 rounded-lg text-xs font-bold backdrop-blur-md shadow-sm",
            status.bg
          )}
        >
          {status.label}
        </span>

        {/* Heart icon */}
        <button
          className="absolute top-3 right-3 size-9 rounded-full bg-white/70 backdrop-blur-md
                     flex items-center justify-center border border-white/20
                     hover:bg-white transition-all shadow-sm"
          aria-label="Add to favorites"
        >
          <Heart className="size-4.5 text-gray-500 hover:text-rose-500 transition-colors" />
        </button>
      </div>

      {/* Content section */}
      <div className="p-5 space-y-4">
        {/* Name + Gender */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-gray-900 text-lg leading-tight">{pet.name}</h3>
            <p className="text-sm text-gray-400 font-medium">{pet.breed}</p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-lg bg-gray-50 text-gray-500 border border-gray-100">
            {pet.gender}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="text-[11px] px-2.5 py-1 rounded-lg bg-brand-50 text-brand-700 font-bold border border-brand-100/50">
            {formatAge(pet.age)}
          </span>
          {pet.vaccinated && (
            <span className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold border border-emerald-100/50">
              Vaccinated
            </span>
          )}
          {pet.neutered && (
            <span className="text-[11px] px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold border border-blue-100/50">
              Neutered
            </span>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
          <MapPin className="size-3.5 text-gray-300" />
          <span>{pet.location.label}, Sri Lanka</span>
        </div>

        {/* CTA button */}
        <button
          className={cn(
            "w-full py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm",
            isAvailable
              ? "bg-brand-700 text-white hover:bg-brand-800 hover:shadow-brand-200/50 hover:shadow-lg"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          )}
          disabled={!isAvailable}
        >
          {isAvailable ? "Adopt Me" : "Pending"}
        </button>
      </div>
    </div>
  );
};
