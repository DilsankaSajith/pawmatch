import { PET_FORMAT, processPDF } from '@/lib/pdf-processor';
import { useState } from 'react';

export function usePDFProcessing() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState<any[] | undefined>([]);
  const [error, setError] = useState<string | null>(null);
  const [rawText, setRawText] = useState<string>('');

  const processFile = async (file: File, format = PET_FORMAT) => {
    setIsProcessing(true);
    setProgress(0);
    setData([]);
    setError(null);
    setRawText('');

    try {
      setProgress(20);
      const result = await processPDF(file, format);
      setProgress(80);

      if (!result.success) {
        throw new Error(result.error);
      }

      setData(result.data);
      setRawText(result.rawText || '');
      setProgress(100);

      return result.data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to process PDF';
      setError(errorMessage);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setData([]);
    setProgress(0);
    setError(null);
    setRawText('');
  };

  return {
    processFile,
    isProcessing,
    progress,
    data,
    error,
    rawText,
    reset,
  };
}
