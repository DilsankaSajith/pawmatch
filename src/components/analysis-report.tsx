import { AnalysisResult } from '@/types';
import { useEffect, useState } from 'react';
import ReportMap from './report-map';

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
      {analysis.location?.lat}
      {imageUrl}
      <ReportMap lat={analysis.location?.lat!} lng={analysis.location?.lng!} />
    </div>
  );
};

export default AnalysisReport;
