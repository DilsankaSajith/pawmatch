"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllReports } from "./actions";
import HotspotLeafletMap from "@/components/hotspot-leaflet-map-wrapper";
import type { ReportWithLocation } from "@/components/hotspot-leaflet-map";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  MapPin,
  Filter,
  Dog,
  Cat,
  HelpCircle,
  AlertTriangle,
  Clock,
  Layers,
  X,
  Hash,
} from "lucide-react";

// --- Urgency config ---
const urgencyOptions = [
  {
    value: "Low",
    label: "Low",
    color: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },
  {
    value: "Medium",
    label: "Medium",
    color: "bg-amber-50 text-amber-700 ring-amber-200",
  },
  {
    value: "High",
    label: "High",
    color: "bg-orange-50 text-orange-700 ring-orange-200",
  },
  {
    value: "Urgent",
    label: "Urgent",
    color: "bg-red-50 text-red-700 ring-red-200",
  },
];

const animalOptions = [
  { value: "Dog", label: "Dogs", icon: Dog },
  { value: "Cat", label: "Cats", icon: Cat },
  { value: "Other", label: "Other", icon: HelpCircle },
];

// --- Loading skeleton ---
function LoadingSkeleton() {
  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col gap-4 p-4 md:p-6">
      {/* Header skeleton */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <div className="h-7 w-48 animate-pulse rounded-lg bg-slate-200" />
          <div className="h-4 w-72 animate-pulse rounded-md bg-slate-100" />
        </div>
        <div className="flex gap-2">
          <div className="h-9 w-24 animate-pulse rounded-lg bg-slate-100" />
          <div className="h-9 w-24 animate-pulse rounded-lg bg-slate-100" />
        </div>
      </div>

      {/* Filter bar skeleton */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-8 w-20 shrink-0 animate-pulse rounded-full bg-slate-100"
          />
        ))}
      </div>

      {/* Map skeleton */}
      <div className="flex-1 animate-pulse rounded-2xl bg-slate-100" />
    </div>
  );
}

// --- Empty state ---
function EmptyState({
  hasFilters,
  onClear,
}: {
  hasFilters: boolean;
  onClear: () => void;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
        <MapPin className="h-7 w-7 text-slate-400" />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-700">No reports found</p>
        <p className="mt-1 text-xs text-slate-400">
          {hasFilters
            ? "Try adjusting your filters to see more results."
            : "There are no reported cases with location data yet."}
        </p>
      </div>
      {hasFilters && (
        <button
          onClick={onClear}
          className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-slate-50"
        >
          <X className="h-3 w-3" />
          Clear filters
        </button>
      )}
    </div>
  );
}

// --- Main component ---
const HotspotMap = () => {
  const { data: reports = [], isPending } = useQuery({
    queryKey: ["hotspots"],
    queryFn: getAllReports,
  });

  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [selectedUrgency, setSelectedUrgency] = useState<string | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(true);

  const hasFilters = selectedAnimal !== null || selectedUrgency !== null;

  const clearFilters = () => {
    setSelectedAnimal(null);
    setSelectedUrgency(null);
  };

  // Filter reports
  const filteredReports = useMemo(() => {
    return (reports as ReportWithLocation[]).filter((report) => {
      if (selectedAnimal && report.animalType !== selectedAnimal) return false;
      if (selectedUrgency && report.urgency !== selectedUrgency) return false;
      return true;
    });
  }, [reports, selectedAnimal, selectedUrgency]);

  // Reports with location
  const locatedReports = filteredReports.filter((r) => r.location);

  // Stats
  const stats = useMemo(() => {
    const total = filteredReports.length;
    const located = locatedReports.length;
    const urgent = filteredReports.filter(
      (r) => r.urgency === "High" || r.urgency === "Urgent",
    ).length;
    return { total, located, urgent };
  }, [filteredReports, locatedReports]);

  if (isPending) return <LoadingSkeleton />;

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col gap-4 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Filter icon */}
          <div className="flex items-center gap-1.5 pr-1 text-xs font-medium text-slate-400">
            <Filter className="h-3.5 w-3.5" />
            Filter
          </div>

          {/* Animal type filters */}
          {animalOptions.map((option) => {
            const Icon = option.icon;
            const isActive = selectedAnimal === option.value;
            return (
              <button
                key={option.value}
                onClick={() =>
                  setSelectedAnimal(isActive ? null : option.value)
                }
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200",
                  isActive
                    ? "bg-brand-600 text-white shadow-sm"
                    : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 hover:ring-slate-300",
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                {option.label}
              </button>
            );
          })}

          {/* Divider */}
          <div className="h-5 w-px bg-slate-200" />

          {/* Urgency filters */}
          {urgencyOptions.map((option) => {
            const isActive = selectedUrgency === option.value;
            return (
              <button
                key={option.value}
                onClick={() =>
                  setSelectedUrgency(isActive ? null : option.value)
                }
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200",
                  isActive
                    ? "bg-brand-600 text-white shadow-sm"
                    : `bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 hover:ring-slate-300`,
                )}
              >
                <AlertTriangle className="h-3 w-3" />
                {option.label}
              </button>
            );
          })}

          {/* Divider */}
          <div className="h-5 w-px bg-slate-200" />

          {/* Heatmap toggle */}
          <button
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200",
              showHeatmap
                ? "bg-brand-600 text-white shadow-sm"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 hover:ring-slate-300",
            )}
          >
            <Layers className="h-3.5 w-3.5" />
            Heatmap
          </button>

          {/* Clear filters */}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-200"
            >
              <X className="h-3 w-3" />
              Clear
            </button>
          )}
        </div>

        {/* Stats badges */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
            <Hash className="h-3.5 w-3.5 text-slate-400" />
            {stats.total} reports
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            {stats.located} pinned
          </div>
          {stats.urgent > 0 && (
            <div className="inline-flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 shadow-sm ring-1 ring-red-200">
              <AlertTriangle className="h-3.5 w-3.5" />
              {stats.urgent} urgent
            </div>
          )}
        </div>
      </div>

      {/* Map area */}
      <div className="relative flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {locatedReports.length === 0 ? (
          <EmptyState hasFilters={hasFilters} onClear={clearFilters} />
        ) : (
          <HotspotLeafletMap
            reports={showHeatmap ? filteredReports : filteredReports}
            key={`${selectedAnimal}-${selectedUrgency}-${showHeatmap}`}
          />
        )}

        {/* Map legend */}
        <div className="absolute bottom-4 left-4 z-[1000] rounded-xl bg-white/90 px-4 py-3 shadow-lg ring-1 ring-slate-200/50 backdrop-blur-sm">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Urgency Legend
          </p>
          <div className="flex flex-col gap-1.5">
            {[
              { label: "Low", color: "#10b981" },
              { label: "Medium", color: "#f59e0b" },
              { label: "High", color: "#f97316" },
              { label: "Urgent", color: "#ef4444" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full ring-1 ring-black/5"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[11px] text-slate-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotspotMap;
