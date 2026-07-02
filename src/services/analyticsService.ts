import { apiRequest } from '../lib/api';
import { downloadCsvFromApi } from '../lib/download';
import type { EmployerAnalytics, JobAnalytics } from '../types/analytics';

export function getEmployerAnalytics(): Promise<EmployerAnalytics> {
  return apiRequest<EmployerAnalytics>('/api/employers/me/analytics');
}

export function getJobAnalytics(jobId: string): Promise<JobAnalytics> {
  return apiRequest<JobAnalytics>(
    `/api/employers/me/analytics/jobs/${jobId}`,
  );
}

export function exportJobApplications(jobId: string): Promise<void> {
  return downloadCsvFromApi(`/api/jobs/${jobId}/applications/export`);
}

export function exportEmployerApplications(): Promise<void> {
  return downloadCsvFromApi('/api/employers/me/applications/export');
}

export function exportMyApplications(): Promise<void> {
  return downloadCsvFromApi('/api/applications/me/export');
}
