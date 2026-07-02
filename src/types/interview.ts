export type InterviewMode = 'IN_PERSON' | 'VIDEO' | 'PHONE';

export type InterviewStatus =
  | 'SCHEDULED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'NO_SHOW';

export interface InterviewResponse {
  id: string;
  applicationId: string;
  jobTitle: string;
  companyName: string;
  seekerName: string;
  scheduledAt: string;
  durationMinutes: number;
  mode: InterviewMode;
  locationOrLink?: string | null;
  status: InterviewStatus;
  notes?: string | null;
  createdAt: string;
}

export interface ScheduleInterviewRequest {
  scheduledAt: string;
  durationMinutes?: number;
  mode: InterviewMode;
  locationOrLink?: string;
  notes?: string;
}

export interface UpdateInterviewRequest {
  scheduledAt?: string;
  durationMinutes?: number;
  mode?: InterviewMode;
  locationOrLink?: string;
  notes?: string;
  status?: InterviewStatus;
}
