import { useEffect, useState } from 'react';
import { Check, Loader2, X } from 'lucide-react';
import { FormAlert } from '../FormAlert';
import { ApiError } from '../../lib/api';
import { formatDate, formatRelativeTime, formatSalary } from '../../lib/format';
import {
  acceptOffer,
  declineOffer,
  extendOffer,
  listApplicationOffers,
} from '../../services/workflowService';
import type { OfferResponse } from '../../types/offer';

interface ApplicationOffersTabProps {
  applicationId: string;
  isEmployer: boolean;
}

export function ApplicationOffersTab({
  applicationId,
  isEmployer,
}: ApplicationOffersTabProps) {
  const [offers, setOffers] = useState<OfferResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [salaryAmount, setSalaryAmount] = useState('');
  const [salaryCurrency, setSalaryCurrency] = useState('NGN');
  const [startDate, setStartDate] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [terms, setTerms] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);

  const load = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await listApplicationOffers(applicationId);
      setOffers(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to load offers.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, [applicationId]);

  const handleExtend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await extendOffer(applicationId, {
        salaryAmount: Number(salaryAmount),
        salaryCurrency,
        startDate,
        expiresAt,
        terms: terms.trim() || undefined,
      });
      setShowForm(false);
      await load();
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Unable to extend offer.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAccept = async (id: string) => {
    setActionId(id);
    setError(null);
    try {
      await acceptOffer(id);
      await load();
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Unable to accept offer.',
      );
    } finally {
      setActionId(null);
    }
  };

  const handleDecline = async (id: string) => {
    setActionId(id);
    setError(null);
    try {
      await declineOffer(id);
      await load();
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Unable to decline offer.',
      );
    } finally {
      setActionId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && <FormAlert message={error} />}

      {isEmployer && (
        <div>
          {!showForm ? (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="text-sm font-semibold text-primary hover:underline">
              + Extend offer
            </button>
          ) : (
            <form
              onSubmit={handleExtend}
              className="rounded-xl border border-slate-200 p-4 space-y-3 bg-slate-50">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Salary amount
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={salaryAmount}
                    onChange={(e) => setSalaryAmount(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Currency
                  </label>
                  <input
                    type="text"
                    value={salaryCurrency}
                    onChange={(e) => setSalaryCurrency(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Start date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Expires at
                  </label>
                  <input
                    type="datetime-local"
                    value={expiresAt}
                    onChange={(e) => setExpiresAt(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  />
                </div>
              </div>
              <textarea
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                placeholder="Terms (optional)"
                rows={2}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm resize-none"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold disabled:opacity-60">
                  {isSubmitting ? 'Sending…' : 'Send offer'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-slate-600 text-sm">
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {offers.length === 0 ? (
        <p className="text-sm text-slate-500 py-8 text-center">
          No offers yet.
        </p>
      ) : (
        <div className="space-y-3">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="rounded-xl border border-slate-200 p-4 bg-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-bold text-slate-900 text-lg">
                    {formatSalary(
                      offer.salaryAmount,
                      offer.salaryAmount,
                      offer.salaryCurrency,
                    )}
                  </p>
                  <p className="text-sm text-slate-600 mt-1">
                    Start {formatDate(offer.startDate)} · Expires{' '}
                    {formatDate(offer.expiresAt)}
                  </p>
                  {offer.terms && (
                    <p className="text-sm text-slate-500 mt-2">{offer.terms}</p>
                  )}
                  <p className="text-xs text-slate-400 mt-2">
                    Offered {formatRelativeTime(offer.offeredAt)}
                  </p>
                </div>
                <div className="text-right shrink-0 space-y-2">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${
                      offer.status === 'PENDING'
                        ? 'bg-amber-100 text-amber-800'
                        : offer.status === 'ACCEPTED'
                          ? 'bg-success/10 text-success'
                          : 'bg-slate-100 text-slate-600'
                    }`}>
                    {offer.status}
                  </span>
                  {!isEmployer && offer.status === 'PENDING' && (
                    <div className="flex gap-2 justify-end">
                      <button
                        type="button"
                        disabled={actionId === offer.id}
                        onClick={() => void handleAccept(offer.id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-success text-white rounded-lg text-xs font-bold disabled:opacity-60">
                        <Check size={14} /> Accept
                      </button>
                      <button
                        type="button"
                        disabled={actionId === offer.id}
                        onClick={() => void handleDecline(offer.id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-slate-200 text-slate-700 rounded-lg text-xs font-bold disabled:opacity-60">
                        <X size={14} /> Decline
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
