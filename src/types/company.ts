export type CompanyStatus = 'PENDING' | 'ACTIVE' | 'REJECTED';

/**
 * Company as defined by the backend contract (employer + admin flows).
 * `POST /api/companies`, `GET /api/companies/me`, `GET /api/admin/companies/pending`.
 */
export interface CompanyResponse {
  id: string;
  name: string;
  description?: string | null;
  industry?: string | null;
  website?: string | null;
  logoUrl?: string | null;
  addressLine?: string | null;
  addressLga?: string | null;
  addressState?: string | null;
  status: CompanyStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CompanyRequest {
  name: string;
  description?: string;
  industry?: string;
  website?: string;
  address?: string;
}

/**
 * NOTE: Public company browse (`/companies` listing + detail) is NOT part of the
 * documented backend contract. The types below back the marketing pages and may
 * not resolve against the live API.
 */
export interface CompanySummary {
  id: string;
  name: string;
  industry?: string;
  location?: string;
  size?: string;
  logoUrl?: string;
  coverUrl?: string;
  description?: string;
  openJobsCount?: number;
  rating?: number;
  website?: string;
  founded?: string;
}

export interface CompanyDetail extends CompanySummary {
  specialties?: string[];
  followersCount?: number;
}
