export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface PaginationParams {
  page?: number;
  size?: number;
}

export function buildPageQuery({
  page = 0,
  size = 20,
  extra = {},
}: PaginationParams & { extra?: Record<string, string | number | boolean | undefined> }): string {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
  });

  Object.entries(extra).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      params.set(key, String(value));
    }
  });

  return params.toString();
}
