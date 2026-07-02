import { CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AdminSubscriptionsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center mx-auto mb-4">
          <CreditCard size={28} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Subscriptions</h1>
        <p className="text-slate-600 mb-6">
          Billing and subscription management is not part of the current API
          contract. Use employer and jobs moderation tools for platform
          operations.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/admin/employers"
            className="text-sm font-semibold text-danger hover:underline">
            Review employers
          </Link>
          <span className="text-slate-300">·</span>
          <Link
            to="/admin/jobs"
            className="text-sm font-semibold text-danger hover:underline">
            Jobs moderation
          </Link>
        </div>
      </div>
    </div>
  );
}
