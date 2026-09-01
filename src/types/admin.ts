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

export interface UserModerationResponse {
  id: string;
  email: string;
  role: string;
  status: string;
  emailVerified: boolean;
  createdAt: string;
}

export interface CompanyModerationResponse {
  id: string;
  name: string;
  industry: string | null;
  status: string;
  createdAt: string;
  updatedAt: string | null;
  employerEmail?: string;
  employerRole?: string;
  employerStatus?: string;
  employerEmailVerified?: boolean;
  subscriptionId?: string;
  subscriptionPlan?: string;
  subscriptionStatus?: string;
  subscriptionBillingCycle?: string;
  subscriptionExpiresAt?: string;
}

export interface JobModerationResponse {
  id: string;
  companyName: string;
  title: string;
  employmentType: string;
  workMode: string;
  salaryMin: number | null;
  salaryMax: number | null;
  locationState: string;
  status: string;
  createdAt: string;
}

export interface SubscriptionModerationResponse {
  id: string;
  companyName: string;
  companyEmail?: string;
  plan: string;
  status: string;
  billingCycle: string;
  startDate: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string | null;
}

export interface PaymentModerationResponse {
  id: string;
  reference: string;
  companyName?: string;
  customerEmail: string;
  amount: number;
  currency: string;
  status: string;
  gatewayResponse?: string | null;
  paidAt?: string | null;
  createdAt: string;
  updatedAt: string | null;
}
