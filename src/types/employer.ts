import type { AccountStatus } from './admin';
import type { ProfileCompletenessStep } from './seeker';

export interface EmployerResponse {
  id: string;
  email: string;
  status: AccountStatus;
  emailVerified: boolean;
  active: boolean;
  createdAt: string;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  companyName?: string | null;
  companyId?: string | null;
  jobTitle?: string | null;
}

export interface UpdateEmployerProfileRequest {
  firstName?: string;
  lastName?: string;
  companyName?: string;
  jobTitle?: string;
}

export interface EmployerDashboard {
  displayName: string;
  companyName?: string | null;
  emailVerified: boolean;
  companyLinked: boolean;
  profileCompleteness: {
    percentComplete: number;
    steps: ProfileCompletenessStep[];
  };
  stats: {
    activeJobsCount: number;
    totalApplicantsCount: number;
    draftJobsCount: number;
    openOffersCount: number;
    hiresCount: number;
  };
}
