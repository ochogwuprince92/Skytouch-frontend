import { useState } from 'react';
import { Loader2, X, CreditCard } from 'lucide-react';
import { initializePayment, verifyPayment, type PaymentInitializeRequest } from '../services/paymentService';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  currency?: string;
  email: string;
  metadata?: Record<string, string>;
  onSuccess?: (reference: string) => void;
  onError?: (error: string) => void;
}

export function PaymentModal({
  isOpen,
  onClose,
  amount,
  currency = 'NGN',
  email,
  metadata,
  onSuccess,
  onError,
}: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handlePayment = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      const request: PaymentInitializeRequest = {
        email,
        amount,
        currency,
        metadata,
        callbackUrl: `${window.location.origin}/payment/callback`,
      };

      const response = await initializePayment(request);

      if (response.status && response.data) {
        // Redirect to Paystack checkout
        window.location.href = response.data.authorizationUrl;
      } else {
        const errorMessage = response.message || 'Payment initialization failed';
        setError(errorMessage);
        onError?.(errorMessage);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment initialization failed';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Complete Payment</h3>
              <p className="text-sm text-slate-600">Secure payment via Paystack</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="text-slate-400 hover:text-slate-600 disabled:opacity-60">
            <X size={20} />
          </button>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-600">Amount</span>
            <span className="text-lg font-bold text-slate-900">
              {currency} {amount.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Email</span>
            <span className="text-sm text-slate-900">{email}</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 px-4 py-3 border border-slate-200 text-slate-700 rounded-xl font-semibold disabled:opacity-60">
            Cancel
          </button>
          <button
            type="button"
            onClick={handlePayment}
            disabled={isProcessing}
            className="flex-1 px-4 py-3 bg-primary text-white rounded-xl font-semibold disabled:opacity-60 flex items-center justify-center gap-2">
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Pay Now'
            )}
          </button>
        </div>

        <p className="text-xs text-slate-500 text-center mt-4">
          Secured by Paystack. Your payment information is safe.
        </p>
      </div>
    </div>
  );
}
