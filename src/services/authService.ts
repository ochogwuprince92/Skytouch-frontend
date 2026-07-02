import { apiRequest } from '../lib/api';
import type {
  ForgotPasswordRequest,
  LoginResponse,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyEmailRequest,
  ResendVerificationRequest,
} from '../types/auth';

export function register(data: RegisterRequest): Promise<void> {
  return apiRequest<void>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
    skipAuth: true,
    skipAuthRedirect: true,
  });
}

export function login(email: string, password: string): Promise<LoginResponse> {
  return apiRequest<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    skipAuth: true,
    skipAuthRedirect: true,
  });
}

export function logout(): Promise<void> {
  return apiRequest<void>('/api/auth/logout', {
    method: 'POST',
  });
}

export function verifyEmail(
  email: string,
  data: VerifyEmailRequest,
): Promise<void> {
  return apiRequest<void>(
    `/api/auth/verify-email/${encodeURIComponent(email)}`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      skipAuth: true,
      skipAuthRedirect: true,
    },
  );
}

export function resendVerificationEmail(
  data: ResendVerificationRequest,
): Promise<void> {
  return apiRequest<void>('/api/auth/verify-email/resend', {
    method: 'POST',
    body: JSON.stringify(data),
    skipAuth: true,
    skipAuthRedirect: true,
  });
}

export function forgotPassword(data: ForgotPasswordRequest): Promise<void> {
  return apiRequest<void>('/api/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify(data),
    skipAuth: true,
    skipAuthRedirect: true,
  });
}

export function resetPassword(
  data: ResetPasswordRequest,
): Promise<LoginResponse> {
  return apiRequest<LoginResponse>('/api/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(data),
    skipAuth: true,
    skipAuthRedirect: true,
  });
}
