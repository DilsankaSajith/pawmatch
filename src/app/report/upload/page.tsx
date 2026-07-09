'use client';

import AnalysisReport from '@/app/report/upload/analysis-report';
import { DashboardPage } from '@/components/dashboard-page';
import ImageUploader from '@/components/image-uploader';
import { MaxWidthWrapper } from '@/components/max-width-wrapper';
import OfflineReportForm from '@/components/offline-report-form';
import { useSignalStrength } from '@/hooks/use-signal-strength';
import { offlineStorage } from '@/lib/offline-storage';
import { syncService } from '@/lib/sync-service';
import { AnalysisResult } from '@/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { WifiOff, Signal, Clock } from 'lucide-react';

const Page = () => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [analysing, setAnalysing] = useState<boolean>(false);
  const { signal } = useSignalStrength();
  // const signal = 'weak';
  const queryClient = useQueryClient();

  // Query to get unsynced count
  const { data: unsyncedCount = 0 } = useQuery({
    queryKey: ['offlineReports'],
    queryFn: () => offlineStorage.getUnsyncedCount(),
    refetchInterval: 5000,
  });

  const getCurrentLocation = (): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => reject(error),
      );
    });
  };

  const analyzeImage = async (image: File) => {
    try {
      setAnalysing(true);

      // Get location
      let location = null;
      try {
        location = await getCurrentLocation();
      } catch (error) {
        toast.warning('Location access denied');
      }

      const formData = new FormData();
      formData.append('image', image);

      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        toast.error('Something went wrong on our side. Please try again later');
        console.log(`API error: ${response.status}`);
      }

      const result = await response.json();

      const analysisWithLocation = {
        ...result,
        location,
        timestamp: new Date().toISOString(),
      };

      setAnalysis(analysisWithLocation);
    } catch (err) {
      console.log(err);
    } finally {
      setAnalysing(false);
    }
  };

  // Sync offline reports when signal recovers to strong
  useEffect(() => {
    if (signal === 'strong' && unsyncedCount > 0) {
      syncService.syncReports().then(() => {
        queryClient.invalidateQueries({ queryKey: ['offlineReports'] });
        toast.success(`Synced ${unsyncedCount} offline report${unsyncedCount !== 1 ? 's' : ''}!`);
      });
    }
  }, [signal, unsyncedCount, queryClient]);

  if (signal === 'weak' || signal === 'none') {
    return (
      <DashboardPage
        title="Rescue Starts With You"
        subtitle="Your small action can lead to a safer, happier life for a stray ❤️"
      >
        <MaxWidthWrapper>
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Connection Status Banner */}
            <div className="rounded-2xl border border-amber-200/60 bg-gradient-to-br from-amber-50 to-orange-50/50 shadow-sm overflow-hidden">
              <div className="flex items-start gap-4 p-5">
                {/* Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100">
                  {signal === 'none' ? (
                    <WifiOff className="h-5 w-5 text-amber-600" />
                  ) : (
                    <Signal className="h-5 w-5 text-amber-600" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-amber-900">
                    {signal === 'none'
                      ? 'You are currently offline'
                      : 'Weak signal detected'}
                  </p>
                  <p className="text-sm text-amber-700/80 mt-1 leading-relaxed">
                    Your report will be saved locally and automatically synced
                    when you're back online.
                  </p>

                  {unsyncedCount > 0 && (
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-amber-100/80 px-3 py-1.5">
                      <Clock className="h-3.5 w-3.5 text-amber-700" />
                      <span className="text-xs font-medium text-amber-800">
                        {unsyncedCount} report{unsyncedCount !== 1 && 's'}{' '}
                        waiting to sync
                      </span>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Offline Report Form */}
            <OfflineReportForm />
          </div>
        </MaxWidthWrapper>
      </DashboardPage>
    );
  }

  return (
    <DashboardPage
      title="Rescue Starts With You"
      subtitle="Your small action can lead to a safer, happier life for a stray ❤️"
    >
      <MaxWidthWrapper>
        {analysis ? (
          <AnalysisReport analysis={analysis} />
        ) : (
          <ImageUploader
            postFileUpload={analyzeImage}
            isPostUploadLoading={analysing}
          />
        )}
      </MaxWidthWrapper>
    </DashboardPage>
  );
};

export default Page;
