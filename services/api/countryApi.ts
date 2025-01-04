import { Country } from '@/types/country';
import { defaultCountries } from '@/utils/defaultCountries';
import { getDialCode, getFlagUrl } from '@/utils/api/countryUtils';

const API_URL = 'https://api.first.org/data/v1/countries';

export async function fetchCountriesFromApi(): Promise<Country[]> {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data?.data || Object.keys(data.data).length === 0) {
      return defaultCountries;
    }

    const countries: Country[] = Object.entries(data.data)
      .map(([code, country]: [string, any]) => ({
        name: country.country,
        code: code,
        dialCode: getDialCode(code),
        flag: getFlagUrl(code)
      }))
      .filter(country => country.name && country.dialCode);

    return countries;
      
  } catch (error) {
    console.error('Failed to fetch countries:', error);
    return defaultCountries;
  }
}