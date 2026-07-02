import React, { useState } from 'react';
import { Info, Ban } from 'lucide-react';
import { FormAlert } from '../../components/FormAlert';
import { ExportCsvButton } from '../../components/ExportCsvButton';
import { exportCsv, forceCloseJob } from '../../services/adminService';
import { ApiError } from '../../lib/api';

export function AdminJobsModerationPage() {
  const [jobId, setJobId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleClose = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const id = jobId.trim();
    if (!id) {
      setError('Enter a job ID to force-close.');
      return;
    }

    setIsSubmitting(true);
    try {
      await forceCloseJob(id);
      setSuccess(`Job ${id} force-closed.`);
      setJobId('');
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'Unable to close that job. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Jobs moderation</h1>
          <p className="text-slate-500 mt-1">
            Force-close problematic listings and export the job directory.
          </p>
        </div>
        <ExportCsvButton onExport={() => exportCsv('jobs')} />
      </div>

      <div className="rounded-xl bg-primary-50/50 border border-primary-100 p-4 flex gap-3">
        <Info size={20} className="text-primary shrink-0 mt-0.5" />
        <p className="text-sm text-slate-600">
          Job moderation is action-based: use the CSV export to identify a job
          ID, then force-close it below. Companies are gated separately under
          Company approvals.
        </p>
      </div>

      <form
        onSubmit={handleClose}
        className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        {error && <FormAlert message={error} />}
        {success && <FormAlert message={success} variant="success" />}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Job ID
          </label>
          <input
            type="text"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            placeholder="e.g. job…uuid"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-danger focus:ring-1 focus:ring-danger text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-4 py-2.5 bg-danger text-white rounded-xl text-sm font-bold disabled:opacity-60">
          <Ban size={16} />
          {isSubmitting ? 'Closing…' : 'Force-close job'}
        </button>
      </form>
    </div>
  );
}
