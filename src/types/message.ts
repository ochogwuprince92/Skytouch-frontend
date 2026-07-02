import type { UserRole } from './auth';

export interface ApplicationMessageResponse {
  id: string;
  applicationId: string;
  senderEmail: string;
  senderRole: UserRole;
  body: string;
  sentAt: string;
  read: boolean;
}

export interface SendMessageRequest {
  body: string;
}
