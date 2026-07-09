'use client';

import { useEffect, useState, useCallback } from 'react';

// Timeout in ms — if the ping takes longer than this, signal is "weak"
const PING_TIMEOUT_MS = 2000;
// How often to re-check signal strength
const POLL_INTERVAL_MS = 8000;

export function useSignalStrength() {
  const [signal, setSignal] = useState<'strong' | 'weak' | 'none'>('strong');

  const checkSignal = useCallback(async () => {
    if (!navigator.onLine) {
      setSignal('none');
      return;
    }

    // Use Network Information API if available for instant detection
    const connection = (navigator as any).connection;
    if (connection) {
      const effectiveType: string = connection.effectiveType ?? '';
      if (effectiveType === 'slow-2g' || effectiveType === '2g') {
        setSignal('weak');
        return;
      }
    }

    // Timed fetch — if it takes too long, signal is weak
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), PING_TIMEOUT_MS);

    try {
      const start = performance.now();
      await fetch(`/api/ping?_=${Date.now()}`, {
        method: 'GET',
        cache: 'no-store',
        signal: controller.signal,
      });
      const elapsed = performance.now() - start;

      // Even if the request didn't time out, a slow response indicates weak signal
      if (elapsed > PING_TIMEOUT_MS * 0.75) {
        setSignal('weak');
      } else {
        setSignal('strong');
      }
    } catch {
      // Aborted (timeout) or network error → weak signal
      setSignal(navigator.onLine ? 'weak' : 'none');
    } finally {
      clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    // Initial check
    checkSignal();

    // Poll on an interval
    const intervalId = setInterval(checkSignal, POLL_INTERVAL_MS);

    // Browser online/offline events
    const handleOnline = () => checkSignal();
    const handleOffline = () => setSignal('none');

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Network Information API change event (fires on throttle changes)
    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', checkSignal);
    }

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (connection) {
        connection.removeEventListener('change', checkSignal);
      }
    };
  }, [checkSignal]);

  return { signal };
}
