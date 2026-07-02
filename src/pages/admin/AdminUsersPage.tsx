import React, { useState } from 'react';
import { Info, ShieldOff } from 'lucide-react';
import { FormAlert } from '../../components/FormAlert';
import { ExportCsvButton } from '../../components/ExportCsvButton';
import { exportCsv, suspendUser } from '../../services/adminService';
import { ApiError } from '../../lib/api';

export function AdminUsersPage() {
  const [userId, setUserId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSuspend = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const id = userId.trim();
    if (!id) {
      setError('Enter a user ID to suspend.');
      return;
    }

    setIsSubmitting(true);
    try {
      await suspendUser(id);
      setSuccess(`User ${id} suspended.`);
      setUserId('');
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'Unable to suspend that user. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            User management
          </h1>
          <p className="text-slate-600">
            Suspend accounts and export the full user directory.
          </p>
        </div>
        <ExportCsvButton onExport={() => exportCsv('users')} />
      </div>

      <div className="rounded-xl bg-primary-50/50 border border-primary-100 p-4 flex gap-3">
        <Info size={20} className="text-primary shrink-0 mt-0.5" />
        <p className="text-sm text-slate-600">
          The platform API exposes user administration as targeted actions plus
          a CSV export rather than a browsable list. Use the export to look up
          user IDs, then suspend an account below.
        </p>
      </div>

      <form
        onSubmit={handleSuspend}
        className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        {error && <FormAlert message={error} />}
        {success && <FormAlert message={success} variant="success" />}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            User ID
          </label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="e.g. 3f1c…uuid"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-danger focus:ring-1 focus:ring-danger text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-4 py-2.5 bg-danger text-white rounded-xl text-sm font-bold disabled:opacity-60">
          <ShieldOff size={16} />
          {isSubmitting ? 'Suspending…' : 'Suspend user'}
        </button>
      </form>
    </div>
  );
}
