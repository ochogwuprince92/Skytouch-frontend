import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Plus } from 'lucide-react';
import { FormAlert } from '../../components/FormAlert';
import { PaginatedList } from '../../components/PaginatedList';
import { LocationSelect } from '../../components/LocationSelect';
import { EnumSelect, JOB_ROLE_OPTIONS } from '../../components/EnumSelect';
import { ExportCsvButton } from '../../components/ExportCsvButton';
import { ApiError } from '../../lib/api';
import {
  formatEmploymentType,
  formatLocation,
  formatRelativeTime,
  formatWorkType,
} from '../../lib/format';
import { getMyCompany } from '../../services/companyService';
import {
  closeJob,
  createJob,
  listMyJobs,
  publishJob,
} from '../../services/jobService';
import { exportJobApplications } from '../../services/analyticsService';
import type { CompanyResponse } from '../../types/company';
import type { EmploymentType, JobSummary, WorkMode } from '../../types/job';

export function EmployerJobsPage() {
  const [company, setCompany] = useState<CompanyResponse | null>(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [showCreate, setShowCreate] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [employmentType, setEmploymentType] = useState<EmploymentType>('FULL_TIME');
  const [workMode, setWorkMode] = useState<WorkMode>('REMOTE');
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [locationState, setLocationState] = useState('');
  const [locationLga, setLocationLga] = useState('');

  useEffect(() => {
    void getMyCompany()
      .then(setCompany)
      .catch(() => setCompany(null));
  }, []);

  const fetchPage = useCallback(
    (page: number, size: number) => listMyJobs(page, size),
    [],
  );

  const filteredFetch = useCallback(
    async (page: number, size: number) => {
      const result = await fetchPage(page, size);
      if (!statusFilter) return result;
      return {
        ...result,
        content: result.content.filter(
          (j) => j.status === statusFilter.toUpperCase(),
        ),
      };
    },
    [fetchPage, statusFilter],
  );

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await createJob({
        title: title.trim(),
        description: description.trim(),
        requirements: requirements.trim() || undefined,
        employmentType,
        workMode,
        salaryMin: salaryMin ? Number(salaryMin) : undefined,
        salaryMax: salaryMax ? Number(salaryMax) : undefined,
        salaryCurrency: 'NGN',
        locationState: locationState || undefined,
        locationLga: locationLga.trim() || undefined,
      });
      setShowCreate(false);
      setTitle('');
      setDescription('');
      setRequirements('');
      setRefreshKey((k) => k + 1);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Unable to create job.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublish = async (job: JobSummary) => {
    setActionId(job.id);
    setError(null);
    try {
      await publishJob(job.id);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      setError('Unable to publish job. Please try again later.');
    } finally {
      setActionId(null);
    }
  };

  const handleClose = async (job: JobSummary) => {
    setActionId(job.id);
    setError(null);
    try {
      await closeJob(job.id);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      setError('Unable to close job. Please try again later.');
    } finally {
      setActionId(null);
    }
  };

  const canPublish = company?.status === 'ACTIVE';

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My jobs</h1>
          <p className="text-slate-600 mt-1">Create, publish, and manage postings.</p>
        </div>
        <button
          type="button"
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold">
          <Plus size={16} /> Post a job
        </button>
      </div>

      {company?.status === 'PENDING' && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-900">
          Company pending approval — jobs can be drafted but not published yet.{' '}
          <Link to="/employer/company" className="font-semibold underline">
            View company
          </Link>
        </div>
      )}

      {error && <FormAlert message={error} />}

      {showCreate && (
        <form
          onSubmit={handleCreate}
          className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <EnumSelect
            value={title}
            onChange={setTitle}
            options={JOB_ROLE_OPTIONS}
            placeholder="Job title"
            className="w-full"
          />
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={4}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm resize-none"
          />
          <textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="Requirements (optional)"
            rows={2}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm resize-none"
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <select
              value={employmentType}
              onChange={(e) =>
                setEmploymentType(e.target.value as EmploymentType)
              }
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm">
              <option value="FULL_TIME">Full-time</option>
              <option value="PART_TIME">Part-time</option>
              <option value="CONTRACT">Contract</option>
              <option value="INTERNSHIP">Internship</option>
            </select>
            <select
              value={workMode}
              onChange={(e) => setWorkMode(e.target.value as WorkMode)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm">
              <option value="REMOTE">Remote</option>
              <option value="HYBRID">Hybrid</option>
              <option value="ONSITE">Onsite</option>
            </select>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="number"
              value={salaryMin}
              onChange={(e) => setSalaryMin(e.target.value)}
              placeholder="Min salary (NGN)"
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
            />
            <input
              type="number"
              value={salaryMax}
              onChange={(e) => setSalaryMax(e.target.value)}
              placeholder="Max salary (NGN)"
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
            />
          </div>
          <LocationSelect
            stateValue={locationState}
            onStateChange={setLocationState}
          />
          <input
            value={locationLga}
            onChange={(e) => setLocationLga(e.target.value)}
            placeholder="LGA (optional)"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold disabled:opacity-60">
            {isSubmitting ? 'Creating…' : 'Create draft'}
          </button>
        </form>
      )}

      <div className="flex gap-2">
        {['', 'DRAFT', 'ACTIVE', 'CLOSED'].map((s) => (
          <button
            key={s || 'all'}
            type="button"
            onClick={() => {
              setStatusFilter(s);
              setRefreshKey((k) => k + 1);
            }}
            className={`px-4 py-2 rounded-xl text-sm font-semibold ${
              statusFilter === s
                ? 'bg-primary text-white'
                : 'bg-white border border-slate-200 text-slate-600'
            }`}>
            {s || 'All'}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <PaginatedList
          refreshKey={`${refreshKey}-${statusFilter}`}
          fetchPage={filteredFetch}
          emptyMessage="No jobs yet. Create your first posting above."
          listClassName="divide-y divide-slate-100"
          renderItem={(job: JobSummary) => (
            <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <p className="font-bold text-slate-900">{job.title}</p>
                <p className="text-sm text-slate-500 mt-0.5">
                  {formatLocation(job.locationState, job.locationLga)} ·{' '}
                  {formatEmploymentType(job.employmentType)} ·{' '}
                  {formatWorkType(job.workMode)}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {formatRelativeTime(job.createdAt)} ·{' '}
                  <span className="font-semibold">{job.status}</span>
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {job.status === 'DRAFT' && (
                  <button
                    type="button"
                    disabled={!canPublish || actionId === job.id}
                    onClick={() => void handlePublish(job)}
                    className="px-3 py-1.5 bg-success text-white rounded-lg text-xs font-bold disabled:opacity-50"
                    title={
                      canPublish ? 'Publish' : 'Company must be approved first'
                    }>
                    Publish
                  </button>
                )}
                {job.status === 'ACTIVE' && (
                  <button
                    type="button"
                    disabled={actionId === job.id}
                    onClick={() => void handleClose(job)}
                    className="px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg text-xs font-bold">
                    Close
                  </button>
                )}
                <Link
                  to="/employer/ats"
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50">
                  Applicants
                </Link>
                <ExportCsvButton
                  label="CSV"
                  onExport={() => exportJobApplications(job.id)}
                />
              </div>
            </div>
          )}
          getItemKey={(job) => job.id}
        />
      </div>
    </div>
  );
}
