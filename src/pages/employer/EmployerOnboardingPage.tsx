import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Globe, ArrowRight, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { FormAlert } from '../../components/FormAlert';
import { LocationSelect } from '../../components/LocationSelect';
import { ApiError } from '../../lib/api';
import { createCompany } from '../../services/companyService';

export function EmployerOnboardingPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [website, setWebsite] = useState('');
  const [addressState, setAddressState] = useState('');
  const [addressLga, setAddressLga] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Company name is required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const address =
        [addressLine.trim(), addressLga.trim(), addressState]
          .filter(Boolean)
          .join(', ') || undefined;

      // createCompany() returning successfully (201, with the created
      // company's id in the body) IS the success signal — no need to
      // re-fetch the employer profile here just to confirm it. The
      // EmployerOnboardingGuard already re-verifies on the next route
      // (via its own fresh, path-scoped check) before granting access
      // to anything under /employer/*.
      console.log('[ONBOARDING] calling createCompany...');
      await createCompany({
        name: name.trim(),
        industry: industry.trim() || undefined,
        website: website.trim() || undefined,
        address,
        description: description.trim() || undefined,
      });
      console.log('[ONBOARDING] createCompany resolved successfully, about to navigate');

      navigate('/employer/dashboard', { replace: true });
      console.log('[ONBOARDING] navigate() call has been made');
    } catch (err) {
      console.log('[ONBOARDING] caught error:', err);
      setError(
        err instanceof ApiError
          ? err.message
          : 'Unable to create your company. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
        <div className="bg-slate-900 px-6 sm:px-8 py-8 text-white">
          <p className="text-slate-400 text-sm font-semibold uppercase tracking-wide mb-2">
            Company setup
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Create your company
          </h1>
          <p className="text-slate-300">
            Set up your company profile before posting your first role.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          {error && <FormAlert message={error} />}

          <div className="rounded-xl bg-primary-50/50 border border-primary-100 p-4 flex gap-3">
            <Info size={20} className="text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-slate-600">
              New companies start as <strong>Pending</strong> and must be
              approved by an admin before you can publish jobs.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Company name
            </label>
            <div className="relative">
              <Building2
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Industry{' '}
              <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g. Fintech"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>

          <LocationSelect
            stateValue={addressState}
            onStateChange={setAddressState}
            stateLabel="State (optional)"
            countryLabel="Country (optional)"
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                LGA{' '}
                <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={addressLga}
                onChange={(e) => setAddressLga(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Street{' '}
                <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                placeholder="e.g. 1 Marina Road"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Website{' '}
              <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <div className="relative">
              <Globe
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Company description{' '}
              <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-primary-600 disabled:opacity-60 text-white py-3 rounded-xl font-bold transition-all shadow-soft">
            {isSubmitting ? 'Creating…' : 'Create company'}{' '}
            <ArrowRight size={18} />
          </button>
        </form>
      </motion.div>
    </div>
  );
}