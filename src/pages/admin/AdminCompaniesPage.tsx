import React, { useCallback, useState } from 'react';
import { ShieldOff, UserCheck, Search, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { PaginatedList } from '../../components/PaginatedList';
import { ExportCsvButton } from '../../components/ExportCsvButton';
import { listCompanies, suspendCompany, activateCompany, exportCsv } from '../../services/adminService';
import { ApiError } from '../../lib/api';
import { formatDate } from '../../lib/format';
import type { CompanyModerationResponse } from '../../types/admin';

export function AdminCompaniesPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [statusFilter, setStatusFilter] = useState('');
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchPage = useCallback(
    (page: number, size: number) => listCompanies(page, size, statusFilter || undefined),
    [statusFilter],
  );

  const handleSuspend = async (company: CompanyModerationResponse) => {
    setActionInProgress(company.id);
    setError(null);
    setSuccess(null);
    try {
      await suspendCompany(company.id);
      setSuccess(`Company ${company.name} suspended successfully.`);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'Unable to suspend that company. Please try again.',
      );
    } finally {
      setActionInProgress(null);
    }
  };

  const handleActivate = async (company: CompanyModerationResponse) => {
    setActionInProgress(company.id);
    setError(null);
    setSuccess(null);
    try {
      await activateCompany(company.id);
      setSuccess(`Company ${company.name} activated successfully.`);
      setRefreshKey((k) => k + 1);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'Unable to activate that company. Please try again.',
      );
    } finally {
      setActionInProgress(null);
    }
  };

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Company management
          </h1>
          <p className="text-slate-500 mt-1">
            View, suspend, and activate companies on the platform.
          </p>
        </div>
        <ExportCsvButton onExport={() => exportCsv('companies')} />
      </div>

      <form onSubmit={handleFilter} className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm appearance-none bg-white">
            <option value="">All statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="PENDING">Pending</option>
            <option value="SUSPENDED">Suspended</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-600 transition-colors">
          Filter
        </button>
      </form>

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
          refreshKey={`${refreshKey}-${statusFilter}`}
          fetchPage={fetchPage}
          emptyMessage="No companies found."
          listClassName="divide-y divide-slate-200"
          renderItem={(company) => (
            <div className="px-6 py-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center font-bold text-primary">
                    {company.name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{company.name}</p>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-0.5">
                      {company.industry && (
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                          {company.industry}
                        </span>
                      )}
                      <StatusBadge status={company.status} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">
                  {formatDate(company.createdAt)}
                </span>
                {company.status === 'ACTIVE' && (
                  <button
                    type="button"
                    onClick={() => void handleSuspend(company)}
                    disabled={actionInProgress === company.id}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-danger/10 text-danger hover:bg-danger/20 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {actionInProgress === company.id ? (
                      <ShieldOff size={16} className="animate-spin" />
                    ) : (
                      <ShieldOff size={16} />
                    )}
                    {actionInProgress === company.id ? 'Suspending...' : 'Suspend'}
                  </button>
                )}
                {company.status === 'SUSPENDED' && (
                  <button
                    type="button"
                    onClick={() => void handleActivate(company)}
                    disabled={actionInProgress === company.id}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-success/10 text-success hover:bg-success/20 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {actionInProgress === company.id ? (
                      <UserCheck size={16} className="animate-spin" />
                    ) : (
                      <UserCheck size={16} />
                    )}
                    {actionInProgress === company.id ? 'Activating...' : 'Activate'}
                  </button>
                )}
              </div>
            </div>
          )}
          getItemKey={(company) => company.id}
        />
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'ACTIVE') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold bg-success/10 text-success">
        <CheckCircle size={12} /> Active
      </span>
    );
  }
  if (status === 'PENDING') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold bg-warning/10 text-warning">
        <AlertCircle size={12} /> Pending
      </span>
    );
  }
  if (status === 'SUSPENDED') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold bg-danger/10 text-danger">
        <ShieldOff size={12} /> Suspended
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
      <XCircle size={12} /> Rejected
    </span>
  );
}
