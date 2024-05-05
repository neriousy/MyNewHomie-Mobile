import { useEffect, useState } from 'react';
import * as Network from 'expo-network';

export default function useNetwork() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const state = await Network.getNetworkStateAsync();
      if (state.isInternetReachable) {
        setIsConnected(true);
      }

      setIsLoading(false);
    })();
  }, []);

  return {
    isConnected,
    isLoading,
  };
}
