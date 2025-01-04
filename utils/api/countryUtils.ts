import { COUNTRY_DIAL_CODES } from '../constants/dialCodes';

export function getDialCode(code: string): string {
  return COUNTRY_DIAL_CODES[code] || '+0';
}

export function getFlagUrl(code: string): string {
  return `https://flagcdn.com/w320/${code.toLowerCase()}.png`;
}