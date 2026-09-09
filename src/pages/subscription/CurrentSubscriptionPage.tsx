import { useNavigate } from 'react-router-dom';
import { Loader2, ArrowRight, RefreshCw, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';
import { SubscriptionStatusBadge } from './components/SubscriptionStatusBadge';
import { SubscriptionActions } from './components/SubscriptionActions';
import { UsageMeter } from './components/UsageMeter';

export function CurrentSubscriptionPage() {
  const navigate = useNavigate();
  const { subscription, usage, loading, error, refresh } = useSubscription();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getDaysRemaining = (expiresAt: string) => {
    const expiry = new Date(expiresAt);
    const now = new Date();
    const diff = expiry.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-slate-600">Loading subscription details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center max-w-md">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-4">
            <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-3" />
            <p className="text-red-800">{error}</p>
          </div>
          <button
            onClick={refresh}
            className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center max-w-md">
          <div className="bg-slate-100 rounded-2xl p-8 mb-6">
            <AlertTriangle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">No Active Subscription</h2>
            <p className="text-slate-600 mb-6">You don't have an active subscription. Choose a plan to get started.</p>
          </div>
          <button
            onClick={() => navigate('/subscription/plans')}
            className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition flex items-center gap-2 mx-auto"
          >
            View Subscription Plans
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const daysRemaining = getDaysRemaining(subscription.expiresAt);
  const isExpiringSoon = daysRemaining <= 7 && daysRemaining > 0;
  const isExpired = daysRemaining <= 0;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/subscription/plans')}
            className="text-slate-600 hover:text-slate-900 mb-4 inline-flex items-center gap-2 transition"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Plans
          </button>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Current Subscription</h1>
          <p className="text-slate-600">Manage your subscription and view usage details</p>
        </div>

        {/* Subscription Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-slate-900">{subscription.plan} Plan</h2>
                <SubscriptionStatusBadge status={subscription.status} />
              </div>
              <p className="text-slate-600">
                {subscription.billingCycle.toLowerCase()} subscription
              </p>
            </div>
            <button
              onClick={refresh}
              className="p-2 hover:bg-slate-100 rounded-lg transition"
              title="Refresh"
            >
              <RefreshCw className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          {/* Expiry Info */}
          <div className={`rounded-xl p-4 mb-6 ${
            isExpired 
              ? 'bg-red-50 border border-red-200' 
              : isExpiringSoon 
                ? 'bg-amber-50 border border-amber-200' 
                : 'bg-green-50 border border-green-200'
          }`}>
            <div className="flex items-center gap-3">
              {isExpired ? (
                <XCircle className="w-5 h-5 text-red-600" />
              ) : isExpiringSoon ? (
                <Clock className="w-5 h-5 text-amber-600" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
              <div>
                <p className={`font-semibold ${
                  isExpired ? 'text-red-900' : isExpiringSoon ? 'text-amber-900' : 'text-green-900'
                }`}>
                  {isExpired 
                    ? 'Subscription Expired' 
                    : isExpiringSoon 
                      ? `Expires in ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''}` 
                      : `Expires on ${formatDate(subscription.expiresAt)}`}
                </p>
                <p className={`text-sm ${
                  isExpired ? 'text-red-700' : isExpiringSoon ? 'text-amber-700' : 'text-green-700'
                }`}>
                  {formatDate(subscription.expiresAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Subscription Details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-sm text-slate-600 mb-1">Started</p>
              <p className="font-semibold text-slate-900">{formatDate(subscription.startDate)}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-sm text-slate-600 mb-1">Billing Cycle</p>
              <p className="font-semibold text-slate-900 capitalize">{subscription.billingCycle.toLowerCase()}</p>
            </div>
          </div>

          {/* Actions */}
          <SubscriptionActions 
            status={subscription.status}
            onRefresh={refresh}
            onNavigate={navigate}
          />
        </div>

        {/* Usage Section */}
        {usage && (
          <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Usage Overview</h3>
            <UsageMeter usage={usage} />
          </div>
        )}

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/subscription/usage')}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">View Detailed Usage</h4>
                <p className="text-sm text-slate-600">See your job slot usage and history</p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400" />
            </div>
          </button>
          <button
            onClick={() => navigate('/subscription/plans')}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Change Plan</h4>
                <p className="text-sm text-slate-600">Upgrade or downgrade your subscription</p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
