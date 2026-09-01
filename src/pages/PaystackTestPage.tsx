import { useState } from 'react';
import { Loader2, CreditCard, ArrowRight } from 'lucide-react';
import { initializePayment } from '../services/paymentService';

export function PaystackTestPage() {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('5000');
  const [currency, setCurrency] = useState('NGN');
  const [reference, setReference] = useState('');
  const [callbackUrl, setCallbackUrl] = useState('');
  const [metadata, setMetadata] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastReference, setLastReference] = useState<string | null>(null);

  const handleInitialize = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      const metadataObj = metadata ? JSON.parse(metadata) : undefined;

      const response = await initializePayment({
        email,
        amount: parseInt(amount, 10),
        currency,
        reference: reference || undefined,
        callbackUrl: callbackUrl || `${window.location.origin}/payment/callback`,
        metadata: metadataObj,
      });

      if (response.status && response.data) {
        setLastReference(response.data.reference);
        // Redirect to Paystack checkout
        window.location.href = response.data.authorizationUrl;
      } else {
        setError(response.message || 'Payment initialization failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment initialization failed';
      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Paystack Payment Test</h1>
          <p className="text-slate-600">
            Test the payment integration flow with Paystack
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <form onSubmit={handleInitialize} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="user@example.com"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Amount <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  placeholder="5000"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
                <p className="text-xs text-slate-500 mt-1">In smallest currency unit (5000 = ₦50.00)</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Currency <span className="text-red-500">*</span>
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="NGN">NGN</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Reference (Optional)
              </label>
              <input
                type="text"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="unique-ref-123"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <p className="text-xs text-slate-500 mt-1">Leave empty to auto-generate</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Callback URL (Optional)
              </label>
              <input
                type="url"
                value={callbackUrl}
                onChange={(e) => setCallbackUrl(e.target.value)}
                placeholder="https://yourapp.com/payment/callback"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <p className="text-xs text-slate-500 mt-1">Default: {window.location.origin}/payment/callback</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">
                Metadata (Optional - JSON)
              </label>
              <textarea
                value={metadata}
                onChange={(e) => setMetadata(e.target.value)}
                placeholder='{"jobId": "uuid", "userId": "uuid"}'
                rows={3}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono text-sm"
              />
              <p className="text-xs text-slate-500 mt-1">Valid JSON object for additional context</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {lastReference && (
              <div className="bg-slate-50 border border-slate-200 text-slate-700 px-4 py-3 rounded-lg text-sm">
                <span className="font-semibold">Last Reference:</span> {lastReference}
              </div>
            )}

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full px-6 py-4 bg-primary text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Initialize Payment
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">Payment Flow</h3>
            <ol className="text-sm text-slate-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="bg-primary/10 text-primary w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
                <span>Fill in payment details and click Initialize</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary/10 text-primary w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
                <span>Redirect to Paystack checkout page</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary/10 text-primary w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span>
                <span>Complete payment with test card or bank</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary/10 text-primary w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0">4</span>
                <span>Redirect to callback page for verification</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-primary/10 text-primary w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0">5</span>
                <span>Backend verifies payment and updates status</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
