"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { ChevronDown, ChevronUp, Filter, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const FilterSection = ({ title, children, defaultOpen = true }: FilterSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100 py-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-gray-600 transition-colors"
      >
        <span>{title}</span>
        {isOpen ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
      </button>
      {isOpen && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
};

export const FilterSidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const toggleFilter = (name: string, value: string) => {
    const current = searchParams.get(name);
    const newValue = current === value ? "" : value;
    router.push(`${pathname}?${createQueryString(name, newValue)}`, { scroll: false });
  };

  const isSelected = (name: string, value: string) => searchParams.get(name) === value;

  // Don't show filters if not on the main dashboard route
  if (pathname !== "/dashboard") return null;

  return (
    <div className="flex flex-col gap-6 mt-8">
      {/* BROWSE section */}
      <FilterSection title="Browse">
        <div className="space-y-1">
          {[
            { label: "All Pets", value: "" },
            { label: "Dogs", value: "Dog" },
            { label: "Cats", value: "Cat" },
            { label: "Others", value: "Other" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => toggleFilter("type", item.value)}
              className={cn(
                "flex w-full items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-colors",
                (isSelected("type", item.value) || (!searchParams.get("type") && item.value === ""))
                  ? "bg-brand-50 text-brand-700 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <LayoutGrid className="size-4 opacity-50" />
              {item.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* FILTERS section */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
          <Filter className="size-3" />
          FILTERS
        </div>

        <FilterSection title="Sort by">
          <select
            className="w-full text-sm bg-white border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-brand-500"
            value={searchParams.get("sort") || "newest"}
            onChange={(e) => router.push(`${pathname}?${createQueryString("sort", e.target.value)}`, { scroll: false })}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </FilterSection>

        <FilterSection title="Age">
          <div className="space-y-2">
            {[
              { label: "Puppy/Kitten (0-1 yr)", value: "puppy" },
              { label: "Young (1-3 yrs)", value: "young" },
              { label: "Adult (3-7 yrs)", value: "adult" },
              { label: "Senior (7+ yrs)", value: "senior" },
            ].map((age) => (
              <label key={age.value} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isSelected("age", age.value)}
                  onChange={() => toggleFilter("age", age.value)}
                  className="rounded border-gray-300 text-brand-600 focus:ring-brand-500 size-4 cursor-pointer"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  {age.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Gender">
          <div className="space-y-2">
            {["Male", "Female"].map((gender) => (
              <label key={gender} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isSelected("gender", gender)}
                  onChange={() => toggleFilter("gender", gender)}
                  className="rounded border-gray-300 text-brand-600 focus:ring-brand-500 size-4 cursor-pointer"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  {gender}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Size">
          <div className="space-y-2">
            {["Small", "Medium", "Large"].map((size) => (
              <label key={size} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isSelected("size", size)}
                  onChange={() => toggleFilter("size", size)}
                  className="rounded border-gray-300 text-brand-600 focus:ring-brand-500 size-4 cursor-pointer"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  {size}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Health & Care">
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={isSelected("vaccinated", "true")}
                onChange={() => toggleFilter("vaccinated", "true")}
                className="rounded border-gray-300 text-brand-600 focus:ring-brand-500 size-4 cursor-pointer"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                Vaccinated
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={isSelected("neutered", "true")}
                onChange={() => toggleFilter("neutered", "true")}
                className="rounded border-gray-300 text-brand-600 focus:ring-brand-500 size-4 cursor-pointer"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                Neutered
              </span>
            </label>
          </div>
        </FilterSection>
      </div>
    </div>
  );
};
