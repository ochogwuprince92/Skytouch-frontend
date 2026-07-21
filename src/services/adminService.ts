import { apiRequest } from '../lib/api';
import { downloadCsvFromApi } from '../lib/download';
import { buildPageQuery } from '../types/api';
import type { PaginatedResponse } from '../types/api';
import type { AdminDashboard, AdminExportType, AdminOpsResult, AuditEvent, PlatformAnalytics, CompanyModerationResponse, UserModerationResponse, JobModerationResponse } from '../types/admin';
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

export function activateUser(id: string): Promise<void> {
  return apiRequest<void>(`/api/admin/users/${id}/activate`, {
    method: 'PATCH',
  });
}

export function suspendCompany(id: string): Promise<void> {
  return apiRequest<void>(`/api/admin/companies/${id}/suspend`, {
    method: 'PATCH',
  });
}

export function activateCompany(id: string): Promise<void> {
  return apiRequest<void>(`/api/admin/companies/${id}/activate`, {
    method: 'PATCH',
  });
}

export function listUsers(
  page: number,
  size: number,
  email?: string,
  status?: string,
  emailVerified?: boolean,
): Promise<PaginatedResponse<UserModerationResponse>> {
  const extra: Record<string, string | number | boolean | undefined> = {};
  if (status) extra.status = status;
  if (email) extra.email = email;
  if (emailVerified !== undefined) extra.emailVerified = emailVerified;
  
  const query = buildPageQuery({ page, size, extra });
  return apiRequest<PaginatedResponse<UserModerationResponse>>(
    `/api/admin/users?${query}`,
  );
}

export function listCompanies(
  page: number,
  size: number,
  status?: string,
): Promise<PaginatedResponse<CompanyModerationResponse>> {
  const query = buildPageQuery({ page, size, extra: status ? { status } : {} });
  return apiRequest<PaginatedResponse<CompanyModerationResponse>>(
    `/api/admin/companies?${query}`,
  );
}

export function listJobs(
  page: number,
  size: number,
  status?: string,
): Promise<PaginatedResponse<JobModerationResponse>> {
  const query = buildPageQuery({ page, size, extra: status ? { status } : {} });
  return apiRequest<PaginatedResponse<JobModerationResponse>>(
    `/api/admin/jobs?${query}`,
  );
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

export function exportCsv(type: AdminExportType, emailFilter?: string): Promise<void> {
  const url = emailFilter 
    ? `/api/admin/export/${type}?email=${encodeURIComponent(emailFilter)}`
    : `/api/admin/export/${type}`;
  return downloadCsvFromApi(url);
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
