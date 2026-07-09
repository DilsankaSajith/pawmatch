import { syncOfflineReports } from '@/app/report/upload/actions';
import { offlineStorage } from './offline-storage';
import { useQueryClient } from '@tanstack/react-query';

export const syncService = {
  syncReports: async () => {
    const unsynced = offlineStorage.getUnsyncedReports();
    const queryClient = useQueryClient();

    if (unsynced.length === 0) {
      return { synced: 0, failed: 0 };
    }

    let synced = 0;
    let failed = 0;

    for (const report of unsynced) {
      try {
        await syncOfflineReports(report);
        offlineStorage.markAsSynced(report.id);
        synced++;
      } catch (error) {
        failed++;
      }
    }

    queryClient.invalidateQueries({ queryKey: ['offlineReports'] });

    return { synced, failed };
  },

  init: () => {
    if (typeof window === 'undefined') return; // Ensure this runs only in the browser
    window.addEventListener('online', () => {
      const count = offlineStorage.getUnsyncedCount();
      if (count > 0) {
        syncService.syncReports();
      }
    });
  },
};

if (typeof window !== 'undefined') {
  syncService.init();
}
