import type { ApplicationStatus } from '../types/application';

const STATUS_STYLES: Record<ApplicationStatus, string> = {
  SUBMITTED: 'bg-slate-100 text-slate-700',
  REVIEWING: 'bg-blue-100 text-blue-700',
  SHORTLISTED: 'bg-indigo-100 text-indigo-700',
  INTERVIEW_SCHEDULED: 'bg-purple-100 text-purple-700',
  OFFER_EXTENDED: 'bg-amber-100 text-amber-800',
  OFFER_DECLINED: 'bg-orange-100 text-orange-700',
  HIRED: 'bg-success/10 text-success',
  REJECTED: 'bg-danger/10 text-danger',
  WITHDRAWN: 'bg-slate-100 text-slate-500',
};

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  SUBMITTED: 'Submitted',
  REVIEWING: 'Reviewing',
  SHORTLISTED: 'Shortlisted',
  INTERVIEW_SCHEDULED: 'Interview scheduled',
  OFFER_EXTENDED: 'Offer extended',
  OFFER_DECLINED: 'Offer declined',
  HIRED: 'Hired',
  REJECTED: 'Rejected',
  WITHDRAWN: 'Withdrawn',
};

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
  className?: string;
}

export function ApplicationStatusBadge({
  status,
  className = '',
}: ApplicationStatusBadgeProps) {
  return (
    <span
      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${STATUS_STYLES[status]} ${className}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}

export const EMPLOYER_STATUS_OPTIONS: ApplicationStatus[] = [
  'SUBMITTED',
  'REVIEWING',
  'SHORTLISTED',
  'INTERVIEW_SCHEDULED',
  'OFFER_EXTENDED',
  'OFFER_DECLINED',
  'HIRED',
  'REJECTED',
];
