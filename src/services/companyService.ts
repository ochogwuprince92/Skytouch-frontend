import { apiRequest } from '../lib/api';
import { buildPageQuery } from '../types/api';
import type { PaginatedResponse } from '../types/api';
import type {
  CompanyDetail,
  CompanyRequest,
  CompanyResponse,
  CompanySummary,
} from '../types/company';

// --- Employer company flow (Phase 3, documented contract) ---

export function createCompany(data: CompanyRequest): Promise<CompanyResponse> {
  return apiRequest<CompanyResponse>('/api/companies', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function getMyCompany(): Promise<CompanyResponse> {
  return apiRequest<CompanyResponse>('/api/companies/me');
}

export function updateMyCompany(
  data: Partial<CompanyRequest>,
): Promise<CompanyResponse> {
  return apiRequest<CompanyResponse>('/api/companies/me', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

// --- Public marketing pages (NOT in documented contract; best-effort) ---

export function searchCompanies(
  page: number,
  size: number,
  filters: { keyword?: string; location?: string; industry?: string } = {},
): Promise<PaginatedResponse<CompanySummary>> {
  const query = buildPageQuery({ page, size, extra: filters });
  return apiRequest<PaginatedResponse<CompanySummary>>(
    `/api/companies?${query}`,
    { skipAuth: true, skipAuthRedirect: true },
  );
}

export function getCompany(id: string): Promise<CompanyDetail> {
  return apiRequest<CompanyDetail>(`/api/companies/${id}`, {
    skipAuth: true,
    skipAuthRedirect: true,
  });
}
