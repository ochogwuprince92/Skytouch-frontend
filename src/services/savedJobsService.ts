import { apiRequest } from '../lib/api';
import { buildPageQuery } from '../types/api';
import type { PaginatedResponse } from '../types/api';
import type { JobSummary } from '../types/job';

export function listMySavedJobs(
  page: number,
  size: number,
): Promise<PaginatedResponse<JobSummary>> {
  const query = buildPageQuery({ page, size });
  return apiRequest<PaginatedResponse<JobSummary>>(
    `/api/saved-jobs/me?${query}`,
  );
}

export function saveJob(jobId: string): Promise<void> {
  return apiRequest<void>(`/api/saved-jobs/jobs/${jobId}`, { method: 'POST' });
}

export function unsaveJob(jobId: string): Promise<void> {
  return apiRequest<void>(`/api/saved-jobs/jobs/${jobId}`, {
    method: 'DELETE',
  });
}
