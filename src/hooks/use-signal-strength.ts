'use client';

import { useEffect, useState } from 'react';

type SignalStrength = 'strong' | 'weak' | 'none';

export function useSignalStrength() {
  const [signal, setSignal] = useState<SignalStrength>('strong');
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    const checkConnection = () => {
      setIsOnline(navigator.onLine);
      if (!navigator.onLine) {
        setSignal('none');
      } else {
        fetch('/api/ping', {
          method: 'HEAD',
          cache: 'no-store',
        })
          .then(() => setSignal('strong'))
          .catch(() => setSignal('weak'));
      }
    };

    checkConnection();

    window.addEventListener('online', checkConnection);
    window.addEventListener('offline', () => {
      setIsOnline(false);
      setSignal('none');
    });

    return () => {
      window.removeEventListener('online', checkConnection);
      window.removeEventListener('offline', () => {});
    };
  }, []);

  return { signal, isOnline };
}
