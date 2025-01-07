import { Country } from '@/types/country';
import { defaultCountries } from '@/utils/defaultCountries';

const API_URL = 'https://restcountries.com/v3.1/all';

export async function fetchCountriesFromApi(): Promise<Country[]> {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      console.log('API response not ok, falling back to default countries');
      return defaultCountries;
    }
    
    const data = await response.json();
    
    if (!Array.isArray(data)) {
      console.log('Invalid API response format, falling back to default countries');
      return defaultCountries;
    }

    const countries: Country[] = data
      .filter((country: any) => 
        country.idd?.root && 
        country.name?.common &&
        country.cca2 &&
        country.flags?.png
      )
      .map((country: any) => ({
        name: country.name.common,
        code: country.cca2,
        dialCode: country.idd.root + (country.idd.suffixes?.[0] || ''),
        flag: country.flags.png
      }))
      .sort((a: Country, b: Country) => a.name.localeCompare(b.name));

    if (countries.length === 0) {
      console.log('No valid countries found, falling back to default countries');
      return defaultCountries;
    }

    return countries;
  } catch (error) {
    console.log('Error fetching countries, falling back to default countries:', error);
    return defaultCountries;
  }
}