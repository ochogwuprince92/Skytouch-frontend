import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { verifyPayment } from '../services/paymentService';

export function PaymentCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const reference = searchParams.get('reference');
    
    if (!reference) {
      setStatus('-error');
      setMessage('No payment reference found');
      return;
    }

    const verify = async () => {
      try {
        const response = await verifyPayment(reference);
        
        if (response.status && response.data) {
          setStatus('success');
          setMessage('Payment verified successfully');
          
          // Redirect after 3 seconds
          setTimeout(() => {
            navigate('/payment/test');
          }, 3000);
        } else {
          setStatus('error');
          setMessage(response.message || 'Payment verification failed');
        }
      } catch (err) {
        setStatus('error');
        setMessage(err instanceof Error ? err.message : 'Payment verification failed');
      }
    };

    verify();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-sm">
        {status === 'loading' && (
          <div className="text-center">
            <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">Verifying Payment</h2>
            <p className="text-slate-600">Please wait while we verify your payment...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">Payment Successful</h2>
            <p className="text-slate-600 mb-4">{message}</p>
            <p className="text-sm text-slate-500">Redirecting to dashboard...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">Payment Failed</h2>
            <p className="text-slate-600 mb-6">{message}</p>
            <button
              onClick={() => navigate('/payment/test')}
              className="px-6 py-3 bg-primary text-white rounded-xl font-semibold">
              Return to Test Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
