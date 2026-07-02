import { useCallback } from 'react';
import { PaginatedList } from '../../components/PaginatedList';
import { formatDate, formatRelativeTime } from '../../lib/format';
import { listAuditEvents } from '../../services/adminService';
import type { AuditEvent } from '../../types/admin';

export function AdminAuditLogsPage() {
  const fetchPage = useCallback(
    (page: number, size: number) => listAuditEvents(page, size),
    [],
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Audit log</h1>
        <p className="text-slate-500 mt-1">
          Platform moderation and security events recorded by admins.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-soft border border-slate-200 overflow-hidden">
        <PaginatedList
          fetchPage={fetchPage}
          emptyMessage="No audit events recorded yet."
          listClassName="divide-y divide-slate-100"
          renderItem={(event: AuditEvent) => (
            <div className="px-6 py-4 hover:bg-slate-50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-slate-900">{event.action}</p>
                  <p className="text-sm text-slate-600 mt-0.5">
                    {event.details ?? '—'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {event.adminEmail}
                    {event.targetType && (
                      <>
                        {' '}
                        · {event.targetType}
                        {event.targetId ? ` #${event.targetId.slice(0, 8)}…` : ''}
                      </>
                    )}
                  </p>
                </div>
                <div className="text-xs text-slate-400 shrink-0 text-right">
                  <p>{formatRelativeTime(event.createdAt)}</p>
                  <p>{formatDate(event.createdAt)}</p>
                </div>
              </div>
            </div>
          )}
          getItemKey={(event) => event.id}
        />
      </div>
    </div>
  );
}
