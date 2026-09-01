export enum PlanType {
  FREE = 'FREE',
  BASIC = 'BASIC',
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM',
}

export enum BillingCycle {
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
}

export enum SubscriptionStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
}

export interface PlanResponse {
  plan: PlanType;
  name: string;
  description: string;
  price: number;
  billingCycle: BillingCycle;
  maxJobSlots: number;
  unlimited: boolean;
}

export interface SubscriptionResponse {
  id: string;
  companyId: string;
  plan: PlanType;
  status: SubscriptionStatus;
  startDate: string;
  expiresAt: string;
  billingCycle: BillingCycle;
  createdAt: string;
  updatedAt: string;
}

export interface UsageResponse {
  plan: PlanType;
  status: SubscriptionStatus;
  expiresAt: string;
  activeJobs: number;
  slotsAllocated: number;
  slotsUsed: number;
  remainingSlots: number | null;
  unlimited: boolean;
  canPublish: boolean;
}

export interface SubscribeRequest {
  plan: PlanType;
  billingCycle: BillingCycle;
}

export interface UpgradeRequest {
  plan: PlanType;
}

export interface ActivateRequest {
  paymentReference: string;
}
