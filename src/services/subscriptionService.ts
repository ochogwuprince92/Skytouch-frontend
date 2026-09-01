import { subscriptionApi } from './api';
import type { UsageResponse, PlanResponse, SubscriptionResponse, SubscribeRequest, UpgradeRequest, ActivateRequest } from '../types/subscription';

export async function getSubscriptionUsage(): Promise<UsageResponse> {
  return subscriptionApi.getUsage();
}

export async function getCurrentSubscription(): Promise<SubscriptionResponse> {
  return subscriptionApi.getCurrentSubscription();
}

export async function getAvailablePlans(): Promise<PlanResponse[]> {
  return subscriptionApi.getPlans();
}

export async function subscribe(request: SubscribeRequest): Promise<SubscriptionResponse> {
  return subscriptionApi.subscribe(request);
}

export async function activateSubscription(request: ActivateRequest): Promise<SubscriptionResponse> {
  return subscriptionApi.activate(request);
}

export async function upgradeSubscription(request: UpgradeRequest): Promise<SubscriptionResponse> {
  return subscriptionApi.upgrade(request);
}

export async function cancelSubscription(): Promise<SubscriptionResponse> {
  return subscriptionApi.cancel();
}
