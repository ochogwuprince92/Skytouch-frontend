import { useEffect, useState } from 'react';
import { fetchCountries } from '../services/locationService';
import type { CountryResponse } from '../types/location';

interface CountrySelectProps {
  value: number;
  onChange: (countryId: number, country?: CountryResponse) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
}

type LoadState = 'loading' | 'ready' | 'error';

export function CountrySelect({
  value,
  onChange,
  label = 'Country',
  className = '',
  disabled = false,
}: CountrySelectProps) {
  const [countries, setCountries] = useState<CountryResponse[]>([]);
  const [status, setStatus] = useState<LoadState>('loading');

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    fetchCountries()
      .then((data) => {
        if (cancelled) return;
        setCountries(data);
        setStatus('ready');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(e.target.value);
    onChange(id, countries.find((c) => c.id === id));
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
          {label}
        </label>
      )}
      <select
        value={value || ''}
        onChange={handleChange}
        disabled={disabled || status !== 'ready'}
        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm disabled:opacity-60">
        {status === 'loading' && <option value="">Loading countries…</option>}
        {status === 'error' && (
          <option value="">Couldn&apos;t load countries</option>
        )}
        {status === 'ready' && <option value="">Select country</option>}
        {countries.map((c) => (
          <option key={c.id} value={c.id}>
            {c.emoji ? `${c.emoji} ` : ''}
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}
