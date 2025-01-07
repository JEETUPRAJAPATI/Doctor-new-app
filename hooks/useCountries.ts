import { useState, useEffect } from 'react';
import { Country } from '@/types/country';
import { fetchCountriesFromApi } from '@/services/api/countryApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEY = 'cached_countries';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    try {
      // Try to get cached data first
      const cachedData = await getCachedCountries();
      if (cachedData) {
        setCountries(cachedData);
        setLoading(false);
        return;
      }

      // If no cache, fetch from API
      const fetchedCountries = await fetchCountriesFromApi();
      setCountries(fetchedCountries);
      await cacheCountries(fetchedCountries);
      setError(null);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load countries');
      console.error('Error loading countries:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCachedCountries = async (): Promise<Country[] | null> => {
    try {
      const cached = await AsyncStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp > CACHE_EXPIRY) return null;
      
      return data;
    } catch {
      return null;
    }
  };

  const cacheCountries = async (data: Country[]) => {
    try {
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (err) {
      console.error('Failed to cache countries:', err);
    }
  };

  return { countries, loading, error, refetch: loadCountries };
}