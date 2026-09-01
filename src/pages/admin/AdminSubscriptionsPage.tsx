import React, { useCallback, useState } from 'react';
import { CreditCard, Calendar, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { PaginatedList } from '../../components/PaginatedList';
import { listSubscriptions } from '../../services/adminService';
import { formatDate } from '../../lib/format';
import type { SubscriptionModerationResponse } from '../../types/admin';

export function AdminSubscriptionsPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchPage = useCallback(
    (page: number, size: number) => listSubscriptions(page, size, statusFilter || undefined),
    [statusFilter],
  );

  const StatusBadge = ({ status }: { status: string }) => {
    const colors: Record<string, string> = {
      ACTIVE: 'bg-green-100 text-green-800 border-green-200',
      EXPIRED: 'bg-red-100 text-red-800 border-red-200',
      CANCELLED: 'bg-slate-100 text-slate-800 border-slate-200',
      PENDING: 'bg-amber-100 text-amber-800 border-amber-200',
    };
    const color = colors[status] || 'bg-slate-100 text-slate-800 border-slate-200';
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${color}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Subscriptions</h1>
          <p className="text-slate-600 mt-1">Manage employer subscriptions and billing.</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
            <option value="">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="EXPIRED">Expired</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>
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
          emptyMessage={!statusFilter ? 'No subscriptions found.' : `No ${statusFilter.toLowerCase()} subscriptions found.`}
          listClassName="divide-y divide-slate-200"
          renderItem={(subscription) => (
            <div className="px-6 py-4 hover:bg-slate-50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <CreditCard size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{subscription.companyName}</p>
                      {subscription.companyEmail && (
                        <p className="text-sm text-slate-500">{subscription.companyEmail}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="text-slate-600">
                      <span className="font-medium">Plan:</span> {subscription.plan}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-600">
                      <span className="font-medium">Billing:</span> {subscription.billingCycle}
                    </span>
                    <span className="text-slate-300">·</span>
                    <div className="flex items-center gap-1 text-slate-600">
                      <Calendar size={14} />
                      <span>Expires: {formatDate(subscription.expiresAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={subscription.status} />
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
