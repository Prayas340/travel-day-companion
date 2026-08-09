import { useState, useEffect } from 'react';

export function useNetInfo(simulatedOffline: boolean = false) {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const effectiveOnline = isOnline && !simulatedOffline;

  return {
    isOnline: effectiveOnline,
    isRealOffline: !isOnline,
    isSimulatedOffline: simulatedOffline
  };
}
