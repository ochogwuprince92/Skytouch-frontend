import { useEffect, useState } from 'react';
import { Building2, Loader2 } from 'lucide-react';
import { FormAlert } from '../../components/FormAlert';
import { LocationSelect } from '../../components/LocationSelect';
import { EnumSelect, INDUSTRY_OPTIONS } from '../../components/EnumSelect';
import { companyInitials } from '../../lib/format';
import { ApiError } from '../../lib/api';
import { getMyCompany, updateMyCompany } from '../../services/companyService';
import type { CompanyResponse } from '../../types/company';

export function EmployerCompanyPage() {
  const [company, setCompany] = useState<CompanyResponse | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [industry, setIndustry] = useState('');
  const [website, setWebsite] = useState('');
  const [addressState, setAddressState] = useState('');
  const [addressLga, setAddressLga] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void getMyCompany()
      .then((data) => {
        if (!cancelled) {
          setCompany(data);
          setName(data.name);
          setDescription(data.description ?? '');
          setIndustry(data.industry ?? '');
          setWebsite(data.website ?? '');
          setAddressState(data.addressState ?? '');
          setAddressLga(data.addressLga ?? '');
          setAddressLine(data.addressLine ?? '');
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err instanceof ApiError ? err.message : 'Failed to load company.',
          );
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const address =
        [addressLine.trim(), addressLga.trim(), addressState]
          .filter(Boolean)
          .join(', ') || undefined;
      const updated = await updateMyCompany({
        name: name.trim(),
        description: description.trim() || undefined,
        industry: industry.trim() || undefined,
        website: website.trim() || undefined,
        address,
      });
      setCompany(updated);
      setSuccess('Company profile updated.');
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Unable to save changes.',
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!company) {
    return <FormAlert message={error ?? 'No company found.'} />;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Company profile</h1>
        <p className="text-slate-500 mt-1">
          Status:{' '}
          <span
            className={`font-semibold ${
              company.status === 'ACTIVE'
                ? 'text-success'
                : company.status === 'PENDING'
                  ? 'text-warning'
                  : 'text-danger'
            }`}>
            {company.status}
          </span>
        </p>
      </div>

      {company.status === 'PENDING' && (
        <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-900">
          Awaiting admin approval before you can publish jobs.
        </div>
      )}

      {error && <FormAlert message={error} />}
      {success && <FormAlert message={success} variant="success" />}

      <form
        onSubmit={handleSave}
        className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-sm">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xl">
            {company.logoUrl ? (
              <img
                src={company.logoUrl}
                alt=""
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              companyInitials(company.name)
            )}
          </div>
          <Building2 className="text-slate-400" size={20} />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Company name
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Industry
          </label>
          <EnumSelect
            value={industry}
            onChange={setIndustry}
            options={INDUSTRY_OPTIONS}
            placeholder="Select industry"
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Website
          </label>
          <input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
          />
        </div>
        <LocationSelect
          stateValue={addressState}
          onStateChange={setAddressState}
        />
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            LGA
          </label>
          <input
            value={addressLga}
            onChange={(e) => setAddressLga(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Street address
          </label>
          <input
            value={addressLine}
            onChange={(e) => setAddressLine(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSaving || company.status === 'REJECTED'}
          className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold text-sm disabled:opacity-60">
          {isSaving ? 'Saving…' : 'Save changes'}
        </button>
      </form>
    </div>
  );
}
