export type EmploymentType =
  | 'FULL_TIME'
  | 'PART_TIME'
  | 'CONTRACT'
  | 'INTERNSHIP';

export type WorkMode = 'ONSITE' | 'REMOTE' | 'HYBRID';

export type JobStatus = 'DRAFT' | 'ACTIVE' | 'CLOSED';

export interface JobResponse {
  id: string;
  companyId: string;
  companyName: string;
  title: string;
  description: string;
  requirements?: string | null;
  employmentType: EmploymentType;
  workMode: WorkMode;
  salaryMin?: number | null;
  salaryMax?: number | null;
  salaryCurrency?: string | null;
  locationState?: string | null;
  locationLga?: string | null;
  status: JobStatus;
  publishedAt?: string | null;
  closedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  saved?: boolean;
}

export type JobSummary = JobResponse;
export type JobDetail = JobResponse;

export interface JobSearchFilters {
  keyword?: string;
  employmentType?: EmploymentType;
  workMode?: WorkMode;
  state?: string;
  industry?: string;
}

export interface CreateJobRequest {
  title: string;
  description: string;
  requirements?: string;
  employmentType: EmploymentType;
  workMode: WorkMode;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  locationState?: string;
  locationLga?: string;
}

export type UpdateJobRequest = Partial<CreateJobRequest>;
