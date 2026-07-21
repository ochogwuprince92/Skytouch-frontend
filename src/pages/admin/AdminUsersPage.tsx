import React, { useCallback, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ShieldOff, Search, CheckCircle, XCircle, UserCheck } from 'lucide-react';
import { PaginatedList } from '../../components/PaginatedList';
import { ExportCsvButton } from '../../components/ExportCsvButton';
import { listUsers, suspendUser, activateUser, exportCsv } from '../../services/adminService';
import { ApiError } from '../../lib/api';
import type { UserModerationResponse } from '../../types/admin';

export function AdminUsersPage() {
  const [searchParams] = useSearchParams();
  const [refreshKey, setRefreshKey] = useState(0);
  const [emailFilter, setEmailFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [emailVerifiedFilter, setEmailVerifiedFilter] = useState<boolean | undefined>(undefined);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const filter = searchParams.get('filter');
    if (filter) {
      handleFilterChange(filter);
    }
  }, [searchParams]);

  const fetchPage = useCallback(
    (page: number, size: number) => listUsers(
      page, 
      size, 
      emailFilter || undefined,
      statusFilter || undefined,
      emailVerifiedFilter
    ),
    [emailFilter, statusFilter, emailVerifiedFilter],
  );

  const handleSuspend = async (user: UserModerationResponse) => {
    setActionInProgress(user.email);
    setError(null);
    setSuccess(null);
    try {
      await suspendUser(user.id);
      setSuccess(`User ${user.email} suspended successfully.`);
      setRefreshKey((k) => k + 1);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'Unable to suspend that user. Please try again.',
      );
      setTimeout(() => setError(null), 5000);
    } finally {
      setActionInProgress(null);
    }
  };

  const handleActivate = async (user: UserModerationResponse) => {
    setActionInProgress(user.email);
    setError(null);
    setSuccess(null);
    try {
      await activateUser(user.id);
      setSuccess(`User ${user.email} activated successfully.`);
      setRefreshKey((k) => k + 1);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'Unable to activate that user. Please try again.',
      );
      setTimeout(() => setError(null), 5000);
    } finally {
      setActionInProgress(null);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setRefreshKey((k) => k + 1);
  };

  const handleFilterChange = (filter: string) => {
    setStatusFilter('');
    setEmailVerifiedFilter(undefined);
    
    switch (filter) {
      case 'unverified':
        setEmailVerifiedFilter(false);
        break;
      case 'pending':
        setStatusFilter('PENDING');
        break;
      case 'suspended':
        setStatusFilter('SUSPENDED');
        break;
      case 'active':
        setStatusFilter('ACTIVE');
        break;
      default:
        break;
    }
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            User management
          </h1>
          <p className="text-slate-500 mt-1">
            View, search, and manage user accounts.
          </p>
        </div>
        <ExportCsvButton onExport={() => exportCsv('users', emailFilter || undefined)} />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => handleFilterChange('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            !statusFilter && emailVerifiedFilter === undefined
              ? 'bg-primary text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}>
          All Users
        </button>
        <button
          type="button"
          onClick={() => handleFilterChange('unverified')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            emailVerifiedFilter === false
              ? 'bg-warning text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}>
          Unverified Emails
        </button>
        <button
          type="button"
          onClick={() => handleFilterChange('pending')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            statusFilter === 'PENDING'
              ? 'bg-warning text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}>
          Pending Accounts
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
          onClick={() => handleFilterChange('active')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            statusFilter === 'ACTIVE'
              ? 'bg-success text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}>
          Active
        </button>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="email"
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
            placeholder="Search by email..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-600 transition-colors">
          Search
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
          refreshKey={`${refreshKey}-${emailFilter}`}
          fetchPage={fetchPage}
          emptyMessage="No users found."
          listClassName="divide-y divide-slate-200"
          renderItem={(user) => (
            <div className="px-6 py-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-600">
                    {user.email[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{user.email}</p>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-0.5">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                        {user.role}
                      </span>
                      <StatusBadge status={user.status} />
                      {!user.emailVerified && (
                        <span className="text-warning text-xs">Email not verified</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </span>
                {user.status === 'ACTIVE' && (
                  <button
                    type="button"
                    onClick={() => void handleSuspend(user)}
                    disabled={actionInProgress === user.email}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-danger/10 text-danger hover:bg-danger/20 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {actionInProgress === user.email ? (
                      <ShieldOff size={16} className="animate-spin" />
                    ) : (
                      <ShieldOff size={16} />
                    )}
                    {actionInProgress === user.email ? 'Suspending...' : 'Suspend'}
                  </button>
                )}
                {user.status === 'SUSPENDED' && (
                  <button
                    type="button"
                    onClick={() => void handleActivate(user)}
                    disabled={actionInProgress === user.email}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-success/10 text-success hover:bg-success/20 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    {actionInProgress === user.email ? (
                      <UserCheck size={16} className="animate-spin" />
                    ) : (
                      <UserCheck size={16} />
                    )}
                    {actionInProgress === user.email ? 'Activating...' : 'Activate'}
                  </button>
                )}
              </div>
            </div>
          )}
          getItemKey={(user) => user.id}
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
        Pending
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold bg-danger/10 text-danger">
      <XCircle size={12} /> Suspended
    </span>
  );
}
