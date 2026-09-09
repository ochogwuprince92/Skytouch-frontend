import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loader2, User } from 'lucide-react';
import {
  ApplicationStatusBadge,
  EMPLOYER_STATUS_OPTIONS,
} from '../../components/ApplicationStatusBadge';
import { FormAlert } from '../../components/FormAlert';
import { PaginatedList } from '../../components/PaginatedList';
import { ApiError } from '../../lib/api';
import { formatRelativeTime } from '../../lib/format';
import { listJobApplicants, searchJobs, updateApplicationStatus } from '../../services/jobService';
import type { ApplicationResponse, ApplicationStatus } from '../../types/application';
import type { JobSummary } from '../../types/job';

export function AdminATSPage() {
  const { id } = useParams();
  const [jobs, setJobs] = useState<JobSummary[]>([]);
  const [selectedJobId, setSelectedJobId] = useState('');
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function loadJobs() {
      setIsLoadingJobs(true);
      try {
        const result = await searchJobs(0, 50);
        if (!cancelled) {
          setJobs(result.content);
          if (result.content.length > 0) {
            setSelectedJobId((prev) => {
              if (id) return id;
              return prev || result.content[0].id;
            });
          }
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError ? err.message : 'Failed to load jobs.',
          );
        }
      } finally {
        if (!cancelled) setIsLoadingJobs(false);
      }
    }
    void loadJobs();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const fetchApplicants = useCallback(
    (page: number, size: number) => {
      if (!selectedJobId) {
        return Promise.resolve({
          content: [],
          page: 0,
          size,
          totalElements: 0,
          totalPages: 0,
        });
      }
      return listJobApplicants(selectedJobId, page, size);
    },
    [selectedJobId],
  );

  const handleStatusChange = async (
    application: ApplicationResponse,
    status: ApplicationStatus,
  ) => {
    if (!selectedJobId) return;
    setUpdatingId(application.id);
    setError(null);
    try {
      await updateApplicationStatus(selectedJobId, application.id, { status });
      setRefreshKey((k) => k + 1);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Unable to update status.',
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const selectedJob = jobs.find((j) => j.id === selectedJobId);

  if (isLoadingJobs) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            Job Applications
          </h1>
          <p className="text-slate-600">
            Review candidates and manage hiring pipeline across all jobs.
          </p>
        </div>
        {jobs.length > 0 && (
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={selectedJobId}
              onChange={(e) => {
                setSelectedJobId(e.target.value);
                setRefreshKey((k) => k + 1);
              }}
              className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-700 min-w-[220px]">
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title} ({job.status})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {error && <FormAlert message={error} />}

      {jobs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
          <p className="text-slate-600 mb-4">
            No jobs found on the platform.
          </p>
          <Link
            to="/admin/jobs"
            className="text-primary font-semibold hover:underline">
            Go to Jobs Moderation →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-100 bg-slate-50">
            <p className="text-sm font-semibold text-slate-700">
              {selectedJob?.title ?? 'Applicants'}
            </p>
          </div>
          <PaginatedList
            refreshKey={`${refreshKey}-${selectedJobId}`}
            fetchPage={fetchApplicants}
            emptyMessage="No applicants for this job yet."
            listClassName="divide-y divide-slate-100"
            renderItem={(app: ApplicationResponse) => (
              <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                    <User size={18} />
                  </div>
                  <div className="min-w-0">
                    <Link
                      to={`/admin/jobs/${selectedJobId}/applications/${app.id}`}
                      className="font-bold text-slate-900 hover:text-primary truncate block">
                      {app.seekerName}
                    </Link>
                    <p className="text-sm text-slate-500 truncate">
                      {app.seekerEmail}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Applied {formatRelativeTime(app.appliedAt)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <ApplicationStatusBadge status={app.status} />
                  <select
                    value={app.status}
                    disabled={updatingId === app.id}
                    onChange={(e) =>
                      void handleStatusChange(
                        app,
                        e.target.value as ApplicationStatus,
                      )
                    }
                    className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 disabled:opacity-60">
                    {EMPLOYER_STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s.replace(/_/g, ' ')}
                      </option>
                    ))}
                  </select>
                  <Link
                    to={`/admin/jobs/${selectedJobId}/applications/${app.id}`}
                    className="text-sm font-semibold text-primary hover:underline">
                    Open →
                  </Link>
                </div>
              </div>
            )}
            getItemKey={(app) => app.id}
          />
        </div>
      )}
    </div>
  );
}
