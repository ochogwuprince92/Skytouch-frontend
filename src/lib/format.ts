import type { EmploymentType, WorkMode } from '../types/job';

const COMPANY_COLORS = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-emerald-500',
  'bg-orange-500',
  'bg-teal-500',
  'bg-indigo-500',
  'bg-rose-500',
  'bg-cyan-500',
];

export function companyColor(name: string): string {
  let hash = 0;
  for (const char of name) {
    hash = char.charCodeAt(0) + ((hash << 5) - hash);
  }
  return COMPANY_COLORS[Math.abs(hash) % COMPANY_COLORS.length];
}

export function companyInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

export function formatSalary(
  min?: number | null,
  max?: number | null,
  currency: string | null = 'NGN',
): string {
  if (min == null && max == null) return 'Salary not disclosed';
  let formatter: Intl.NumberFormat;
  try {
    formatter = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency || 'NGN',
      maximumFractionDigits: 0,
    });
  } catch {
    formatter = new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 });
  }
  if (min != null && max != null) {
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  }
  if (min != null) return `From ${formatter.format(min)}`;
  return `Up to ${formatter.format(max!)}`;
}

export function formatLocation(
  state?: string | null,
  lga?: string | null,
): string {
  const parts = [lga, state].filter(Boolean);
  return parts.length ? parts.join(', ') : 'Location not specified';
}

const WORK_MODE_LABELS: Record<WorkMode, string> = {
  REMOTE: 'Remote',
  HYBRID: 'Hybrid',
  ONSITE: 'Onsite',
};

const EMPLOYMENT_TYPE_LABELS: Record<EmploymentType, string> = {
  FULL_TIME: 'Full-time',
  PART_TIME: 'Part-time',
  CONTRACT: 'Contract',
  INTERNSHIP: 'Internship',
};

export function formatWorkType(value: WorkMode): string {
  return WORK_MODE_LABELS[value] ?? value;
}

export function formatEmploymentType(value: EmploymentType): string {
  return EMPLOYMENT_TYPE_LABELS[value] ?? value;
}

export function formatRoleLabel(role: string): string {
  switch (role) {
    case 'JOB_SEEKER':
      return 'Job Seeker';
    case 'EMPLOYER':
      return 'Employer';
    case 'ADMIN':
      return 'Admin';
    default:
      return role;
  }
}

export function formatDate(value?: string): string {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatRelativeTime(value?: string): string {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(value);
}

export function fullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`.trim();
}
