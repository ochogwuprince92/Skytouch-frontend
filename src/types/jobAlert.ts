import type { EmploymentType, WorkMode } from './job';

export interface JobAlertResponse {
  id: string;
  name?: string | null;
  keyword?: string | null;
  employmentType?: EmploymentType | null;
  workMode?: WorkMode | null;
  locationState?: string | null;
  industry?: string | null;
  active: boolean;
  createdAt: string;
}

export interface JobAlertRequest {
  name?: string;
  keyword?: string;
  employmentType?: EmploymentType;
  workMode?: WorkMode;
  locationState?: string;
  industry?: string;
  active?: boolean;
}
