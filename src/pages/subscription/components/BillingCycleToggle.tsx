import { BillingCycle } from '../../../types/subscription';

interface BillingCycleToggleProps {
  value: BillingCycle;
  onChange: (value: BillingCycle) => void;
}

export function BillingCycleToggle({ value, onChange }: BillingCycleToggleProps) {
  return (
    <div className="inline-flex bg-slate-200 rounded-xl p-1">
      <button
        onClick={() => onChange(BillingCycle.MONTHLY)}
        className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
          value === BillingCycle.MONTHLY
            ? 'bg-white text-slate-900 shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        Monthly
      </button>
      <button
        onClick={() => onChange(BillingCycle.YEARLY)}
        className={`px-6 py-2 rounded-lg font-semibold transition-all duration-200 ${
          value === BillingCycle.YEARLY
            ? 'bg-white text-slate-900 shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        Yearly
      </button>
    </div>
  );
}
