import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Bookmark,
  Bell,
  Calendar,
  FileText,
  Loader2,
  User,
} from 'lucide-react';
import { FormAlert } from '../../components/FormAlert';
import { ApiError } from '../../lib/api';
import { getMyDashboard } from '../../services/seekerService';
import type { SeekerDashboard } from '../../types/seeker';

export function SeekerDashboardPage() {
  const [dashboard, setDashboard] = useState<SeekerDashboard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void getMyDashboard()
      .then((data) => {
        if (!cancelled) setDashboard(data);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err instanceof ApiError ? err.message : 'Failed to load dashboard.',
          );
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
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
      label: 'Applications',
      value: dashboard.stats.applicationsCount,
      icon: FileText,
      href: '/seeker/applications',
    },
    {
      label: 'Saved jobs',
      value: dashboard.stats.savedJobsCount,
      icon: Bookmark,
      href: '/seeker/saved',
    },
    {
      label: 'Interviews',
      value: dashboard.stats.interviewsCount,
      icon: Calendar,
      href: '/seeker/applications',
    },
    {
      label: 'Pending offers',
      value: dashboard.stats.pendingOffersCount,
      icon: Briefcase,
      href: '/seeker/applications',
    },
    {
      label: 'Job alerts',
      value: dashboard.stats.jobAlertsCount,
      icon: Bell,
      href: '/seeker/alerts',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome back, {dashboard.displayName}
        </h1>
        <p className="text-slate-600 mt-1">
          {dashboard.openToWork
            ? "You're open to work — employers can find you."
            : 'Update your profile to improve visibility.'}
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold text-slate-900">Profile completeness</p>
          <span className="text-sm font-bold text-primary">
            {dashboard.profileCompleteness.percentComplete}%
          </span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{
              width: `${dashboard.profileCompleteness.percentComplete}%`,
            }}
          />
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
          to="/seeker/profile"
          className="px-5 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-600 flex items-center gap-2">
          <User size={16} /> {dashboard.profileCompleteness.percentComplete < 100 ? 'Complete profile' : 'Edit profile'}
        </Link>
        <Link
          to="/seeker/jobs"
          className="px-5 py-2.5 border border-slate-200 rounded-xl font-semibold text-sm text-slate-700 hover:bg-slate-50">
          Browse jobs
        </Link>
      </div>
    </div>
  );
}
