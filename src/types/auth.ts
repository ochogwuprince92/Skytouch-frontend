export type UserRole = 'JOB_SEEKER' | 'EMPLOYER' | 'ADMIN';

export type UserType = 'JOB_SEEKER' | 'EMPLOYER';

export interface AuthUser {
  userId: string;
  email: string;
  role: UserRole;
}

export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  userId: string;
  email: string;
  role: UserRole;
}

export interface RegisterRequest {
  userType: UserType;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  phone: string;
  companyName?: string;
}

export interface VerifyEmailRequest {
  otp: string;
}

export interface ResendVerificationRequest {
  email: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  newPassword: string;
}

export interface ApiErrorBody {
  status: number;
  error: string;
  message: string;
  timestamp?: string;
}
