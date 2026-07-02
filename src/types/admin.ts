export type AccountStatus =
  | 'PENDING'
  | 'ACTIVE'
  | 'SUSPENDED'
  | 'DEACTIVATED';

export type AdminExportType = 'users' | 'jobs' | 'applications' | 'companies';

export interface AdminDashboard {
  totalUsers: number;
  jobSeekers: number;
  employers: number;
  admins: number;
  pendingEmailVerifications: number;
  pendingAccounts: number;
  pendingCompanies: number;
  activeJobs: number;
  totalApplications: number;
  totalHires: number;
  totalAuditEvents: number;
}

export interface AuditEvent {
  id: string;
  adminEmail: string;
  action: string;
  targetType?: string | null;
  targetId?: string | null;
  details?: string | null;
  createdAt: string;
}

export interface PlatformAnalytics {
  totalUsers: number;
  activeJobs: number;
  totalApplications: number;
  totalHires: number;
  pendingCompanies: number;
  applicationFunnel: {
    submitted: number;
    reviewing: number;
    shortlisted: number;
    interviewScheduled: number;
    offerExtended: number;
    offerDeclined: number;
    hired: number;
    rejected: number;
    withdrawn: number;
    total: number;
  };
  platformHireRatePercent: number;
}

export interface AdminOpsResult {
  seekersNotified?: number;
  jobsIncluded?: number;
  offersExpired?: number;
}
