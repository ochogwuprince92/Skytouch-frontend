import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Building2,
  FileText,
  Loader2,
  UserCheck,
  Users,
} from 'lucide-react';
import { FormAlert } from '../../components/FormAlert';
import { ApiError } from '../../lib/api';
import { getMyEmployerDashboard } from '../../services/employerService';
import { getMyCompany } from '../../services/companyService';
import type { EmployerDashboard } from '../../types/employer';
import type { CompanyResponse } from '../../types/company';

export function EmployerDashboardPage() {
  const [dashboard, setDashboard] = useState<EmployerDashboard | null>(null);
  const [company, setCompany] = useState<CompanyResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [dash, co] = await Promise.all([
          getMyEmployerDashboard(),
          getMyCompany().catch(() => null),
        ]);
        if (!cancelled) {
          setDashboard(dash);
          setCompany(co);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError ? err.message : 'Failed to load dashboard.',
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !dashboard) {
    return <FormAlert message={error ?? 'Dashboard unavailable.'} />;
  }

  const stats = [
    {
      label: 'Active jobs',
      value: dashboard.stats.activeJobsCount,
      icon: Briefcase,
      href: '/employer/jobs',
    },
    {
      label: 'Draft jobs',
      value: dashboard.stats.draftJobsCount,
      icon: FileText,
      href: '/employer/jobs',
    },
    {
      label: 'Total applicants',
      value: dashboard.stats.totalApplicantsCount,
      icon: Users,
      href: '/employer/ats',
    },
    {
      label: 'Open offers',
      value: dashboard.stats.openOffersCount,
      icon: UserCheck,
      href: '/employer/ats',
    },
    {
      label: 'Hires',
      value: dashboard.stats.hiresCount,
      icon: UserCheck,
      href: '/employer/analytics',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Hello, {dashboard.displayName}
        </h1>
        <p className="text-slate-600 mt-1 flex items-center gap-2">
          <Building2 size={16} />
          {dashboard.companyName ?? 'No company linked'}
        </p>
      </div>

      {!company && (
        <div className="rounded-xl bg-primary-50 border border-primary-100 px-4 py-3 text-sm text-primary-900 flex items-center justify-between">
          <span>No company linked. Create a company to start posting jobs.</span>
          <Link
            to="/employer/onboarding"
            className="px-3 py-1.5 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary-600">
            Create company
          </Link>
        </div>
      )}
      {company?.status === 'PENDING' && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-900">
          Your company is awaiting admin approval. You cannot publish jobs until
          approved.
        </div>
      )}
      {company?.status === 'REJECTED' && (
        <div className="rounded-xl bg-danger/10 border border-danger/20 px-4 py-3 text-sm text-danger">
          Your company was rejected. Contact support for assistance.
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-slate-900">Profile completeness</p>
          <span className="text-sm font-bold text-primary">
            {dashboard.profileCompleteness.percentComplete}%
          </span>
        </div>
        <ul className="space-y-2">
          {dashboard.profileCompleteness.steps.map((step) => (
            <li
              key={step.key}
              className="flex items-center justify-between text-sm">
              <span className="text-slate-600">{step.label}</span>
              <span
                className={
                  step.complete ? 'text-success font-semibold' : 'text-slate-400'
                }>
                {step.complete ? 'Done' : 'Incomplete'}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.href}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <s.icon size={20} className="text-primary" />
              <span className="text-sm text-slate-500">{s.label}</span>
            </div>
            <p className="text-2xl font-bold text-slate-900">{s.value}</p>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          to="/employer/jobs"
          className="px-5 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-600">
          Manage jobs
        </Link>
        <Link
          to="/employer/ats"
          className="px-5 py-2.5 border border-slate-200 rounded-xl font-semibold text-sm hover:bg-slate-50">
          View applicants
        </Link>
      </div>
    </div>
  );
}
