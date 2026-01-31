import { useCallback, useState } from 'react';

export function useGeolocation() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getLocation = useCallback((): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const error = 'Geolocation not supported';
        setError(error);
        reject(error);
        return;
      }

      setIsLoading(true);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(newLocation);
          setIsLoading(false);
          resolve(newLocation);
        },
        (err) => {
          const errorMsg = err.message || 'Location access denied';
          console.error('Geolocation error:', err);
          setError(errorMsg);
          setIsLoading(false);
          reject(errorMsg);
        },
        {
          timeout: 10000,
          enableHighAccuracy: true,
          maximumAge: 0,
        },
      );
    });
  }, []);

  return { location, getLocation, error, isLoading };
}
