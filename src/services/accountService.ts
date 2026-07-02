import { apiRequest } from '../lib/api';
import type {
  ChangePasswordRequest,
  DeactivateAccountRequest,
} from '../types/account';

export function changePassword(data: ChangePasswordRequest): Promise<void> {
  return apiRequest<void>('/api/auth/me/password', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export function deactivateAccount(data: DeactivateAccountRequest): Promise<void> {
  return apiRequest<void>('/api/auth/me/deactivate', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
