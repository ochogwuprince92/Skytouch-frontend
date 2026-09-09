import { SubscriptionStatus } from '../../../types/subscription';

interface SubscriptionStatusBadgeProps {
  status: SubscriptionStatus;
}

export function SubscriptionStatusBadge({ status }: SubscriptionStatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case SubscriptionStatus.ACTIVE:
        return {
          label: 'Active',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          borderColor: 'border-green-200',
        };
      case SubscriptionStatus.PENDING:
        return {
          label: 'Pending',
          bgColor: 'bg-amber-100',
          textColor: 'text-amber-800',
          borderColor: 'border-amber-200',
        };
      case SubscriptionStatus.EXPIRED:
        return {
          label: 'Expired',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          borderColor: 'border-red-200',
        };
      case SubscriptionStatus.CANCELLED:
        return {
          label: 'Cancelled',
          bgColor: 'bg-slate-100',
          textColor: 'text-slate-800',
          borderColor: 'border-slate-200',
        };
      default:
        return {
          label: 'Unknown',
          bgColor: 'bg-slate-100',
          textColor: 'text-slate-800',
          borderColor: 'border-slate-200',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${config.bgColor} ${config.textColor} ${config.borderColor}`}>
      {config.label}
    </span>
  );
}
