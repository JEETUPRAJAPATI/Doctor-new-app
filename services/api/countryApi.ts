import { Country } from '@/types/country';

const API_URL = 'https://restcountries.com/v3.1/all?fields=name,cca2,idd,flags';

export async function fetchCountriesFromApi(): Promise<Country[]> {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data
      .filter((country: any) => 
        country.idd?.root && 
        country.flags?.png && 
        country.name?.common
      )
      .map((country: any) => ({
        name: country.name.common,
        code: country.cca2,
        dialCode: `${country.idd.root}${country.idd.suffixes?.[0] || ''}`,
        flag: country.flags.png
      }));
      
  } catch (error) {
    console.error('Failed to fetch countries:', error);
    throw error;
  }
}