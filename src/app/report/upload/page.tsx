'use client';

import AnalysisReport from '@/app/report/upload/analysis-report';
import { DashboardPage } from '@/components/dashboard-page';
import ImageUploader from '@/components/image-uploader';
import { MaxWidthWrapper } from '@/components/max-width-wrapper';
import { AnalysisResult } from '@/types';
import { useState } from 'react';
import { toast } from 'sonner';

const Page = () => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [analysing, setAnalysing] = useState<boolean>(false);

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

      console.log(analysisWithLocation);
      setAnalysis(analysisWithLocation);
    } catch (err) {
      console.log(err);
    } finally {
      setAnalysing(false);
    }
  };

  return (
    <DashboardPage title="Report Stray">
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
