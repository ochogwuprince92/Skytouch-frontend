import { useEffect, useState } from 'react';
import { DEFAULT_COUNTRY_ID, fetchStates } from '../services/locationService';
import type { StateResponse } from '../types/location';

interface StateSelectProps {
  value: string;
  onChange: (stateName: string) => void;
  label?: string;
  className?: string;
  /** Country whose states to load. Defaults to Nigeria (161). */
  countryId?: number;
  disabled?: boolean;
}

type LoadState = 'loading' | 'ready' | 'error';

export function StateSelect({
  value,
  onChange,
  label = 'State',
  className = '',
  countryId = DEFAULT_COUNTRY_ID,
  disabled = false,
}: StateSelectProps) {
  const [states, setStates] = useState<StateResponse[]>([]);
  const [status, setStatus] = useState<LoadState>('loading');

  useEffect(() => {
    let cancelled = false;
    if (!countryId) {
      setStates([]);
      setStatus('ready');
      return;
    }
    setStatus('loading');
    fetchStates(countryId)
      .then((data) => {
        if (cancelled) return;
        setStates(data);
        setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [countryId]);

  const isEmpty = status === 'ready' && states.length === 0;

  const placeholder =
    status === 'loading'
      ? 'Loading states…'
      : status === 'error'
        ? "Couldn't load states"
        : isEmpty
          ? 'No states available'
          : 'Select state';

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled || status !== 'ready' || isEmpty}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm disabled:opacity-60">
        <option value="">{placeholder}</option>
        {states.map((s) => (
          <option key={s.id} value={s.name}>
            {s.name}
          </option>
        ))}
      </select>
    </div>
  );
}
