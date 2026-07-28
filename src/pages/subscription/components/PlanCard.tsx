import { Check, Star } from 'lucide-react';
import type { PlanResponse, BillingCycle } from '../../../types/subscription';

interface PlanCardProps {
  plan: PlanResponse;
  isRecommended: boolean;
  onSubscribe: (plan: PlanResponse) => void;
  formatPrice: (price: number, cycle: BillingCycle) => string;
  billingCycle: BillingCycle;
}

export function PlanCard({ plan, isRecommended, onSubscribe, formatPrice, billingCycle }: PlanCardProps) {
  const features = [
    `${plan.maxJobSlots} job ${plan.maxJobSlots === 1 ? 'slot' : 'slots'}`,
    plan.unlimited ? 'Unlimited job postings' : `${plan.maxJobSlots} active jobs`,
    'Company profile',
    'Application management',
    plan.plan !== 'BASIC' && 'Candidate search',
    plan.plan === 'PREMIUM' && 'Analytics dashboard',
    plan.plan === 'PREMIUM' && 'Priority support',
  ].filter(Boolean);

  return (
    <div
      className={`relative bg-white rounded-2xl shadow-sm p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        isRecommended ? 'border-2 border-primary ring-4 ring-primary/10' : 'border border-slate-200'
      }`}
    >
      {isRecommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <Star className="w-4 h-4 fill-white" />
            Recommended
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
        <p className="text-slate-600 text-sm mb-4">{plan.description}</p>
        <div className="text-4xl font-bold text-slate-900 mb-1">
          {formatPrice(plan.price, billingCycle)}
        </div>
        <p className="text-slate-500 text-sm">per {billingCycle.toLowerCase()}</p>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <span className="text-slate-700 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSubscribe(plan)}
        className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
          isRecommended
            ? 'bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg'
            : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
        }`}
      >
        Subscribe Now
      </button>
    </div>
  );
}
