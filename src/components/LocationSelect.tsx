import { useState } from 'react';
import { CountrySelect } from './CountrySelect';
import { StateSelect } from './StateSelect';
import { DEFAULT_COUNTRY_ID } from '../services/locationService';

interface LocationSelectProps {
  /** Selected state NAME (this is what the API expects, e.g. "Lagos"). */
  stateValue: string;
  onStateChange: (stateName: string) => void;
  /** Show the dependent country picker above the state select. */
  showCountry?: boolean;
  defaultCountryId?: number;
  stateLabel?: string;
  countryLabel?: string;
  className?: string;
  disabled?: boolean;
}

/**
 * Country + dependent State picker. Selecting a country loads its states.
 * The component emits the selected STATE NAME (not the numeric id), which is
 * the value the backend stores for addressState / locationState / state.
 */
export function LocationSelect({
  stateValue,
  onStateChange,
  showCountry = true,
  defaultCountryId = DEFAULT_COUNTRY_ID,
  stateLabel = 'State',
  countryLabel = 'Country',
  className = '',
  disabled = false,
}: LocationSelectProps) {
  const [countryId, setCountryId] = useState(defaultCountryId);

  const handleCountryChange = (id: number) => {
    setCountryId(id);
    // Clear a stale state selection when the country changes.
    if (stateValue) onStateChange('');
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {showCountry && (
        <CountrySelect
          value={countryId}
          onChange={handleCountryChange}
          label={countryLabel}
          disabled={disabled}
        />
      )}
      <StateSelect
        value={stateValue}
        onChange={onStateChange}
        countryId={countryId}
        label={stateLabel}
        disabled={disabled}
      />
    </div>
  );
}
