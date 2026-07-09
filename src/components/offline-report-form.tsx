import { useGeolocation } from '@/hooks/useGeolocation';
import { offlineStorage } from '@/lib/offline-storage';
import { syncService } from '@/lib/sync-service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offlineReports'] });
      if (navigator.onLine) {
        syncService.syncReports();
      }
      setDescription('');
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
    <form onSubmit={handleSubmit}>
      <select
        value={animalType}
        onChange={(e) => setAnimalType(e.target.value as any)}
      >
        <option value="Dog">Dog</option>
        <option value="Cat">Cat</option>
        <option value="Other">Other</option>
      </select>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />

      <button type="submit" disabled={saveMutation.isPending}>
        {saveMutation.isPending ? 'Saving...' : 'Save Report'}
      </button>
    </form>
  );
}

export default OfflineReportForm;
