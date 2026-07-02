import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Building2,
  Briefcase,
  FileText,
  UserCheck,
  AlertCircle,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import { FormAlert } from '../../components/FormAlert';
import { ExportCsvButton } from '../../components/ExportCsvButton';
import { ApiError } from '../../lib/api';
import { getAdminDashboard, getPlatformAnalytics, exportCsv } from '../../services/adminService';
import type { AdminDashboard, PlatformAnalytics } from '../../types/admin';

export function AdminDashboardPage() {
  const [dashboard, setDashboard] = useState<AdminDashboard | null>(null);
  const [analytics, setAnalytics] = useState<PlatformAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [data, platform] = await Promise.all([
          getAdminDashboard(),
          getPlatformAnalytics().catch(() => null),
        ]);
        if (!cancelled) {
          setDashboard(data);
          setAnalytics(platform);
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
        <Loader2 className="h-8 w-8 animate-spin text-danger" />
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="max-w-2xl mx-auto">
        <FormAlert message={error ?? 'Dashboard unavailable.'} />
      </div>
    );
  }

  const stats = [
    {
      label: 'Total users',
      value: dashboard.totalUsers.toLocaleString(),
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Job seekers',
      value: dashboard.jobSeekers.toLocaleString(),
      icon: Users,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
    },
    {
      label: 'Employers',
      value: dashboard.employers.toLocaleString(),
      icon: Building2,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      label: 'Active jobs',
      value: dashboard.activeJobs.toLocaleString(),
      icon: Briefcase,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Applications',
      value: dashboard.totalApplications.toLocaleString(),
      icon: FileText,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
    {
      label: 'Total hires',
      value: dashboard.totalHires.toLocaleString(),
      icon: UserCheck,
      color: 'text-teal-600',
      bg: 'bg-teal-50',
    },
  ];

  const pendingItems = [
    {
      label: 'Pending companies',
      count: dashboard.pendingCompanies,
      href: '/admin/employers',
    },
    {
      label: 'Pending email verifications',
      count: dashboard.pendingEmailVerifications,
      href: '/admin/users',
    },
    {
      label: 'Pending accounts',
      count: dashboard.pendingAccounts,
      href: '/admin/users',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Admin dashboard</h1>
          <p className="text-slate-500 mt-1">
            Platform overview and items needing attention.
          </p>
        </div>
        <ExportCsvButton
          label="Export applications"
          onExport={() => exportCsv('applications')}
        />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            </div>
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <AlertCircle size={20} className="text-warning" />
            Needs attention
          </h2>
          <ul className="space-y-3">
            {pendingItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                  <span className="text-sm font-medium text-slate-700">
                    {item.label}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-lg font-bold text-slate-900">
                      {item.count}
                    </span>
                    <ArrowRight
                      size={16}
                      className="text-slate-400 group-hover:text-danger"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">System</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Admins</dt>
              <dd className="font-semibold text-slate-900">{dashboard.admins}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Audit events</dt>
              <dd className="font-semibold text-slate-900">
                {dashboard.totalAuditEvents.toLocaleString()}
              </dd>
            </div>
          </dl>
          <Link
            to="/admin/audit"
            className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-danger hover:underline">
            View audit log <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {analytics && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            Platform analytics
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Hire rate
              </p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {analytics.platformHireRatePercent.toFixed(1)}%
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Funnel total
              </p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {analytics.applicationFunnel.total.toLocaleString()}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Hired
              </p>
              <p className="text-2xl font-bold text-emerald-600 mt-1">
                {analytics.applicationFunnel.hired.toLocaleString()}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Pending companies
              </p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {analytics.pendingCompanies.toLocaleString()}
              </p>
            </div>
          </div>
          <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            {(
              [
                ['Submitted', analytics.applicationFunnel.submitted],
                ['Reviewing', analytics.applicationFunnel.reviewing],
                ['Shortlisted', analytics.applicationFunnel.shortlisted],
                ['Interview scheduled', analytics.applicationFunnel.interviewScheduled],
                ['Offer extended', analytics.applicationFunnel.offerExtended],
                ['Offer declined', analytics.applicationFunnel.offerDeclined],
                ['Rejected', analytics.applicationFunnel.rejected],
                ['Withdrawn', analytics.applicationFunnel.withdrawn],
              ] as const
            ).map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between rounded-lg border border-slate-100 px-3 py-2">
                <dt className="text-slate-500">{label}</dt>
                <dd className="font-semibold text-slate-900">
                  {value.toLocaleString()}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
