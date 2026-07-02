import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { ApiError } from '../lib/api';

interface ExportCsvButtonProps {
  onExport: () => Promise<void>;
  label?: string;
}

export function ExportCsvButton({
  onExport,
  label = 'Export CSV',
}: ExportCsvButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    setError(null);
    setIsExporting(true);
    try {
      await onExport();
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Export failed. Try again.',
      );
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={() => void handleExport()}
        disabled={isExporting}
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 font-semibold hover:bg-slate-50 disabled:opacity-60 transition-colors">
        {isExporting ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Download size={18} />
        )}
        {isExporting ? 'Exporting…' : label}
      </button>
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
