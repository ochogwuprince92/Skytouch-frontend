import { apiRequest } from '../lib/api';
import type { CountryResponse, StateResponse } from '../types/location';

/** Nigeria — default country for all address/location forms. */
export const DEFAULT_COUNTRY_ID = 161;

/**
 * Public location reference endpoints (no auth required):
 *   GET /api/countries?search=<name>   -> CountryResponse[]  (plain array)
 *   GET /api/countries/{id}            -> CountryResponse
 *   GET /api/countries/{id}/states     -> StateResponse[]    (plain array)
 * `id` values are integers, not UUIDs. Responses are NOT paginated.
 *
 * Results are cached in-memory for the session so dropdowns don't refetch:
 *   - countries are keyed by (lowercased) search term
 *   - states are keyed by countryId
 */
const publicOptions = { skipAuth: true, skipAuthRedirect: true } as const;

const FALLBACK_COUNTRIES: CountryResponse[] = [
  {
    id: DEFAULT_COUNTRY_ID,
    name: 'Nigeria',
    iso2: 'NG',
    iso3: 'NGA',
    phoneCode: '234',
    currency: 'Nigerian Naira',
    currencySymbol: '₦',
    emoji: '🇳🇬',
    region: 'Africa',
    subregion: 'Western Africa',
    hasStates: true,
  },
];

const FALLBACK_STATES: Record<number, StateResponse[]> = {
  [DEFAULT_COUNTRY_ID]: [
    { id: 1, countryId: DEFAULT_COUNTRY_ID, name: 'Abia', stateCode: 'AB', hasCities: true },
    { id: 2, countryId: DEFAULT_COUNTRY_ID, name: 'Adamawa', stateCode: 'AD', hasCities: true },
    { id: 3, countryId: DEFAULT_COUNTRY_ID, name: 'Akwa Ibom', stateCode: 'AK', hasCities: true },
    { id: 4, countryId: DEFAULT_COUNTRY_ID, name: 'Anambra', stateCode: 'AN', hasCities: true },
    { id: 5, countryId: DEFAULT_COUNTRY_ID, name: 'Bauchi', stateCode: 'BA', hasCities: true },
    { id: 6, countryId: DEFAULT_COUNTRY_ID, name: 'Bayelsa', stateCode: 'BY', hasCities: true },
    { id: 7, countryId: DEFAULT_COUNTRY_ID, name: 'Benue', stateCode: 'BE', hasCities: true },
    { id: 8, countryId: DEFAULT_COUNTRY_ID, name: 'Borno', stateCode: 'BO', hasCities: true },
    { id: 9, countryId: DEFAULT_COUNTRY_ID, name: 'Cross River', stateCode: 'CR', hasCities: true },
    { id: 10, countryId: DEFAULT_COUNTRY_ID, name: 'Delta', stateCode: 'DE', hasCities: true },
    { id: 11, countryId: DEFAULT_COUNTRY_ID, name: 'Ebonyi', stateCode: 'EB', hasCities: true },
    { id: 12, countryId: DEFAULT_COUNTRY_ID, name: 'Edo', stateCode: 'ED', hasCities: true },
    { id: 13, countryId: DEFAULT_COUNTRY_ID, name: 'Ekiti', stateCode: 'EK', hasCities: true },
    { id: 14, countryId: DEFAULT_COUNTRY_ID, name: 'Enugu', stateCode: 'EN', hasCities: true },
    { id: 15, countryId: DEFAULT_COUNTRY_ID, name: 'Federal Capital Territory', stateCode: 'FC', hasCities: true },
    { id: 16, countryId: DEFAULT_COUNTRY_ID, name: 'Gombe', stateCode: 'GO', hasCities: true },
    { id: 17, countryId: DEFAULT_COUNTRY_ID, name: 'Imo', stateCode: 'IM', hasCities: true },
    { id: 18, countryId: DEFAULT_COUNTRY_ID, name: 'Jigawa', stateCode: 'JI', hasCities: true },
    { id: 19, countryId: DEFAULT_COUNTRY_ID, name: 'Kaduna', stateCode: 'KD', hasCities: true },
    { id: 20, countryId: DEFAULT_COUNTRY_ID, name: 'Kano', stateCode: 'KN', hasCities: true },
    { id: 21, countryId: DEFAULT_COUNTRY_ID, name: 'Katsina', stateCode: 'KT', hasCities: true },
    { id: 22, countryId: DEFAULT_COUNTRY_ID, name: 'Kebbi', stateCode: 'KE', hasCities: true },
    { id: 23, countryId: DEFAULT_COUNTRY_ID, name: 'Kogi', stateCode: 'KO', hasCities: true },
    { id: 24, countryId: DEFAULT_COUNTRY_ID, name: 'Kwara', stateCode: 'KW', hasCities: true },
    { id: 25, countryId: DEFAULT_COUNTRY_ID, name: 'Lagos', stateCode: 'LA', hasCities: true },
    { id: 26, countryId: DEFAULT_COUNTRY_ID, name: 'Nasarawa', stateCode: 'NA', hasCities: true },
    { id: 27, countryId: DEFAULT_COUNTRY_ID, name: 'Niger', stateCode: 'NI', hasCities: true },
    { id: 28, countryId: DEFAULT_COUNTRY_ID, name: 'Ogun', stateCode: 'OG', hasCities: true },
    { id: 29, countryId: DEFAULT_COUNTRY_ID, name: 'Ondo', stateCode: 'ON', hasCities: true },
    { id: 30, countryId: DEFAULT_COUNTRY_ID, name: 'Osun', stateCode: 'OS', hasCities: true },
    { id: 31, countryId: DEFAULT_COUNTRY_ID, name: 'Oyo', stateCode: 'OY', hasCities: true },
    { id: 32, countryId: DEFAULT_COUNTRY_ID, name: 'Plateau', stateCode: 'PL', hasCities: true },
    { id: 33, countryId: DEFAULT_COUNTRY_ID, name: 'Rivers', stateCode: 'RI', hasCities: true },
    { id: 34, countryId: DEFAULT_COUNTRY_ID, name: 'Sokoto', stateCode: 'SO', hasCities: true },
    { id: 35, countryId: DEFAULT_COUNTRY_ID, name: 'Taraba', stateCode: 'TA', hasCities: true },
    { id: 36, countryId: DEFAULT_COUNTRY_ID, name: 'Yobe', stateCode: 'YO', hasCities: true },
    { id: 37, countryId: DEFAULT_COUNTRY_ID, name: 'Zamfara', stateCode: 'ZA', hasCities: true },
  ],
};

