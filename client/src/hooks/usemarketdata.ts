import { useEffect, useState } from 'react';

interface MarketData {
  priceUsd: string;
  volume: {
    h24: number;
  };
  fdv: number;
  pairAddress: string;
}

export function useMarketData(tokenAddress: string) {
  const [data, setData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Skip if it's the placeholder address
    if (!tokenAddress || tokenAddress.includes('ANNOUNCED')) {
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`);
        const json = await response.json();
        
        if (json.pairs && json.pairs.length > 0) {
          // Get the pair with highest liquidity or volume, usually the first one
          const pair = json.pairs[0];
          setData({
            priceUsd: pair.priceUsd,
            volume: pair.volume,
            fdv: pair.fdv,
            pairAddress: pair.pairAddress
          });
        }
      } catch (err) {
        console.error('Failed to fetch market data', err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [tokenAddress]);

  return { data, loading, error };
}
