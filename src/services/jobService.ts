import { apiRequest } from '../lib/api';
import { buildPageQuery } from '../types/api';
import type { PaginatedResponse } from '../types/api';
import type {
  CreateJobRequest,
  JobDetail,
  JobSearchFilters,
  JobSummary,
  UpdateJobRequest,
} from '../types/job';
import type {
  ApplicationResponse,
  UpdateApplicationStatusRequest,
} from '../types/application';

export function searchJobs(
  page: number,
  size: number,
  filters: JobSearchFilters = {},
): Promise<PaginatedResponse<JobSummary>> {
  const query = buildPageQuery({
    page,
    size,
    extra: {
      keyword: filters.keyword,
      employmentType: filters.employmentType,
      workMode: filters.workMode,
      state: filters.state,
      industry: filters.industry,
    },
  });

  return apiRequest<PaginatedResponse<JobSummary>>(`/api/jobs?${query}`, {
    skipAuth: true,
    skipAuthRedirect: true,
  });
}

export function getJob(id: string): Promise<JobDetail> {
  return apiRequest<JobDetail>(`/api/jobs/${id}`, {
    skipAuth: true,
    skipAuthRedirect: true,
  });
}

/**
 * NOT in the documented contract — backs the public company detail page only.
 */
export function getCompanyJobs(
  companyId: string,
  page = 0,
  size = 20,
): Promise<PaginatedResponse<JobSummary>> {
  const query = buildPageQuery({ page, size });
  return apiRequest<PaginatedResponse<JobSummary>>(
    `/api/companies/${companyId}/jobs?${query}`,
    { skipAuth: true, skipAuthRedirect: true },
  );
}

// --- Employer job management (Phase 3) ---

export function listMyJobs(
  page: number,
  size: number,
): Promise<PaginatedResponse<JobSummary>> {
  const query = buildPageQuery({ page, size });
  return apiRequest<PaginatedResponse<JobSummary>>(`/api/jobs/me?${query}`);
}

export function createJob(data: CreateJobRequest): Promise<JobDetail> {
  return apiRequest<JobDetail>('/api/jobs', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function updateJob(
  id: string,
  data: UpdateJobRequest,
): Promise<JobDetail> {
  return apiRequest<JobDetail>(`/api/jobs/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export function publishJob(id: string): Promise<JobDetail> {
  return apiRequest<JobDetail>(`/api/jobs/${id}/publish`, { method: 'POST' });
}

export function closeJob(id: string): Promise<JobDetail> {
  return apiRequest<JobDetail>(`/api/jobs/${id}/close`, { method: 'POST' });
}

export function listJobApplicants(
  jobId: string,
  page: number,
  size: number,
): Promise<PaginatedResponse<ApplicationResponse>> {
  const query = buildPageQuery({ page, size });
  return apiRequest<PaginatedResponse<ApplicationResponse>>(
    `/api/jobs/${jobId}/applications?${query}`,
  );
}

export function updateApplicationStatus(
  jobId: string,
  applicationId: string,
  data: UpdateApplicationStatusRequest,
): Promise<ApplicationResponse> {
  return apiRequest<ApplicationResponse>(
    `/api/jobs/${jobId}/applications/${applicationId}`,
    {
      method: 'PATCH',
      body: JSON.stringify(data),
    },
  );
}
