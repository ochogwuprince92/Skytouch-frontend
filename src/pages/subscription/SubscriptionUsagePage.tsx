import { useNavigate } from 'react-router-dom';
import { Loader2, ArrowRight, TrendingUp, AlertCircle, Calendar, BarChart3 } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';
import { UsageMeter } from './components/UsageMeter';
import { UpgradePrompt } from './components/UpgradePrompt';

export function SubscriptionUsagePage() {
  const navigate = useNavigate();
  const { usage, loading, error, refresh } = useSubscription();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-slate-600">Loading usage details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center max-w-md">
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-4">
            <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-3" />
            <p className="text-red-800">{error}</p>
          </div>
          <button
            onClick={refresh}
            className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition flex items-center gap-2 mx-auto"
          >
            <Loader2 className="w-4 h-4" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!usage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center max-w-md">
          <div className="bg-slate-100 rounded-2xl p-8 mb-6">
            <AlertCircle className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">No Usage Data</h2>
            <p className="text-slate-600 mb-6">Unable to load usage information. Please try again later.</p>
          </div>
          <button
            onClick={() => navigate('/subscription/current')}
            className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition flex items-center gap-2 mx-auto"
          >
            View Subscription
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

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

  const daysRemaining = getDaysRemaining(usage.expiresAt);
  const isExpiringSoon = daysRemaining <= 7 && daysRemaining > 0;
  const isExpired = daysRemaining <= 0;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/subscription/current')}
            className="text-slate-600 hover:text-slate-900 mb-4 inline-flex items-center gap-2 transition"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Back to Subscription
          </button>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Subscription Usage</h1>
          <p className="text-slate-600">Monitor your job posting activity and subscription utilization</p>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Active Jobs</p>
                <p className="text-2xl font-bold text-slate-900">{usage.activeJobs}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Remaining Slots</p>
                <p className="text-2xl font-bold text-slate-900">
                  {usage.unlimited ? '∞' : usage.remainingSlots ?? 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Days Remaining</p>
                <p className={`text-2xl font-bold ${isExpired ? 'text-red-600' : isExpiringSoon ? 'text-amber-600' : 'text-slate-900'}`}>
                  {isExpired ? '0' : daysRemaining}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${usage.canPublish ? 'bg-green-100' : 'bg-red-100'}`}>
                <AlertCircle className={`w-5 h-5 ${usage.canPublish ? 'text-green-600' : 'text-red-600'}`} />
              </div>
              <div>
                <p className="text-sm text-slate-600">Can Publish</p>
                <p className={`text-2xl font-bold ${usage.canPublish ? 'text-green-600' : 'text-red-600'}`}>
                  {usage.canPublish ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Meter */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Job Slot Usage</h2>
          <UsageMeter usage={usage} />
        </div>

        {/* Upgrade Prompt */}
        {!usage.unlimited && usage.remainingSlots !== null && usage.remainingSlots <= 3 && (
          <UpgradePrompt 
            currentPlan={usage.plan}
            onUpgrade={() => navigate('/subscription/plans')}
          />
        )}

        {/* Expiry Warning */}
        {isExpiringSoon && !isExpired && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-900 mb-1">Subscription Expiring Soon</h3>
                <p className="text-amber-800 mb-3">
                  Your subscription will expire in {daysRemaining} day{daysRemaining !== 1 ? 's' : ''}. 
                  Renew now to avoid interruption to your job posting services.
                </p>
                <button
                  onClick={() => navigate('/subscription/current')}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition"
                >
                  Renew Subscription
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Expired Warning */}
        {isExpired && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 mb-1">Subscription Expired</h3>
                <p className="text-red-800 mb-3">
                  Your subscription has expired. Renew now to continue posting jobs and accessing premium features.
                </p>
                <button
                  onClick={() => navigate('/subscription/current')}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  Renew Subscription
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/subscription/current')}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Manage Subscription</h4>
                <p className="text-sm text-slate-600">View details, upgrade, or cancel</p>
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
                <p className="text-sm text-slate-600">Upgrade or downgrade your plan</p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
