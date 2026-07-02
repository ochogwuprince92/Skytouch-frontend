import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { FormAlert } from '../../components/FormAlert';
import { ExportCsvButton } from '../../components/ExportCsvButton';
import { ApiError } from '../../lib/api';
import {
  exportEmployerApplications,
  getEmployerAnalytics,
} from '../../services/analyticsService';
import type { EmployerAnalytics } from '../../types/analytics';

export function EmployerAnalyticsPage() {
  const [analytics, setAnalytics] = useState<EmployerAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void getEmployerAnalytics()
      .then((data) => {
        if (!cancelled) setAnalytics(data);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err instanceof ApiError ? err.message : 'Failed to load analytics.',
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

  if (error || !analytics) {
    return <FormAlert message={error ?? 'Analytics unavailable.'} />;
  }

  const funnelData = [
    { stage: 'Submitted', count: analytics.funnel.submitted },
    { stage: 'Reviewing', count: analytics.funnel.reviewing },
    { stage: 'Shortlisted', count: analytics.funnel.shortlisted },
    { stage: 'Interview', count: analytics.funnel.interviewScheduled },
    { stage: 'Offer', count: analytics.funnel.offerExtended },
    { stage: 'Hired', count: analytics.funnel.hired },
    { stage: 'Rejected', count: analytics.funnel.rejected },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Hiring analytics</h1>
          <p className="text-slate-600 mt-1">
            Funnel performance across all your job postings.
          </p>
        </div>
        <ExportCsvButton
          label="Export all applications"
          onExport={exportEmployerApplications}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-sm text-slate-500">Hire rate</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">
            {analytics.hireRatePercent.toFixed(1)}%
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <p className="text-sm text-slate-500">Shortlist → hire rate</p>
          <p className="text-3xl font-bold text-slate-900 mt-1">
            {analytics.shortlistToHireRatePercent.toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h2 className="font-bold text-slate-900 mb-4">Application funnel</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={funnelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="stage" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {analytics.topJobsByApplicants.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="font-bold text-slate-900 mb-4">Top jobs by applicants</h2>
          <ul className="divide-y divide-slate-100">
            {analytics.topJobsByApplicants.map((j) => (
              <li
                key={j.jobId}
                className="py-3 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-900">{j.jobTitle}</span>
                <span className="text-slate-500">
                  {j.applicantCount} applicants · {j.hiredCount} hired
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
