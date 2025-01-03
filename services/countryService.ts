import { useState, useEffect } from 'react';

export interface Country {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
}

// Default countries in case API fails
const defaultCountries: Country[] = [
  { name: 'India', code: 'IN', dialCode: '+91', flag: 'https://flagcdn.com/w320/in.png' },
  { name: 'United States', code: 'US', dialCode: '+1', flag: 'https://flagcdn.com/w320/us.png' },
  { name: 'United Kingdom', code: 'GB', dialCode: '+44', flag: 'https://flagcdn.com/w320/gb.png' },
];

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>(defaultCountries);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      if (!response.ok) {
        throw new Error('Failed to fetch countries');
      }
      
      const data = await response.json();
      
      const formattedCountries: Country[] = data
        .filter((country: any) => country.idd?.root) // Only include countries with dial codes
        .map((country: any) => ({
          name: country.name.common,
          code: country.cca2,
          dialCode: country.idd.root + (country.idd.suffixes?.[0] || ''),
          flag: country.flags.png
        }))
        .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

      setCountries(formattedCountries);
    } catch (err) {
      console.error('Error fetching countries:', err);
      // Fallback to default countries if API fails
      setCountries(defaultCountries);
      setError('Failed to fetch countries');
    } finally {
      setLoading(false);
    }
  };

  return { countries, loading, error };
}