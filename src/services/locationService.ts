import { apiRequest } from '../lib/api';
import type { CountryResponse, StateResponse } from '../types/location';

export function listCountries(search?: string): Promise<CountryResponse[]> {
  const query = search ? `?search=${encodeURIComponent(search)}` : '';
  return apiRequest<CountryResponse[]>(`/api/countries${query}`, {
    skipAuth: true,
    skipAuthRedirect: true,
  });
}

export function getCountry(id: number): Promise<CountryResponse> {
  return apiRequest<CountryResponse>(`/api/countries/${id}`, {
    skipAuth: true,
    skipAuthRedirect: true,
  });
}

export function listStatesByCountry(countryId: number): Promise<StateResponse[]> {
  return apiRequest<StateResponse[]>(`/api/countries/${countryId}/states`, {
    skipAuth: true,
    skipAuthRedirect: true,
  });
}

export const DEFAULT_COUNTRY_ID = 161;
