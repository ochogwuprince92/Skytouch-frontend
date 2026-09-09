export type ApplicationStatus =
  | 'SUBMITTED'
  | 'REVIEWING'
  | 'SHORTLISTED'
  | 'INTERVIEW_SCHEDULED'
  | 'OFFER_EXTENDED'
  | 'OFFER_DECLINED'
  | 'HIRED'
  | 'REJECTED'
  | 'WITHDRAWN';

export interface ApplicationResponse {
  id: string;
  jobId: string;
  jobTitle: string;
  companyId: string;
  companyName: string;
  jobSeekerId: string;
  seekerName: string;
  seekerEmail: string;
  status: ApplicationStatus;
  coverLetter?: string | null;
  cvUrl?: string | null;
  appliedAt: string;
  updatedAt: string;
}

export interface ApplyRequest {
  coverLetter?: string;
  cvUrl?: string;
}

export interface UpdateApplicationStatusRequest {
  status: ApplicationStatus;
  comment?: string;
}
