export interface PaymentInitializeRequest {
  email: string;
  amount: number;
  currency: string;
  reference?: string;
  callbackUrl: string;
  metadata?: Record<string, string>;
}

export interface PaymentInitializeResponse {
  status: boolean;
  message: string;
  data: PaymentData;
}

export interface PaymentData {
  authorizationUrl: string;
  accessCode: string;
  reference: string;
}

export interface PaymentVerifyResponse {
  status: boolean;
  message: string;
  data: PaymentVerifyData;
}

export interface PaymentVerifyData {
  reference: string;
  gatewayResponse: string;
  paidAt: string;
  createdAt: string;
  channel: string;
  currency: string;
  amount: string;
  metadata: Record<string, any>;
  customer: Customer;
  authorization: Authorization;
}

export interface Customer {
  email: string;
  customerCode: string;
}

export interface Authorization {
  authorizationCode: string;
  bin: string;
  last4: string;
  expMonth: string;
  expYear: string;
  cardType: string;
  bank: string;
}
