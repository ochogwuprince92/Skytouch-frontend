export type NotificationType =
  | 'APPLICATION_SUBMITTED'
  | 'NEW_APPLICATION'
  | 'APPLICATION_STATUS_UPDATED'
  | 'INTERVIEW_SCHEDULED'
  | 'INTERVIEW_UPDATED'
  | 'NEW_MESSAGE'
  | 'COMPANY_APPROVED'
  | 'COMPANY_REJECTED'
  | 'ACCOUNT_SUSPENDED'
  | 'OFFER_EXTENDED'
  | 'OFFER_ACCEPTED'
  | 'OFFER_DECLINED'
  | 'HIRED'
  | 'JOB_ALERT_MATCH'
  | 'JOB_ALERT_DIGEST';

export interface NotificationResponse {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  applicationId?: string | null;
  read: boolean;
  createdAt: string;
}

export interface UnreadCountResponse {
  unreadCount: number;
}
