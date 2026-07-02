import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

type FormAlertVariant = 'error' | 'success' | 'info';

interface FormAlertProps {
  variant?: FormAlertVariant;
  message: string;
  action?: React.ReactNode;
}

const styles: Record<FormAlertVariant, string> = {
  error: 'bg-red-50 text-red-800 border-red-200',
  success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
};

export function FormAlert({
  variant = 'error',
  message,
  action,
}: FormAlertProps) {
  const Icon = variant === 'success' ? CheckCircle2 : AlertCircle;

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${styles[variant]}`}
      role="alert">
      <Icon size={18} className="mt-0.5 shrink-0" />
      <div className="flex-1">
        <p>{message}</p>
        {action && <div className="mt-2">{action}</div>}
      </div>
    </div>
  );
}
