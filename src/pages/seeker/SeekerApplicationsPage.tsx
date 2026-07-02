import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Building2, Clock } from 'lucide-react';
import { ApplicationStatusBadge } from '../../components/ApplicationStatusBadge';
import { ExportCsvButton } from '../../components/ExportCsvButton';
import { PaginatedList } from '../../components/PaginatedList';
import { companyInitials, formatRelativeTime } from '../../lib/format';
import { exportMyApplications } from '../../services/analyticsService';
import { listMyApplications } from '../../services/seekerService';
import type { ApplicationResponse } from '../../types/application';

export function SeekerApplicationsPage() {
  const fetchPage = useCallback(
    (page: number, size: number) => listMyApplications(page, size),
    [],
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            My applications
          </h1>
          <p className="text-slate-600">
            Track status, messages, interviews, and offers for each application.
          </p>
        </div>
        <ExportCsvButton
          label="Export CSV"
          onExport={exportMyApplications}
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <PaginatedList
          fetchPage={fetchPage}
          emptyMessage="You haven't applied to any jobs yet."
          listClassName="divide-y divide-slate-100"
          renderItem={(app: ApplicationResponse) => (
            <Link
              to={`/seeker/applications/${app.id}`}
              className="block p-5 hover:bg-slate-50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600 shrink-0">
                    {companyInitials(app.companyName)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-900 truncate">
                      {app.jobTitle}
                    </p>
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                      <Building2 size={14} />
                      {app.companyName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <ApplicationStatusBadge status={app.status} />
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock size={12} />
                    {formatRelativeTime(app.appliedAt)}
                  </span>
                </div>
              </div>
            </Link>
          )}
          getItemKey={(app) => app.id}
        />
      </div>
    </div>
  );
}
