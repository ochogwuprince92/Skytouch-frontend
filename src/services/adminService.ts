import { apiRequest } from '../lib/api';
import { downloadCsvFromApi } from '../lib/download';
import { buildPageQuery } from '../types/api';
import type { PaginatedResponse } from '../types/api';
import type { AdminDashboard, AdminExportType, AdminOpsResult, AuditEvent, PlatformAnalytics } from '../types/admin';
import type { CompanyResponse } from '../types/company';

export function getAdminDashboard(): Promise<AdminDashboard> {
  return apiRequest<AdminDashboard>('/api/admin/dashboard');
}

export function listPendingCompanies(
  page: number,
  size: number,
): Promise<PaginatedResponse<CompanyResponse>> {
  const query = buildPageQuery({ page, size });
  return apiRequest<PaginatedResponse<CompanyResponse>>(
    `/api/admin/companies/pending?${query}`,
  );
}

export function approveCompany(id: string): Promise<CompanyResponse> {
  return apiRequest<CompanyResponse>(`/api/admin/companies/${id}/approve`, {
    method: 'PATCH',
  });
}

export function rejectCompany(id: string): Promise<CompanyResponse> {
  return apiRequest<CompanyResponse>(`/api/admin/companies/${id}/reject`, {
    method: 'PATCH',
  });
}

export function suspendUser(id: string): Promise<void> {
  return apiRequest<void>(`/api/admin/users/${id}/suspend`, {
    method: 'PATCH',
  });
}

export function forceCloseJob(id: string): Promise<void> {
  return apiRequest<void>(`/api/admin/jobs/${id}/close`, {
    method: 'PATCH',
  });
}

export function getPlatformAnalytics(): Promise<PlatformAnalytics> {
  return apiRequest<PlatformAnalytics>('/api/admin/analytics');
}

export function listAuditEvents(
  page: number,
  size: number,
): Promise<PaginatedResponse<AuditEvent>> {
  const query = buildPageQuery({ page, size });
  return apiRequest<PaginatedResponse<AuditEvent>>(
    `/api/admin/audit-events?${query}`,
  );
}

export function exportCsv(type: AdminExportType): Promise<void> {
  return downloadCsvFromApi(`/api/admin/export/${type}`);
}

export function runJobAlertDigest(): Promise<AdminOpsResult> {
  return apiRequest<AdminOpsResult>('/api/admin/job-alerts/digest/run', {
    method: 'POST',
  });
}

export function expireStaleOffers(): Promise<AdminOpsResult> {
  return apiRequest<AdminOpsResult>('/api/admin/offers/expire-stale', {
    method: 'POST',
  });
}
