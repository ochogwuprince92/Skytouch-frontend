import React, { useCallback, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, AlertCircle, Building2, Loader2, ShieldOff, UserCheck, ChevronRight, X } from 'lucide-react';
import { PaginatedList } from '../../components/PaginatedList';
import { ExportCsvButton } from '../../components/ExportCsvButton';
import {
  approveCompany,
  exportCsv,
  listCompanies,
  rejectCompany,
  suspendCompany,
  activateCompany,
} from '../../services/adminService';
import { companyInitials, formatDate } from '../../lib/format';
import { ApiError } from '../../lib/api';
import type { CompanyModerationResponse } from '../../types/admin';

export function AdminEmployersPage() {
  const [searchParams] = useSearchParams();
  const [refreshKey, setRefreshKey] = useState(0);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<CompanyModerationResponse | null>(null);

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
    (page: number, size: number) => listCompanies(page, size, statusFilter || undefined),
    [statusFilter],
  );

  const handleApprove = async (company: CompanyModerationResponse) => {
    setActionInProgress(company.id);
    setError(null);
    setSuccess(null);
    try {
      await approveCompany(company.id);
      setSuccess(`Company "${company.name}" approved successfully.`);
      setRefreshKey((k) => k + 1);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'Unable to approve that company. Please try again.',
      );
      setTimeout(() => setError(null), 5000);
    } finally {
      setActionInProgress(null);
    }
  };

  const handleReject = async (company: CompanyModerationResponse) => {
    setActionInProgress(company.id);
    setError(null);
    setSuccess(null);
    try {
      await rejectCompany(company.id);
      setSuccess(`Company "${company.name}" rejected successfully.`);
      setRefreshKey((k) => k + 1);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'Unable to reject that company. Please try again.',
      );
      setTimeout(() => setError(null), 5000);
    } finally {
      setActionInProgress(null);
    }
  };

  const handleSuspend = async (company: CompanyModerationResponse) => {
    setActionInProgress(company.id);
    setError(null);
    setSuccess(null);
    try {
      await suspendCompany(company.id);
      setSuccess(`Company "${company.name}" suspended successfully.`);
      setRefreshKey((k) => k + 1);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'Unable to suspend that company. Please try again.',
      );
      setTimeout(() => setError(null), 5000);
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
      setSuccess(`Company "${company.name}" activated successfully.`);
      setRefreshKey((k) => k + 1);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'Unable to activate that company. Please try again.',
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
          <h1 className="text-2xl font-bold text-slate-900">
            Company management
          </h1>
          <p className="text-slate-500 mt-1">
            View, approve, and manage company accounts.
          </p>
        </div>
        <ExportCsvButton onExport={() => exportCsv('companies')} />
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
          All Companies
        </button>
        <button
          type="button"
          onClick={() => handleFilterChange('pending')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            statusFilter === 'PENDING'
              ? 'bg-warning text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}>
          Pending
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
          onClick={() => handleFilterChange('suspended')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            statusFilter === 'SUSPENDED'
              ? 'bg-danger text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}>
          Suspended
        </button>
        <button
          type="button"
          onClick={() => handleFilterChange('rejected')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            statusFilter === 'REJECTED'
              ? 'bg-danger text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}>
          Rejected
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
          emptyMessage={!statusFilter ? 'No companies found.' : statusFilter === 'PENDING' ? 'No companies awaiting approval.' : `No ${statusFilter.toLowerCase()} companies found.`}
          listClassName="divide-y divide-slate-200"
          renderItem={(company) => (
            <div 
              onClick={() => setSelectedCompany(company)}
              className="px-6 py-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-600">
                  {company.name ? companyInitials(company.name) : (
                    <Building2 size={18} />
                  )}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{company.name}</p>
                  <p className="text-sm text-slate-500">
                    {company.industry ?? 'Industry not set'}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <StatusBadge status={company.status} />
                <span className="text-slate-500">
                  {formatDate(company.createdAt)}
                </span>
                <ChevronRight size={16} className="text-slate-400" />
                {company.status === 'PENDING' && (
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => void handleApprove(company)}
                      disabled={actionInProgress === company.id}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-success/10 text-success hover:bg-success/20 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                      {actionInProgress === company.id ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <CheckCircle size={16} />
                      )}
                      {actionInProgress === company.id ? 'Processing...' : 'Approve'}
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleReject(company)}
                      disabled={actionInProgress === company.id}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-danger/10 text-danger hover:bg-danger/20 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                      {actionInProgress === company.id ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <XCircle size={16} />
                      )}
                      {actionInProgress === company.id ? 'Processing...' : 'Reject'}
                    </button>
                  </div>
                )}
                {company.status === 'ACTIVE' && (
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); void handleSuspend(company); }}
                    disabled={actionInProgress === company.id}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-danger/10 text-danger hover:bg-danger/20 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {actionInProgress === company.id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <ShieldOff size={16} />
                    )}
                    {actionInProgress === company.id ? 'Suspending...' : 'Suspend'}
                  </button>
                )}
                {company.status === 'SUSPENDED' && (
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); void handleActivate(company); }}
                    disabled={actionInProgress === company.id}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-success/10 text-success hover:bg-success/20 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {actionInProgress === company.id ? (
                      <Loader2 size={16} className="animate-spin" />
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

      {/* Company Detail Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedCompany(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Company Details</h3>
              <button
                type="button"
                onClick={() => setSelectedCompany(null)}
                className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-slate-500">Company Name</p>
                <p className="text-slate-900 font-semibold">{selectedCompany.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Industry</p>
                <p className="text-slate-900 font-semibold">{selectedCompany.industry ?? 'Not set'}</p>
              </div>
              {selectedCompany.employerEmail && (
                <>
                  <div className="pt-4 border-t border-slate-200 mt-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Employer Information</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Email</p>
                    <p className="text-slate-900 font-semibold">{selectedCompany.employerEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Role</p>
                    <p className="text-slate-900 font-semibold">{selectedCompany.employerRole ?? 'Not set'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Status</p>
                    <div className="mt-1">
                      <StatusBadge status={selectedCompany.employerStatus ?? selectedCompany.status} />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Email Verified</p>
                    <p className="text-slate-900 font-semibold">
                      {selectedCompany.employerEmailVerified ? 'Yes' : 'No'}
                    </p>
                  </div>
                </>
              )}
              <div>
                <p className="text-sm font-medium text-slate-500">Status</p>
                <div className="mt-1">
                  <StatusBadge status={selectedCompany.status} />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Created At</p>
                <p className="text-slate-900 font-semibold">
                  {formatDate(selectedCompany.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'ACTIVE') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-success/10 text-success">
        <CheckCircle size={14} /> Active
      </span>
    );
  }
  if (status === 'PENDING') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-warning/10 text-warning">
        <AlertCircle size={14} /> Pending
      </span>
    );
  }
  if (status === 'SUSPENDED') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-danger/10 text-danger">
        <ShieldOff size={14} /> Suspended
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-danger/10 text-danger">
      <XCircle size={14} /> Rejected
    </span>
  );
}
