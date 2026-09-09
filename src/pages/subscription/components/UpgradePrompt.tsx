import { ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import { PlanType } from '../../../types/subscription';

interface UpgradePromptProps {
  currentPlan: PlanType;
  onUpgrade: () => void;
}

export function UpgradePrompt({ currentPlan, onUpgrade }: UpgradePromptProps) {
  const getUpgradePlan = () => {
    switch (currentPlan) {
      case PlanType.BASIC:
        return PlanType.STANDARD;
      case PlanType.STANDARD:
        return PlanType.PREMIUM;
      case PlanType.PREMIUM:
        return null;
      default:
        return PlanType.STANDARD;
    }
  };

  const upgradePlan = getUpgradePlan();

  if (!upgradePlan) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 mb-8">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-1">Upgrade to {upgradePlan}</h3>
            <p className="text-slate-600 mb-3">
              You're running low on job slots. Upgrade to {upgradePlan} to get more slots and unlock additional features.
            </p>
            <button
              onClick={onUpgrade}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
            >
              Upgrade Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="hidden md:block">
          <TrendingUp className="w-8 h-8 text-primary/30" />
        </div>
      </div>
    </div>
  );
}
