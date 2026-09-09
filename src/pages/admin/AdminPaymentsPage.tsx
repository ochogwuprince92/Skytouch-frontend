import React, { useCallback, useState } from 'react';
import { CreditCard, DollarSign, Calendar, CheckCircle, XCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { PaginatedList } from '../../components/PaginatedList';
import { listPayments } from '../../services/adminService';
import { formatDate } from '../../lib/format';
import type { PaymentModerationResponse } from '../../types/admin';

export function AdminPaymentsPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchPage = useCallback(
    (page: number, size: number) => listPayments(page, size, statusFilter || undefined),
    [statusFilter],
  );

  const StatusBadge = ({ status }: { status: string }) => {
    const colors: Record<string, string> = {
      SUCCESS: 'bg-green-100 text-green-800 border-green-200',
      FAILED: 'bg-red-100 text-red-800 border-red-200',
      PENDING: 'bg-amber-100 text-amber-800 border-amber-200',
    };
    const icons: Record<string, React.ReactNode> = {
      SUCCESS: <CheckCircle size={12} />,
      FAILED: <XCircle size={12} />,
      PENDING: <AlertCircle size={12} />,
    };
    const color = colors[status] || 'bg-slate-100 text-slate-800 border-slate-200';
    const icon = icons[status];
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${color}`}>
        {icon}
        {status}
      </span>
    );
  };

  const formatAmount = (amount: number, currency: string) => {
    const symbol = currency === 'NGN' ? '₦' : currency;
    return `${symbol}${amount.toLocaleString()}`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Payments</h1>
          <p className="text-slate-600 mt-1">View and manage payment transactions.</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-xl text-sm font-medium text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
            <option value="">All Statuses</option>
            <option value="SUCCESS">Success</option>
            <option value="FAILED">Failed</option>
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
          emptyMessage={!statusFilter ? 'No payments found.' : `No ${statusFilter.toLowerCase()} payments found.`}
          listClassName="divide-y divide-slate-200"
          renderItem={(payment) => (
            <div className="px-6 py-4 hover:bg-slate-50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <DollarSign size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{formatAmount(payment.amount, payment.currency)}</p>
                      <p className="text-sm text-slate-500 font-mono">{payment.reference}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="text-slate-600">
                      <span className="font-medium">Customer:</span> {payment.customerEmail}
                    </span>
                    {payment.companyName && (
                      <>
                        <span className="text-slate-300">·</span>
                        <span className="text-slate-600">
                          <span className="font-medium">Company:</span> {payment.companyName}
                        </span>
                      </>
                    )}
                    <span className="text-slate-300">·</span>
                    <div className="flex items-center gap-1 text-slate-600">
                      <Calendar size={14} />
                      <span>{formatDate(payment.createdAt)}</span>
                    </div>
                  </div>
                  {payment.gatewayResponse && (
                    <p className="text-xs text-slate-500 mt-1">
                      Gateway: {payment.gatewayResponse}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={payment.status} />
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
