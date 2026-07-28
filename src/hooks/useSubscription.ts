import { useState, useEffect, useCallback } from 'react';
import { subscriptionApi } from '../services/api';
import type { SubscriptionResponse, UsageResponse } from '../types/subscription';

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<SubscriptionResponse | null>(null);
  const [usage, setUsage] = useState<UsageResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await subscriptionApi.getCurrentSubscription();
      setSubscription(data);
    } catch (err) {
      // Treat any subscription fetch error as "no subscription" rather than an error
      // This handles both 404 (no subscription) and other errors gracefully
      setSubscription(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUsage = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await subscriptionApi.getUsage();
      setUsage(data);
    } catch (err) {
      // Treat any usage fetch error as "no usage data" rather than an error
      setUsage(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    await Promise.all([fetchSubscription(), fetchUsage()]);
  }, [fetchSubscription, fetchUsage]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    subscription,
    usage,
    loading,
    error,
    refresh,
    fetchSubscription,
    fetchUsage,
  };
};
