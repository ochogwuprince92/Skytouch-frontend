import { useEffect, useState } from 'react';
import {
  DEFAULT_COUNTRY_ID,
  listStatesByCountry,
} from '../services/locationService';
import type { StateResponse } from '../types/location';

interface StateSelectProps {
  value: string;
  onChange: (stateName: string) => void;
  label?: string;
  className?: string;
  countryId?: number;
}

export function StateSelect({
  value,
  onChange,
  label = 'State',
  className = '',
  countryId = DEFAULT_COUNTRY_ID,
}: StateSelectProps) {
  const [states, setStates] = useState<StateResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void listStatesByCountry(countryId)
      .then((data) => {
        if (!cancelled) setStates(data);
      })
      .catch(() => {
        if (!cancelled) setStates([]);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [countryId]);

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
        disabled={isLoading}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm disabled:opacity-60">
        <option value="">{isLoading ? 'Loading…' : 'Select state'}</option>
        {states.map((s) => (
          <option key={s.id} value={s.name}>
            {s.name}
          </option>
        ))}
      </select>
    </div>
  );
}
