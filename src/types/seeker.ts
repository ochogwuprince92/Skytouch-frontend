import type { AccountStatus } from './admin';

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export interface JobSeekerResponse {
  id: string;
  email: string;
  status: AccountStatus;
  emailVerified: boolean;
  active: boolean;
  createdAt: string;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  job?: string | null;
  qualification?: string | null;
  cv?: string | null;
  about?: string | null;
  openToWork?: boolean | null;
  addressState?: string | null;
  addressLga?: string | null;
  addressLine?: string | null;
  nin?: string | null;
  birthday?: string | null;
  gender?: Gender | null;
  addressNo?: string | null;
}

export interface SeekerOnboardingRequest {
  job?: string;
  qualification?: string;
  about?: string;
  openToWork?: boolean;
  cv?: File;
}

export interface SeekerKycRequest {
  nin?: string;
  birthday?: string;
  gender?: Gender;
  addressNo?: string;
  addressLine?: string;
  addressLga?: string;
  addressState?: string;
  address?: string;
}

export interface ProfileCompletenessStep {
  key: string;
  label: string;
  complete: boolean;
}

export interface SeekerDashboard {
  displayName: string;
  emailVerified: boolean;
  openToWork: boolean;
  profileCompleteness: {
    percentComplete: number;
    steps: ProfileCompletenessStep[];
  };
  stats: {
    applicationsCount: number;
    savedJobsCount: number;
    interviewsCount: number;
    pendingOffersCount: number;
    jobAlertsCount: number;
  };
}
