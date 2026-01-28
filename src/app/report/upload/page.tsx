'use client';

import { DashboardPage } from '@/components/dashboard-page';
import ImageUploader from '@/components/image-uploader';
import { useState } from 'react';
import { toast } from 'sonner';

interface AnalysisResult {
  animalType: string;
  animalCount: number;
  visibleIssues: string[];
  environment: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Urgent';
  description: string;
  timestamp?: string;
}

const Page = () => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [analysing, setAnalysing] = useState<boolean>(false);

  const analyzeImage = async (image: File) => {
    try {
      setAnalysing(true);

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
      setAnalysis(result);
    } catch (err) {
      console.log(err);
    } finally {
      setAnalysing(false);
    }
  };

  return (
    <DashboardPage title="Report Stray">
      <ImageUploader
        postFileUpload={analyzeImage}
        isPostUploadLoading={analysing}
      />
      <p>{analysing ? 'Analysing...' : analysis?.description}</p>
    </DashboardPage>
  );
};

export default Page;
