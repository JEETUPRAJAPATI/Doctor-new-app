import { useState, useEffect } from 'react';
import { Country } from '@/types/country';
import { fetchCountriesFromApi } from '@/services/api/countryApi';
import { defaultCountries } from '@/utils/defaultCountries';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEY = 'cached_countries';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>(defaultCountries);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    try {
      // Try to load from cache first
      const cachedData = await getCachedCountries();
      if (cachedData) {
        setCountries(cachedData);
        setLoading(false);
        return;
      }

      // If no cache, fetch from API
      const fetchedCountries = await fetchCountriesFromApi();
      const sortedCountries = fetchedCountries.sort((a, b) => 
        a.name.localeCompare(b.name)
      );
      
      setCountries(sortedCountries);
      // Cache the results
      await cacheCountries(sortedCountries);
      
    } catch (err) {
      console.error('Error loading countries:', err);
      setError('Unable to load countries. Using default list.');
      setCountries(defaultCountries);
    } finally {
      setLoading(false);
    }
  };

  const getCachedCountries = async (): Promise<Country[] | null> => {
    try {
      const cached = await AsyncStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      const isExpired = Date.now() - timestamp > CACHE_EXPIRY;
      
      return isExpired ? null : data;
    } catch {
      return null;
    }
  };

  const cacheCountries = async (data: Country[]) => {
    try {
      const cacheData = {
        data,
        timestamp: Date.now()
      };
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    } catch (err) {
      console.error('Failed to cache countries:', err);
    }
  };

  return { countries, loading, error };
}