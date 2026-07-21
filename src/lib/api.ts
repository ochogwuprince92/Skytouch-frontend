import type { ApiErrorBody } from '../types/auth';

export const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:8083';

export class ApiError extends Error {
  status: number;
  error: string;
  timestamp?: string;

  constructor(body: ApiErrorBody) {
    super(body.message);
    this.name = 'ApiError';
    this.status = body.status;
    this.error = body.error;
    this.timestamp = body.timestamp;
  }
}

type RequestOptions = RequestInit & {
  skipAuth?: boolean;
  skipAuthRedirect?: boolean;
};

let unauthorizedHandler: (() => void) | null = null;

export function setUnauthorizedHandler(handler: (() => void) | null) {
  unauthorizedHandler = handler;
}

export function getStoredToken(): string | null {
  return sessionStorage.getItem('skytouch_access_token');
}

async function parseError(response: Response): Promise<ApiError> {
  try {
    const body = (await response.json()) as ApiErrorBody;
    // Sanitize backend error messages to avoid exposing technical details
    let message = body.message ?? 'Something went wrong';
    
    // Replace technical database constraint errors with user-friendly messages
    if (message.includes('violates check constraint') || message.includes('constraint violation')) {
      message = 'Unable to complete this operation. Please try again later.';
    }
    
    // Remove UUIDs from error messages to avoid exposing technical identifiers
    message = message.replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, '[ID]');
    
    // Replace specific technical error patterns with user-friendly messages
    if (message.includes('Interview not found for application: [ID]')) {
      message = 'Interview not found for this application';
    }
    if (message.includes('Application not found: [ID]')) {
      message = 'Application not found';
    }
    if (message.includes('Job not found: [ID]')) {
      message = 'Job not found';
    }
    if (message.includes('Offer not found: [ID]')) {
      message = 'Offer not found';
    }
    if (message.includes('Resource not found: [ID]')) {
      message = 'Resource not found';
    }
    
    return new ApiError({
      status: body.status ?? response.status,
      error: body.error ?? response.statusText,
      message,
      timestamp: body.timestamp,
    });
  } catch {
    return new ApiError({
      status: response.status,
      error: response.statusText,
      message: 'Something went wrong. Please try again later.',
    });
  }
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { skipAuth, skipAuthRedirect, headers, ...rest } = options;
  const token = getStoredToken();

  const requestHeaders = new Headers(headers);
  if (!requestHeaders.has('Content-Type') && !(rest.body instanceof FormData)) {
    requestHeaders.set('Content-Type', 'application/json');
  }
  if (!skipAuth && token) {
    requestHeaders.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: requestHeaders,
  });

  if (response.status === 401 && !skipAuthRedirect) {
    unauthorizedHandler?.();
    throw await parseError(response);
  }

  if (!response.ok) {
    throw await parseError(response);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get('Content-Type') ?? '';
  if (contentType.includes('application/json')) {
    return (await response.json()) as T;
  }

  return (await response.text()) as T;
}
