'use client';

import { useEffect, useState } from 'react';

export function useSignalStrength() {
  const [signal, setSignal] = useState<'strong' | 'weak' | 'none'>('strong');

  useEffect(() => {
    const checkSignal = async () => {
      if (!navigator.onLine) {
        setSignal('none');
        return;
      }

      try {
        await fetch('/api/ping', { method: 'HEAD', cache: 'no-store' });
        setSignal('strong');
      } catch (error) {
        setSignal('weak');
      }
    };

    checkSignal();

    const handleOnline = () => checkSignal();
    const handleOffline = () => setSignal('none');

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { signal };
}
