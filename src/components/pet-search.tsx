'use client';

import { useState } from 'react';
import { Search, Sparkles, PawPrint, SearchX } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { searchPetsBySemantic } from '@/app/dashboard/search-actions';
import { Pet } from '@/types';
import RecommendedPetCard from './recommended-pet-card';

const PetSearch = () => {
  const [description, setDescription] = useState('');
  const [results, setResults] = useState<Pet[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const { mutate: server_searchPet, isPending } = useMutation({
    mutationFn: (query: string) => searchPetsBySemantic(query),
    onSuccess: (pets) => {
      setResults(pets as Pet[]);
      setHasSearched(true);
      if ((pets as Pet[]).length > 0) {
        toast.success(`Found ${(pets as Pet[]).length} matching pets! 🐾`);
      }
    },
    onError: (error) => {
      toast.error(error.message || 'Something went wrong. Please try again.');
    },
  });

  return (
    <div className="mb-8 space-y-6">
      {/* ── Search Panel ── */}
      <div className="relative rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-25 via-white to-brand-50 p-6 shadow-sm">
        {/* Decorative accent */}
        <div className="absolute -top-px left-8 right-8 h-[2px] rounded-full bg-gradient-to-r from-transparent via-brand-400 to-transparent" />

        {/* Header */}
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-brand-700/10">
            <Sparkles className="size-4 text-brand-700" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-800">
              Describe Your Perfect Pet
            </h2>
            <p className="text-xs text-slate-500">
              Tell us what you&apos;re looking for and we&apos;ll find the best
              match
            </p>
          </div>
        </div>

        {/* Input area */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="relative flex-1">
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. A calm, medium-sized dog that's great with kids and doesn't shed much..."
              className="min-h-[80px] resize-none rounded-xl border-slate-200 bg-white/80 pr-4 text-sm text-slate-700 shadow-none backdrop-blur-sm placeholder:text-slate-400 focus-visible:border-brand-300 focus-visible:ring-brand-200/40"
              rows={3}
            />
          </div>

          <Button onClick={() => server_searchPet(description)}>
            <Search className="size-4" />
            {isPending ? 'Finding...' : 'Find Pets'}
          </Button>
        </div>
      </div>

      {/* ── Loading State ── */}
      {isPending && (
        <div className="flex flex-col items-center justify-center gap-4 py-16">
          <div className="relative">
            <div className="size-14 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600" />
            <PawPrint className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 text-brand-600" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-700">
              Searching for your perfect match…
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Our AI is finding the best companions for you
            </p>
          </div>
        </div>
      )}

      {/* ── Search Results ── */}
      {!isPending && hasSearched && results.length > 0 && (
        <div className="space-y-5">
          {/* Results header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-100 to-brand-200">
                <PawPrint className="size-4 text-brand-700" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">
                  Recommended Pets
                </h3>
                <p className="text-xs text-slate-400">
                  {results.length} pet{results.length !== 1 ? 's' : ''} matched
                  your description
                </p>
              </div>
            </div>
          </div>

          {/* Results list */}
          <div className="grid gap-5">
            {results.map((pet, index) => (
              <div
                key={pet.id}
                className="animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
              >
                <RecommendedPetCard
                  pet={pet}
                  matchScore={
                    (pet as Pet & { similarity?: number }).similarity ??
                    undefined
                  }
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Empty State ── */}
      {!isPending && hasSearched && results.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 py-16">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-slate-100">
            <SearchX className="size-7 text-slate-400" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-600">
              No matching pets found
            </p>
            <p className="mx-auto mt-1 max-w-xs text-xs text-slate-400">
              Try adjusting your description or using different keywords to
              discover more companions
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetSearch;
