import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Check, ArrowRight } from 'lucide-react';
import { subscriptionApi } from '../../services/api';
import { BillingCycle } from '../../types/subscription';
import type { PlanResponse } from '../../types/subscription';
import { PlanCard } from './components/PlanCard';
import { BillingCycleToggle } from './components/BillingCycleToggle';
import { PaymentProcessingModal } from './components/PaymentProcessingModal';

export function SubscriptionPlansPage() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<PlanResponse[]>([]);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(BillingCycle.MONTHLY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<PlanResponse | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await subscriptionApi.getPlans();
      setPlans(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load plans');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = (plan: PlanResponse) => {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  const formatPrice = (price: number, cycle: BillingCycle) => {
    const nairaSymbol = '₦';
    if (cycle === 'YEARLY') {
      return `${nairaSymbol}${price.toLocaleString()}/year`;
    }
    return `${nairaSymbol}${price.toLocaleString()}/month`;
  };

  const getFilteredPlans = () => {
    return plans.filter(plan => plan.billingCycle === billingCycle);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-slate-600">Loading subscription plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center max-w-md">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-4">
            <p className="text-red-800">{error}</p>
          </div>
          <button
            onClick={fetchPlans}
            className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const filteredPlans = getFilteredPlans();

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Choose Your Subscription Plan</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Select the perfect plan for your hiring needs. All plans include access to our job posting platform.
          </p>
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex justify-center mb-10">
          <BillingCycleToggle
            value={billingCycle}
            onChange={setBillingCycle}
          />
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredPlans.map((plan) => (
            <PlanCard
              key={`${plan.plan}-${plan.billingCycle}`}
              plan={plan}
              isRecommended={plan.plan === 'STANDARD'}
              onSubscribe={handleSubscribe}
              formatPrice={formatPrice}
              billingCycle={billingCycle}
            />
          ))}
        </div>

        {/* Features Comparison */}
        <div className="mt-16 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Plan Features</h2>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-5 border-b border-slate-200">
              <div className="p-4 font-semibold text-slate-900">Feature</div>
              <div className="p-4 font-semibold text-center text-slate-900">Free</div>
              <div className="p-4 font-semibold text-center text-slate-900">Basic</div>
              <div className="p-4 font-semibold text-center text-primary">Standard</div>
              <div className="p-4 font-semibold text-center text-slate-900">Premium</div>
            </div>
            {[
              { feature: 'Job Postings', free: '3 slots', basic: '5 slots', standard: '15 slots', premium: 'Unlimited' },
              { feature: 'Company Profile', free: true, basic: true, standard: true, premium: true },
              { feature: 'Application Management', free: true, basic: true, standard: true, premium: true },
              { feature: 'Candidate Search', free: false, basic: false, standard: true, premium: true },
              { feature: 'Priority Support', free: false, basic: false, standard: true, premium: true },
              { feature: 'Analytics Dashboard', free: false, basic: false, standard: false, premium: true },
            ].map((item, index) => (
              <div key={index} className="grid grid-cols-5 border-b border-slate-100 last:border-0">
                <div className="p-4 text-slate-700">{item.feature}</div>
                <div className="p-4 text-center text-slate-600">
                  {typeof item.free === 'boolean' ? (
                    item.free ? <Check className="w-5 h-5 mx-auto text-green-500" /> : '—'
                  ) : (
                    item.free
                  )}
                </div>
                <div className="p-4 text-center text-slate-600">
                  {typeof item.basic === 'boolean' ? (
                    item.basic ? <Check className="w-5 h-5 mx-auto text-green-500" /> : '—'
                  ) : (
                    item.basic
                  )}
                </div>
                <div className="p-4 text-center text-slate-600">
                  {typeof item.standard === 'boolean' ? (
                    item.standard ? <Check className="w-5 h-5 mx-auto text-green-500" /> : '—'
                  ) : (
                    item.standard
                  )}
                </div>
                <div className="p-4 text-center text-slate-600">
                  {typeof item.premium === 'boolean' ? (
                    item.premium ? <Check className="w-5 h-5 mx-auto text-green-500" /> : '—'
                  ) : (
                    item.premium
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Subscription Link */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/subscription/current')}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition"
          >
            View Current Subscription
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Payment Processing Modal */}
      {showPaymentModal && selectedPlan && (
        <PaymentProcessingModal
          plan={selectedPlan}
          billingCycle={billingCycle}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedPlan(null);
          }}
          onSuccess={() => {
            setShowPaymentModal(false);
            setSelectedPlan(null);
            navigate('/subscription/current');
          }}
        />
      )}
    </div>
  );
}
