import React, { useCallback, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Building2 } from 'lucide-react';
import { PaginatedList } from '../../components/PaginatedList';
import { ExportCsvButton } from '../../components/ExportCsvButton';
import {
  approveCompany,
  exportCsv,
  listPendingCompanies,
  rejectCompany,
} from '../../services/adminService';
import { companyInitials, formatDate, formatLocation } from '../../lib/format';
import type { CompanyResponse } from '../../types/company';

export function AdminEmployersPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchPage = useCallback(
    (page: number, size: number) => listPendingCompanies(page, size),
    [],
  );

  const handleApprove = async (company: CompanyResponse) => {
    await approveCompany(company.id);
    setRefreshKey((k) => k + 1);
  };

  const handleReject = async (company: CompanyResponse) => {
    await rejectCompany(company.id);
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Company approvals
          </h1>
          <p className="text-slate-500 mt-1">
            Review companies awaiting verification before they can publish jobs.
          </p>
        </div>
        <ExportCsvButton onExport={() => exportCsv('companies')} />
      </div>

      <div className="bg-white rounded-2xl shadow-soft border border-slate-200 overflow-hidden">
        <PaginatedList
          refreshKey={refreshKey}
          fetchPage={fetchPage}
          emptyMessage="No companies awaiting approval."
          listClassName="divide-y divide-slate-200"
          renderItem={(company) => (
            <div className="px-6 py-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-600">
                  {company.name ? companyInitials(company.name) : (
                    <Building2 size={18} />
                  )}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{company.name}</p>
                  <p className="text-sm text-slate-500">
                    {company.industry ?? 'Industry not set'} •{' '}
                    {formatLocation(company.addressState, company.addressLga)}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <StatusBadge status={company.status} />
                <span className="text-slate-500">
                  {formatDate(company.createdAt)}
                </span>
                {company.status === 'PENDING' && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => void handleApprove(company)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-success/10 text-success hover:bg-success/20 rounded-lg text-xs font-bold transition-colors">
                      <CheckCircle size={16} /> Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleReject(company)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-danger/10 text-danger hover:bg-danger/20 rounded-lg text-xs font-bold transition-colors">
                      <XCircle size={16} /> Reject
                    </button>
                  </div>
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

function StatusBadge({ status }: { status: CompanyResponse['status'] }) {
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
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-danger/10 text-danger">
      <XCircle size={14} /> Rejected
    </span>
  );
}
