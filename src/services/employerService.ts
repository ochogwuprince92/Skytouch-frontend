import { apiRequest } from '../lib/api';
import type {
  EmployerDashboard,
  EmployerResponse,
  UpdateEmployerProfileRequest,
} from '../types/employer';

export function getMyEmployerProfile(): Promise<EmployerResponse> {
  return apiRequest<EmployerResponse>('/api/employers/me');
}

export function updateMyEmployerProfile(
  data: UpdateEmployerProfileRequest,
): Promise<EmployerResponse> {
  return apiRequest<EmployerResponse>('/api/employers/me/profile', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export function getMyEmployerDashboard(): Promise<EmployerDashboard> {
  return apiRequest<EmployerDashboard>('/api/employers/me/dashboard');
}
