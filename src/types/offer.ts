export type OfferStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'DECLINED'
  | 'EXPIRED'
  | 'WITHDRAWN';

export interface OfferResponse {
  id: string;
  applicationId: string;
  jobTitle: string;
  companyName: string;
  seekerName: string;
  salaryAmount: number;
  salaryCurrency: string;
  startDate: string;
  terms?: string | null;
  status: OfferStatus;
  offeredAt: string;
  expiresAt: string;
  respondedAt?: string | null;
}

export interface ExtendOfferRequest {
  salaryAmount: number;
  salaryCurrency?: string;
  startDate: string;
  terms?: string;
  expiresAt: string;
}
