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
  const data = await apiRequest<CountryResponse[]>(
    `/api/countries${query}`,
    publicOptions,
  );
  countriesCache.set(key, data);
  data.forEach((country) => countryByIdCache.set(country.id, country));
  return data;
}

export async function fetchCountry(id: number): Promise<CountryResponse> {
  const cached = countryByIdCache.get(id);
  if (cached) return cached;

  const data = await apiRequest<CountryResponse>(
    `/api/countries/${id}`,
    publicOptions,
  );
  countryByIdCache.set(id, data);
  return data;
}

export async function fetchStates(countryId: number): Promise<StateResponse[]> {
  const cached = statesCache.get(countryId);
  if (cached) return cached;

  const data = await apiRequest<StateResponse[]>(
    `/api/countries/${countryId}/states`,
    publicOptions,
  );
  statesCache.set(countryId, data);
  return data;
}

/** Warm the countries cache once on app load. Errors are swallowed. */
export function prefetchCountries(): void {
  void fetchCountries().catch(() => undefined);
}

// Back-compat aliases (older imports).
export const listCountries = fetchCountries;
export const getCountry = fetchCountry;
export const listStatesByCountry = fetchStates;
