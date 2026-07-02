import { apiRequest } from '../lib/api';
import { buildPageQuery } from '../types/api';
import type { PaginatedResponse } from '../types/api';
import type {
  NotificationResponse,
  UnreadCountResponse,
} from '../types/notification';

export function listMyNotifications(
  page: number,
  size: number,
): Promise<PaginatedResponse<NotificationResponse>> {
  const query = buildPageQuery({ page, size });
  return apiRequest<PaginatedResponse<NotificationResponse>>(
    `/api/notifications/me?${query}`,
  );
}

export function getUnreadCount(): Promise<UnreadCountResponse> {
  return apiRequest<UnreadCountResponse>('/api/notifications/me/unread-count');
}

export function markNotificationRead(id: string): Promise<void> {
  return apiRequest<void>(`/api/notifications/me/${id}/read`, {
    method: 'PATCH',
  });
}

export function markAllNotificationsRead(): Promise<void> {
  return apiRequest<void>('/api/notifications/me/read-all', {
    method: 'POST',
  });
}
