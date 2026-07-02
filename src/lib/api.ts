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
    return new ApiError({
      status: body.status ?? response.status,
      error: body.error ?? response.statusText,
      message: body.message ?? 'Something went wrong',
      timestamp: body.timestamp,
    });
  } catch {
    return new ApiError({
      status: response.status,
      error: response.statusText,
      message: response.statusText || 'Something went wrong',
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
