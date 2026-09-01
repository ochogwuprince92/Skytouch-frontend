import { SubscriptionStatus } from '../../../types/subscription';
import { subscriptionApi } from '../../../services/api';
import { useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

interface SubscriptionActionsProps {
  status: SubscriptionStatus;
  onRefresh: () => void;
  onNavigate: (path: string) => void;
}

export function SubscriptionActions({ status, onRefresh, onNavigate }: SubscriptionActionsProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAction = async (action: () => Promise<void>) => {
    setLoading(true);
    setError(null);
    try {
      await action();
      onRefresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRenew = async () => {
    await handleAction(() => subscriptionApi.renew());
  };

  const handleCancel = async () => {
    if (window.confirm('Are you sure you want to cancel your subscription? This action cannot be undone.')) {
      await handleAction(() => subscriptionApi.cancel());
    }
  };

  const handleActivate = async () => {
    onNavigate('/subscription/plans');
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {status === SubscriptionStatus.PENDING && (
          <button
            onClick={handleActivate}
            disabled={loading}
            className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Complete Payment
          </button>
        )}

        {status === SubscriptionStatus.ACTIVE && (
          <>
            <button
              onClick={() => onNavigate('/subscription/plans')}
              className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition"
            >
              Upgrade Plan
            </button>
            <button
              onClick={handleCancel}
              disabled={loading}
              className="px-6 py-3 border border-red-300 text-red-700 rounded-xl font-semibold hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Cancel Subscription
            </button>
          </>
        )}

        {status === SubscriptionStatus.EXPIRED && (
          <button
            onClick={handleRenew}
            disabled={loading}
            className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Renew Subscription
          </button>
        )}

        {status === SubscriptionStatus.CANCELLED && (
          <button
            onClick={() => onNavigate('/subscription/plans')}
            className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition"
          >
            Subscribe to New Plan
          </button>
        )}
      </div>
    </div>
  );
}
