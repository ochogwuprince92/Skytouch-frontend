import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { paymentApi } from '../../services/api';

export function PaymentCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'verifying' | 'activating' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);

  useEffect(() => {
    const reference = searchParams.get('reference');
    
    if (!reference) {
      setStatus('error');
      setMessage('No payment reference found in URL');
      return;
    }

    processPayment(reference);
  }, [searchParams]);

  const processPayment = async (reference: string) => {
    try {
      setStatus('verifying');
      setMessage('Verifying payment with Paystack...');

      // Step 1: Verify payment
      const verifyResponse = await paymentApi.verifyPayment(reference);
      
      if (!verifyResponse.status || !verifyResponse.data) {
        setStatus('error');
        setMessage('Payment verification failed. Please contact support.');
        return;
      }

      if (verifyResponse.data.gatewayResponse !== 'Successful') {
        setStatus('error');
        setMessage(`Payment was not successful: ${verifyResponse.data.gatewayResponse}`);
        return;
      }

      setStatus('activating');
      setMessage('Activating your subscription...');

      // Step 2: Verify and activate subscription in one call
      const activateResponse = await paymentApi.verifyAndActivate(reference);
      
      if (activateResponse.status) {
        setStatus('success');
        setMessage('Payment successful! Your subscription has been activated.');
        setSubscriptionDetails(activateResponse.data);
        
        // Redirect after 3 seconds
        setTimeout(() => {
          navigate('/subscription/current');
        }, 3000);
      } else {
        setStatus('error');
        setMessage(activateResponse.message || 'Subscription activation failed. Please contact support.');
      }
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Payment processing failed. Please try again or contact support.');
    }
  };

  const handleRetry = () => {
    navigate('/subscription/plans');
  };

  const handleViewSubscription = () => {
    navigate('/subscription/current');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-sm">
        {status === 'loading' && (
          <div className="text-center">
            <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">Processing Payment</h2>
            <p className="text-slate-600">Please wait while we process your payment...</p>
          </div>
        )}

        {status === 'verifying' && (
          <div className="text-center">
            <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">Verifying Payment</h2>
            <p className="text-slate-600">{message}</p>
          </div>
        )}

        {status === 'activating' && (
          <div className="text-center">
            <Loader2 className="w-16 h-16 animate-spin text-primary mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">Activating Subscription</h2>
            <p className="text-slate-600">{message}</p>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">Payment Successful!</h2>
            <p className="text-slate-600 mb-6">{message}</p>
            
            {subscriptionDetails && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-left">
                <p className="text-sm text-green-800 font-semibold mb-2">Subscription Details</p>
                <p className="text-sm text-green-700">Plan: {subscriptionDetails.plan}</p>
                <p className="text-sm text-green-700">Status: {subscriptionDetails.status}</p>
                <p className="text-sm text-green-700">
                  Expires: {new Date(subscriptionDetails.expiresAt).toLocaleDateString()}
                </p>
              </div>
            )}
            
            <p className="text-sm text-slate-500 mb-4">Redirecting to your subscription page...</p>
            <button
              onClick={handleViewSubscription}
              className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition"
            >
              View Subscription Now
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">Payment Failed</h2>
            <p className="text-slate-600 mb-6">{message}</p>
            
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-900 mb-1">What to do next</p>
                  <p className="text-sm text-amber-800">
                    If your payment was successful but you see this error, please wait a few minutes and check your subscription page. 
                    If the issue persists, contact our support team with your payment reference.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleRetry}
                className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition"
              >
                Try Again
              </button>
              <button
                onClick={handleViewSubscription}
                className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition"
              >
                Check Subscription
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
