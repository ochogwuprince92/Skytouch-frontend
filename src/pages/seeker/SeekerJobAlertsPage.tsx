import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Bell, Loader2, Plus, Trash2 } from 'lucide-react';
import { FormAlert } from '../../components/FormAlert';
import { PaginatedList } from '../../components/PaginatedList';
import { StateSelect } from '../../components/StateSelect';
import { ApiError } from '../../lib/api';
import { formatDate } from '../../lib/format';
import {
  createJobAlert,
  deleteJobAlert,
  listMyJobAlerts,
  updateJobAlert,
} from '../../services/jobAlertService';
import type { EmploymentType, WorkMode } from '../../types/job';
import type { JobAlertResponse } from '../../types/jobAlert';

export function SeekerJobAlertsPage() {
  const [searchParams] = useSearchParams();
  const [refreshKey, setRefreshKey] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [keyword, setKeyword] = useState('');
  const [employmentType, setEmploymentType] = useState<EmploymentType | ''>('');
  const [workMode, setWorkMode] = useState<WorkMode | ''>('');
  const [locationState, setLocationState] = useState('');
  const [industry, setIndustry] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (searchParams.get('create') !== '1') return;
    setShowForm(true);
    const prefillKeyword = searchParams.get('keyword');
    const prefillIndustry = searchParams.get('industry');
    if (prefillKeyword) {
      setKeyword(prefillKeyword);
      setName(`${prefillKeyword} roles`);
    }
    if (prefillIndustry) setIndustry(prefillIndustry);
  }, [searchParams]);

  const fetchPage = useCallback(
    (page: number, size: number) => listMyJobAlerts(page, size),
    [],
  );

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await createJobAlert({
        name: name.trim() || undefined,
        keyword: keyword.trim() || undefined,
        employmentType: employmentType || undefined,
        workMode: workMode || undefined,
        locationState: locationState || undefined,
        industry: industry.trim() || undefined,
      });
      setShowForm(false);
      setName('');
      setKeyword('');
      setEmploymentType('');
      setWorkMode('');
      setLocationState('');
      setIndustry('');
      setRefreshKey((k) => k + 1);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Unable to create alert.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggle = async (alert: JobAlertResponse) => {
    await updateJobAlert(alert.id, { active: !alert.active });
    setRefreshKey((k) => k + 1);
  };

  const handleDelete = async (id: string) => {
    await deleteJobAlert(id);
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Bell size={24} /> Job alerts
          </h1>
          <p className="text-slate-600 mt-1">
            Get notified when new jobs match your criteria.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold">
          <Plus size={16} /> New alert
        </button>
      </div>

      {error && <FormAlert message={error} />}

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Alert name (optional)"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
          />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Keyword (e.g. backend)"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <select
              value={employmentType}
              onChange={(e) =>
                setEmploymentType(e.target.value as EmploymentType | '')
              }
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm">
              <option value="">Any employment type</option>
              <option value="FULL_TIME">Full-time</option>
              <option value="PART_TIME">Part-time</option>
              <option value="CONTRACT">Contract</option>
              <option value="INTERNSHIP">Internship</option>
            </select>
            <select
              value={workMode}
              onChange={(e) => setWorkMode(e.target.value as WorkMode | '')}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm">
              <option value="">Any work mode</option>
              <option value="REMOTE">Remote</option>
              <option value="HYBRID">Hybrid</option>
              <option value="ONSITE">Onsite</option>
            </select>
          </div>
          <StateSelect value={locationState} onChange={setLocationState} />
          <input
            type="text"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder="Industry (optional)"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold disabled:opacity-60">
            {isSubmitting ? 'Creating…' : 'Create alert'}
          </button>
        </form>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <PaginatedList
          refreshKey={refreshKey}
          fetchPage={fetchPage}
          emptyMessage="No job alerts yet."
          listClassName="divide-y divide-slate-100"
          renderItem={(alert: JobAlertResponse) => (
            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="font-bold text-slate-900">
                  {alert.name ?? alert.keyword ?? 'Untitled alert'}
                </p>
                <p className="text-sm text-slate-500 mt-0.5">
                  {[alert.keyword, alert.workMode, alert.locationState, alert.industry]
                    .filter(Boolean)
                    .join(' · ') || 'No filters'}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Created {formatDate(alert.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={alert.active}
                    onChange={() => void handleToggle(alert)}
                    className="rounded border-slate-300 text-primary"
                  />
                  Active
                </label>
                <button
                  type="button"
                  onClick={() => void handleDelete(alert.id)}
                  className="p-2 text-danger hover:bg-danger/10 rounded-lg">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )}
          getItemKey={(a) => a.id}
        />
      </div>
    </div>
  );
}
