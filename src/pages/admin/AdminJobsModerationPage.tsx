import React, { useCallback, useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Ban, Briefcase, Loader2, Users } from 'lucide-react';
import { PaginatedList } from '../../components/PaginatedList';
import { ExportCsvButton } from '../../components/ExportCsvButton';
import { exportCsv, forceCloseJob, listJobs } from '../../services/adminService';
import { ApiError } from '../../lib/api';
import type { JobModerationResponse } from '../../types/admin';

export function AdminJobsModerationPage() {
  const [searchParams] = useSearchParams();
  const [refreshKey, setRefreshKey] = useState(0);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFilterChange = useCallback((filter: string) => {
    if (filter === 'all') {
      setStatusFilter('');
    } else {
      setStatusFilter(filter.toUpperCase());
    }
    setRefreshKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const filter = searchParams.get('filter');
    if (filter) {
      handleFilterChange(filter);
    }
  }, [searchParams, handleFilterChange]);

  const fetchPage = useCallback(
    (page: number, size: number) => listJobs(page, size, statusFilter || undefined),
    [statusFilter],
  );

  const handleClose = async (job: JobModerationResponse) => {
    setActionInProgress(job.id);
    setError(null);
    setSuccess(null);
    try {
      await forceCloseJob(job.id);
      setSuccess(`Job "${job.title}" force-closed.`);
      setRefreshKey((k) => k + 1);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'Unable to close that job. Please try again.',
      );
      setTimeout(() => setError(null), 5000);
    } finally {
      setActionInProgress(null);
    }
  };


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Jobs moderation</h1>
          <p className="text-slate-500 mt-1">
            View and manage job listings across the platform.
          </p>
        </div>
        <ExportCsvButton onExport={() => exportCsv('jobs')} />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => handleFilterChange('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            !statusFilter
              ? 'bg-primary text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}>
          All Jobs
        </button>
        <button
          type="button"
          onClick={() => handleFilterChange('active')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            statusFilter === 'ACTIVE'
              ? 'bg-success text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}>
          Active
        </button>
        <button
          type="button"
          onClick={() => handleFilterChange('closed')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            statusFilter === 'CLOSED'
              ? 'bg-danger text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}>
          Closed
        </button>
      </div>

      {error && (
        <div className="bg-danger/10 border border-danger/20 text-danger px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-success/10 border border-success/20 text-success px-4 py-3 rounded-xl text-sm">
          {success}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-soft border border-slate-200 overflow-hidden">
        <PaginatedList
          refreshKey={refreshKey}
          fetchPage={fetchPage}
          emptyMessage={!statusFilter ? 'No jobs found.' : `No ${statusFilter.toLowerCase()} jobs found.`}
          listClassName="divide-y divide-slate-200"
          renderItem={(job) => (
            <div className="px-6 py-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Briefcase size={18} className="text-slate-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">{job.title}</p>
                  <p className="text-sm text-slate-500">
                    {job.companyName} • {job.locationState}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <StatusBadge status={job.status} />
                <span className="text-slate-500">
                  {new Date(job.createdAt).toLocaleDateString()}
                </span>
                <Link
                  to={`/admin/jobs/${job.id}/applications`}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-xs font-bold transition-colors">
                  <Users size={16} />
                  View Applications
                </Link>
                {job.status === 'ACTIVE' && (
                  <button
                    type="button"
                    onClick={() => void handleClose(job)}
                    disabled={actionInProgress === job.id}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-danger/10 text-danger hover:bg-danger/20 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {actionInProgress === job.id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Ban size={16} />
                    )}
                    {actionInProgress === job.id ? 'Closing...' : 'Force Close'}
                  </button>
                )}
              </div>
            </div>
          )}
          getItemKey={(job) => job.id}
        />
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'ACTIVE') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-success/10 text-success">
        Active
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
      Closed
    </span>
  );
}
