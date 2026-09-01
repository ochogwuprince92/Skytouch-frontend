import { apiRequest } from '../lib/api';
import { buildPageQuery } from '../types/api';
import type { PaginatedResponse } from '../types/api';
import type {
  ApplicationResponse,
  ApplyRequest,
} from '../types/application';
import type {
  JobSeekerResponse,
  SeekerDashboard,
  SeekerKycRequest,
  SeekerOnboardingRequest,
} from '../types/seeker';

export function getMyProfile(): Promise<JobSeekerResponse> {
  return apiRequest<JobSeekerResponse>('/api/job-seekers/me');
}

export function getMyDashboard(): Promise<SeekerDashboard> {
  return apiRequest<SeekerDashboard>('/api/job-seekers/me/dashboard');
}

export function completeOnboarding(
  data: SeekerOnboardingRequest,
): Promise<JobSeekerResponse> {
  const formData = new FormData();
  if (data.job !== undefined) formData.append('job', data.job);
  if (data.qualification !== undefined)
    formData.append('qualification', data.qualification);
  if (data.about !== undefined) formData.append('about', data.about);
  if (data.openToWork !== undefined)
    formData.append('openToWork', String(data.openToWork));
  if (data.cv) formData.append('cv', data.cv);

  return apiRequest<JobSeekerResponse>('/api/job-seekers/me/onboarding', {
    method: 'PATCH',
    body: formData,
  });
}

export function uploadCv(file: File): Promise<{ cvUrl: string }> {
  const formData = new FormData();
  formData.append('cv', file);
  return apiRequest<{ cvUrl: string }>('/api/job-seekers/me/cv', {
    method: 'POST',
    body: formData,
  });
}

export function updateKyc(data: SeekerKycRequest): Promise<JobSeekerResponse> {
  return apiRequest<JobSeekerResponse>('/api/job-seekers/me/kyc', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export function applyToJob(
  jobId: string,
  data: ApplyRequest = {},
  cvFile?: File,
): Promise<ApplicationResponse> {
  if (cvFile) {
    const formData = new FormData();
    if (data.coverLetter) formData.append('coverLetter', data.coverLetter);
    formData.append('cv', cvFile);
    return apiRequest<ApplicationResponse>(`/api/jobs/${jobId}/applications`, {
      method: 'POST',
      body: formData,
    });
  }
  return apiRequest<ApplicationResponse>(`/api/jobs/${jobId}/applications`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export function listMyApplications(
  page: number,
  size: number,
): Promise<PaginatedResponse<ApplicationResponse>> {
  const query = buildPageQuery({ page, size });
  return apiRequest<PaginatedResponse<ApplicationResponse>>(
    `/api/applications/me?${query}`,
  );
}

export function getMyApplication(id: string): Promise<ApplicationResponse> {
  return apiRequest<ApplicationResponse>(`/api/applications/me/${id}`);
}

export function withdrawApplication(id: string): Promise<ApplicationResponse> {
  return apiRequest<ApplicationResponse>(
    `/api/applications/me/${id}/withdraw`,
    { method: 'POST' },
  );
}
