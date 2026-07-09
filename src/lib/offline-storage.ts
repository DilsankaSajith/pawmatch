import { OfflineReport } from '@/types/offline-report';

const STORAGE_KEY = 'offline_reports';

export const offlineStorage = {
  getReports: (): OfflineReport[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      return [];
    }
  },

  saveReport: (report: Omit<OfflineReport, 'id' | 'createdAt' | 'synced'>) => {
    const reports = offlineStorage.getReports();
    const newReport: OfflineReport = {
      ...report,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      synced: false,
    };
    reports.push(newReport);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
    return newReport;
  },

  getUnsyncedReports: (): OfflineReport[] => {
    return offlineStorage.getReports().filter((r) => !r.synced);
  },

  markAsSynced: (id: string) => {
    const reports = offlineStorage.getReports();
    const updated = reports.map((r) =>
      r.id === id ? { ...r, synced: true } : r,
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  getUnsyncedCount: (): number => {
    return offlineStorage.getUnsyncedReports().length;
  },
};
