import { API_BASE_URL, ApiError, getStoredToken } from './api';

function parseFilename(contentDisposition: string | null): string {
  if (!contentDisposition) return 'download.csv';

  const match = contentDisposition.match(/filename\*?=(?:UTF-8''|")?([^";]+)/i);
  if (match?.[1]) {
    return decodeURIComponent(match[1].replace(/"/g, ''));
  }

  return 'download.csv';
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export async function downloadCsvFromApi(path: string): Promise<void> {
  const token = getStoredToken();
  const headers = new Headers();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, { headers });

  if (!response.ok) {
    let message = 'Failed to download file';
    try {
      const body = await response.json();
      message = body.message ?? message;
    } catch {
      message = response.statusText || message;
    }
    throw new ApiError({
      status: response.status,
      error: response.statusText,
      message,
    });
  }

  const blob = await response.blob();
  const filename = parseFilename(response.headers.get('Content-Disposition'));
  downloadBlob(blob, filename);
}
