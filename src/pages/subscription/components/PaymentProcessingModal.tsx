import { useState } from 'react';
import { X, Loader2, CreditCard, AlertCircle } from 'lucide-react';
import { subscriptionApi, paymentApi, tokenStorage } from '../../../services/api';
import type { PlanResponse, BillingCycle } from '../../../types/subscription';

interface PaymentProcessingModalProps {
  plan: PlanResponse;
  billingCycle: BillingCycle;
  onClose: () => void;
  onSuccess: () => void;
}

export function PaymentProcessingModal({ plan, billingCycle, onClose, onSuccess }: PaymentProcessingModalProps) {
  const [step, setStep] = useState<'confirm' | 'processing' | 'redirecting' | 'error'>('confirm');
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async () => {
    setStep('processing');
    setError(null);

    try {
      // Step 1: Create subscription
      const subscription = await subscriptionApi.subscribe({
        plan: plan.plan,
        billingCycle,
      });

      // Step 2: Initialize payment
      const email = tokenStorage.getEmail() || '';
      const callbackUrl = `${window.location.origin}/subscription/payment/callback`;
      
      const paymentResponse = await paymentApi.initializePayment({
        email,
        amount: plan.price,
        currency: 'NGN',
        callbackUrl,
        metadata: {
          subscriptionId: subscription.id,
          plan: plan.plan,
          description: `${plan.name} Plan Subscription`,
        },
      });

      // Step 3: Redirect to Paystack
      setStep('redirecting');
      if (paymentResponse.data?.authorizationUrl) {
        window.location.href = paymentResponse.data.authorizationUrl;
      } else {
        throw new Error('Invalid payment response');
      }
    } catch (err) {
      setStep('error');
      setError(err instanceof Error ? err.message : 'Payment initialization failed');
    }
  };

  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Complete Subscription</h2>
          {step === 'confirm' && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'confirm' && (
            <div className="space-y-6">
              {/* Plan Summary */}
              <div className="bg-slate-50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{plan.name} Plan</h3>
                    <p className="text-sm text-slate-600">{billingCycle.toLowerCase()} billing</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Total Amount</span>
                  <span className="text-2xl font-bold text-slate-900">{formatPrice(plan.price)}</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-900">You'll get:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    {plan.maxJobSlots} job {plan.maxJobSlots === 1 ? 'slot' : 'slots'}
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    {plan.description}
                  </li>
                  <li className="flex items-center gap-2 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    Access to all job posting features
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 border border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubscribe}
                  className="flex-1 py-3 px-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Proceed to Payment
                </button>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="text-center py-8">
              <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Processing Payment</h3>
              <p className="text-slate-600">Please wait while we initialize your payment...</p>
            </div>
          )}

          {step === 'redirecting' && (
            <div className="text-center py-8">
              <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Redirecting to Payment</h3>
              <p className="text-slate-600">You will be redirected to Paystack to complete your payment...</p>
            </div>
          )}

          {step === 'error' && (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-900 mb-1">Payment Failed</h4>
                  <p className="text-sm text-red-700">{error || 'Something went wrong. Please try again.'}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 border border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Close
                </button>
                <button
                  onClick={() => setStep('confirm')}
                  className="flex-1 py-3 px-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
          <p className="text-xs text-slate-500 text-center">
            Secure payment powered by Paystack. Your payment information is safe.
          </p>
        </div>
      </div>
    </div>
  );
}
