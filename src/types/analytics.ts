export interface ApplicationFunnel {
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
}

export interface TopJobByApplicants {
  jobId: string;
  jobTitle: string;
  applicantCount: number;
  hiredCount: number;
}

export interface EmployerAnalytics {
  companyLinked: boolean;
  funnel: ApplicationFunnel;
  hireRatePercent: number;
  shortlistToHireRatePercent: number;
  topJobsByApplicants: TopJobByApplicants[];
}

export interface JobAnalytics {
  jobId: string;
  jobTitle: string;
  jobStatus: string;
  funnel: ApplicationFunnel;
  hireRatePercent: number;
  shortlistToHireRatePercent: number;
}
