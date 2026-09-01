import { apiRequest } from '../lib/api';

export interface PaymentInitializeRequest {
  email: string;
  amount: number;
  currency: string;
  reference?: string;
  callbackUrl?: string;
  metadata?: Record<string, string>;
}

export interface PaymentInitializeResponse {
  status: boolean;
  message: string;
  data: {
    authorizationUrl: string;
    accessCode: string;
    reference: string;
  } | null;
}

export interface PaymentVerifyResponse {
  status: boolean;
  message: string;
  data: {
    reference: string;
    gatewayResponse: string;
    paidAt: string | null;
    createdAt: string | null;
    channel: string;
    currency: string;
    amount: string;
    metadata: Record<string, any>;
    customer: {
      email: string;
      customerCode: string;
    } | null;
    authorization: {
      authorizationCode: string;
      bin: string;
      last4: string;
      expMonth: string;
      expYear: string;
      cardType: string;
      bank: string;
    } | null;
  } | null;
}

export function initializePayment(request: PaymentInitializeRequest): Promise<PaymentInitializeResponse> {
  return apiRequest<PaymentInitializeResponse>('/api/v1/payments/initialize', {
    method: 'POST',
    body: JSON.stringify(request),
  });
}

export function verifyPayment(reference: string): Promise<PaymentVerifyResponse> {
  return apiRequest<PaymentVerifyResponse>(`/api/v1/payments/verify/${reference}`, {
    method: 'GET',
  });
}
