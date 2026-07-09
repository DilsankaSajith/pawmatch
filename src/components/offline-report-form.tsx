import { useGeolocation } from '@/hooks/useGeolocation';
import { offlineStorage } from '@/lib/offline-storage';
import { syncService } from '@/lib/sync-service';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Field, FieldGroup } from '@/components/ui/field';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Dog, Cat, HelpCircle, Loader2, Send } from 'lucide-react';

const animalOptions = [
  { value: 'Dog' as const, label: 'Dog', icon: Dog },
  { value: 'Cat' as const, label: 'Cat', icon: Cat },
  { value: 'Other' as const, label: 'Other', icon: HelpCircle },
];

function OfflineReportForm() {
  const [animalType, setAnimalType] = useState<'Dog' | 'Cat' | 'Other'>('Dog');
  const [description, setDescription] = useState('');
  const { getLocation } = useGeolocation();
  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: async (data: {
      animalType: 'Dog' | 'Cat' | 'Other';
      description: string;
    }) => {
      const location = await getLocation();
      if (!location) throw new Error('Location not available');

      return offlineStorage.saveReport({
        animalType: data.animalType,
        description: data.description,
        location,
      });
    },
    onSuccess: async () => {
      if (navigator.onLine) {
        await syncService.syncReports();
      }
      queryClient.invalidateQueries({ queryKey: ['offlineReports'] });
      setDescription('');
      toast.success('Report saved offline successfully');
    },
    onError: (error) => {
      console.error('Failed to save report:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate({ animalType, description });
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white shadow-md overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
        <h3 className="text-base font-semibold text-slate-800">
          Quick Offline Report
        </h3>
        <p className="text-sm text-slate-500 mt-0.5">
          Describe the animal you spotted — we'll sync it when you're back
          online.
        </p>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-6">
        <FieldGroup>
          {/* Animal Type Selector */}
          <Field>
            <Label>Animal Type</Label>
            <div className="flex gap-2">
              {animalOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = animalType === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setAnimalType(option.value)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-brand-600 bg-brand-50 text-brand-700 ring-1 ring-brand-600/20'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {option.label}
                  </button>
                );
              })}
            </div>
          </Field>

          {/* Description */}
          <Field>
            <Label htmlFor="offline-description">Description</Label>
            <Textarea
              id="offline-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Small brown dog near the park entrance, looks scared and hungry..."
              required
              rows={4}
              className="resize-none"
            />
          </Field>

          {/* Submit */}
          <Button
            type="submit"
            disabled={saveMutation.isPending}
            className="w-full"
          >
            {saveMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Save Report
              </>
            )}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}

export default OfflineReportForm;
