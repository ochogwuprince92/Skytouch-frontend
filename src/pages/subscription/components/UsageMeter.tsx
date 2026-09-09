import type { UsageResponse } from '../../../types/subscription';
import { TrendingUp, AlertCircle } from 'lucide-react';

interface UsageMeterProps {
  usage: UsageResponse;
}

export function UsageMeter({ usage }: UsageMeterProps) {
  const getTotalSlots = () => {
    if (usage.unlimited) return Infinity;
    if (usage.remainingSlots === null) return usage.activeJobs;
    return usage.activeJobs + usage.remainingSlots;
  };

  const getUsagePercentage = () => {
    if (usage.unlimited) return 0;
    if (usage.remainingSlots === null) return 100;
    const total = usage.activeJobs + usage.remainingSlots;
    return total > 0 ? (usage.activeJobs / total) * 100 : 0;
  };

  const getUsageColor = () => {
    const percentage = getUsagePercentage();
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-amber-500';
    return 'bg-green-500';
  };

  const getUsageStatus = () => {
    if (usage.unlimited) {
      return {
        icon: <TrendingUp className="w-5 h-5 text-green-600" />,
        text: 'Unlimited',
        color: 'text-green-600',
      };
    }
    if (usage.remainingSlots === 0) {
      return {
        icon: <AlertCircle className="w-5 h-5 text-red-600" />,
        text: 'Limit Reached',
        color: 'text-red-600',
      };
    }
    if (usage.remainingSlots !== null && usage.remainingSlots <= 3 && usage.remainingSlots > 0) {
      return {
        icon: <AlertCircle className="w-5 h-5 text-amber-600" />,
        text: 'Near Limit',
        color: 'text-amber-600',
      };
    }
    return {
      icon: <TrendingUp className="w-5 h-5 text-green-600" />,
      text: 'Healthy',
      color: 'text-green-600',
    };
  };

  const status = getUsageStatus();
  const percentage = getUsagePercentage();

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <div className="bg-slate-50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {status.icon}
            <div>
              <p className="text-sm text-slate-600">Usage Status</p>
              <p className={`font-semibold ${status.color}`}>{status.text}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-600">Can Publish</p>
            <p className={`font-semibold ${usage.canPublish ? 'text-green-600' : 'text-red-600'}`}>
              {usage.canPublish ? 'Yes' : 'No'}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        {!usage.unlimited && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Job Slots Used</span>
              <span className="font-semibold text-slate-900">
                {usage.activeJobs} / {getTotalSlots() === Infinity ? '∞' : getTotalSlots()}
              </span>
            </div>
            <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${getUsageColor()} transition-all duration-500 ease-out`}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-sm text-slate-600">
              {usage.remainingSlots !== null ? (
                <>
                  {usage.remainingSlots} slot{usage.remainingSlots !== 1 ? 's' : ''} remaining
                </>
              ) : (
                'No slots available'
              )}
            </p>
          </div>
        )}

        {usage.unlimited && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-medium">Unlimited job slots available</p>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-slate-900">{usage.activeJobs}</p>
          <p className="text-sm text-slate-600">Active Jobs</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-slate-900">
            {usage.unlimited ? '∞' : usage.remainingSlots ?? 0}
          </p>
          <p className="text-sm text-slate-600">Remaining Slots</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-slate-900 capitalize">{usage.plan}</p>
          <p className="text-sm text-slate-600">Current Plan</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-slate-900">
            {getTotalSlots() === Infinity ? '∞' : getTotalSlots()}
          </p>
          <p className="text-sm text-slate-600">Total Slots</p>
        </div>
      </div>
    </div>
  );
}
