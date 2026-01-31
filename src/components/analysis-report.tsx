import { AnalysisResult } from '@/types';
import { useEffect, useState } from 'react';

interface AnalysisReportProps {
  analysis: AnalysisResult;
}

const AnalysisReport = ({ analysis }: AnalysisReportProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    setImageUrl(localStorage.getItem('uploaded-image-url')!);
  }, []);

  return (
    <div>
      {analysis.description}
      {imageUrl}
    </div>
  );
};

export default AnalysisReport;
