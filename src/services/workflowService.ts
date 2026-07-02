import { apiRequest } from '../lib/api';
import { buildPageQuery } from '../types/api';
import type { PaginatedResponse } from '../types/api';
import type {
  ApplicationMessageResponse,
  SendMessageRequest,
} from '../types/message';
import type {
  InterviewResponse,
  ScheduleInterviewRequest,
  UpdateInterviewRequest,
} from '../types/interview';
import type { ExtendOfferRequest, OfferResponse } from '../types/offer';

// --- Messages ---

export function listApplicationMessages(
  applicationId: string,
  page: number,
  size: number,
): Promise<PaginatedResponse<ApplicationMessageResponse>> {
  const query = buildPageQuery({ page, size });
  return apiRequest<PaginatedResponse<ApplicationMessageResponse>>(
    `/api/applications/${applicationId}/messages?${query}`,
  );
}

export function sendApplicationMessage(
  applicationId: string,
  data: SendMessageRequest,
): Promise<ApplicationMessageResponse> {
  return apiRequest<ApplicationMessageResponse>(
    `/api/applications/${applicationId}/messages`,
    { method: 'POST', body: JSON.stringify(data) },
  );
}

export function markApplicationMessagesRead(
  applicationId: string,
): Promise<void> {
  return apiRequest<void>(
    `/api/applications/${applicationId}/messages/read`,
    { method: 'POST' },
  );
}

// --- Interviews ---

export function listApplicationInterviews(
  applicationId: string,
): Promise<InterviewResponse[]> {
  return apiRequest<InterviewResponse[]>(
    `/api/applications/${applicationId}/interviews`,
  );
}

export function scheduleInterview(
  applicationId: string,
  data: ScheduleInterviewRequest,
): Promise<InterviewResponse> {
  return apiRequest<InterviewResponse>(
    `/api/applications/${applicationId}/interviews`,
    { method: 'POST', body: JSON.stringify(data) },
  );
}

export function updateInterview(
  id: string,
  data: UpdateInterviewRequest,
): Promise<InterviewResponse> {
  return apiRequest<InterviewResponse>(`/api/interviews/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export function listMyInterviews(
  page: number,
  size: number,
): Promise<PaginatedResponse<InterviewResponse>> {
  const query = buildPageQuery({ page, size });
  return apiRequest<PaginatedResponse<InterviewResponse>>(
    `/api/interviews/me?${query}`,
  );
}

// --- Offers ---

export function listApplicationOffers(
  applicationId: string,
): Promise<OfferResponse[]> {
  return apiRequest<OfferResponse[]>(
    `/api/applications/${applicationId}/offers`,
  );
}

export function extendOffer(
  applicationId: string,
  data: ExtendOfferRequest,
): Promise<OfferResponse> {
  return apiRequest<OfferResponse>(
    `/api/applications/${applicationId}/offers`,
    { method: 'POST', body: JSON.stringify(data) },
  );
}

export function listMyOffers(
  page: number,
  size: number,
): Promise<PaginatedResponse<OfferResponse>> {
  const query = buildPageQuery({ page, size });
  return apiRequest<PaginatedResponse<OfferResponse>>(
    `/api/offers/me?${query}`,
  );
}

export function acceptOffer(id: string): Promise<OfferResponse> {
  return apiRequest<OfferResponse>(`/api/offers/${id}/accept`, {
    method: 'POST',
  });
}

export function declineOffer(id: string): Promise<OfferResponse> {
  return apiRequest<OfferResponse>(`/api/offers/${id}/decline`, {
    method: 'POST',
  });
}