const countriesCache = new Map<string, CountryResponse[]>();
const countryByIdCache = new Map<number, CountryResponse>();
const statesCache = new Map<number, StateResponse[]>();

export async function fetchCountries(
  search?: string,
): Promise<CountryResponse[]> {
  const key = (search ?? '').trim().toLowerCase();
  const cached = countriesCache.get(key);
  if (cached) return cached;

  const query = key ? `?search=${encodeURIComponent(key)}` : '';

  try {
    const data = await apiRequest<CountryResponse[]>(
      `/api/countries${query}`,
      publicOptions,
    );
    countriesCache.set(key, data);
    data.forEach((country) => countryByIdCache.set(country.id, country));
    return data;
  } catch {
    const fallback = FALLBACK_COUNTRIES.filter((country) => {
      if (!key) return true;
      return country.name.toLowerCase().includes(key);
    });
    countriesCache.set(key, fallback);
    fallback.forEach((country) => countryByIdCache.set(country.id, country));
    return fallback;
  }
}

export async function fetchCountry(id: number): Promise<CountryResponse> {
  const cached = countryByIdCache.get(id);
  if (cached) return cached;

  try {
    const data = await apiRequest<CountryResponse>(
      `/api/countries/${id}`,
      publicOptions,
    );
    countryByIdCache.set(id, data);
    return data;
  } catch {
    const fallback = FALLBACK_COUNTRIES.find((country) => country.id === id) ?? FALLBACK_COUNTRIES[0];
    countryByIdCache.set(id, fallback);
    return fallback;
  }
}

export async function fetchStates(countryId: number): Promise<StateResponse[]> {
  const cached = statesCache.get(countryId);
  if (cached) return cached;

  try {
    const data = await apiRequest<StateResponse[]>(
      `/api/countries/${countryId}/states`,
      publicOptions,
    );
    statesCache.set(countryId, data);
    return data;
  } catch {
    const fallback = FALLBACK_STATES[countryId] ?? [];
    statesCache.set(countryId, fallback);
    return fallback;
  }
}

/** Warm the countries cache once on app load. Errors are swallowed. */
export function prefetchCountries(): void {
  void fetchCountries().catch(() => undefined);
}

// Back-compat aliases (older imports).
export const listCountries = fetchCountries;
export const getCountry = fetchCountry;
export const listStatesByCountry = fetchStates;
