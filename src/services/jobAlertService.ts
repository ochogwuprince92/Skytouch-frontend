import { apiRequest } from '../lib/api';
import { buildPageQuery } from '../types/api';
import type { PaginatedResponse } from '../types/api';
import type { JobAlertRequest, JobAlertResponse } from '../types/jobAlert';

export function listMyJobAlerts(
  page: number,
  size: number,
): Promise<PaginatedResponse<JobAlertResponse>> {
  const query = buildPageQuery({ page, size });
  return apiRequest<PaginatedResponse<JobAlertResponse>>(
    `/api/job-alerts/me?${query}`,
  );
}

export function createJobAlert(data: JobAlertRequest): Promise<JobAlertResponse> {
  return apiRequest<JobAlertResponse>('/api/job-alerts', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateJobAlert(
  id: string,
  data: JobAlertRequest,
): Promise<JobAlertResponse> {
  return apiRequest<JobAlertResponse>(`/api/job-alerts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export function deleteJobAlert(id: string): Promise<void> {
  return apiRequest<void>(`/api/job-alerts/${id}`, { method: 'DELETE' });
}
