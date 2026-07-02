import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Upload } from 'lucide-react';
import { FormAlert } from '../../components/FormAlert';
import { StateSelect } from '../../components/StateSelect';
import { ApiError } from '../../lib/api';
import {
  completeOnboarding,
  getMyProfile,
  updateKyc,
} from '../../services/seekerService';
import type { Gender, JobSeekerResponse } from '../../types/seeker';

export function SeekerProfilePage() {
  const [profile, setProfile] = useState<JobSeekerResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [job, setJob] = useState('');
  const [qualification, setQualification] = useState('');
  const [about, setAbout] = useState('');
  const [openToWork, setOpenToWork] = useState(true);
  const [nin, setNin] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState<Gender | ''>('');
  const [addressState, setAddressState] = useState('');
  const [addressLga, setAddressLga] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);

  useEffect(() => {
    let cancelled = false;
    void getMyProfile()
      .then((data) => {
        if (!cancelled) {
          setProfile(data);
          setJob(data.job ?? '');
          setQualification(data.qualification ?? '');
          setAbout(data.about ?? '');
          setOpenToWork(data.openToWork ?? true);
          setNin(data.nin ?? '');
          setBirthday(data.birthday ?? '');
          setGender((data.gender as Gender) ?? '');
          setAddressState(data.addressState ?? '');
          setAddressLga(data.addressLga ?? '');
          setAddressLine(data.addressLine ?? '');
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(
            err instanceof ApiError ? err.message : 'Failed to load profile.',
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

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    try {
      let updated = profile;
      if (cvFile || job || qualification || about) {
        updated = await completeOnboarding({
          job: job.trim() || undefined,
          qualification: qualification.trim() || undefined,
          about: about.trim() || undefined,
          openToWork,
          cv: cvFile ?? undefined,
        });
      }
      updated = await updateKyc({
        nin: nin.trim() || undefined,
        birthday: birthday || undefined,
        gender: gender || undefined,
        addressState: addressState || undefined,
        addressLga: addressLga.trim() || undefined,
        addressLine: addressLine.trim() || undefined,
        address: [addressLine, addressLga, addressState]
          .filter(Boolean)
          .join(', ') || undefined,
      });
      setProfile(updated);
      setCvFile(null);
      setSuccess('Profile saved successfully.');
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Unable to save profile.',
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

  const displayName = profile
    ? [profile.firstName, profile.lastName].filter(Boolean).join(' ') ||
      profile.email
    : '';

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My profile</h1>
        <p className="text-slate-600 mt-1">{displayName}</p>
      </div>

      {error && <FormAlert message={error} />}
      {success && <FormAlert message={success} variant="success" />}

      <form
        onSubmit={handleSaveProfile}
        className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-sm">
        <h2 className="font-bold text-slate-900">Professional info</h2>
        <input
          value={job}
          onChange={(e) => setJob(e.target.value)}
          placeholder="Current / desired role"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
        />
        <input
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
          placeholder="Qualification"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
        />
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="About you"
          rows={3}
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm resize-none"
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={openToWork}
            onChange={(e) => setOpenToWork(e.target.checked)}
            className="rounded border-slate-300 text-primary"
          />
          Open to work
        </label>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            CV {profile?.cv && '(on file — upload to replace)'}
          </label>
          {profile?.cv && (
            <a
              href={profile.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline block mb-2">
              View current CV
            </a>
          )}
          <label className="flex items-center gap-2 px-4 py-3 border border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-primary text-sm text-slate-600">
            <Upload size={18} />
            {cvFile ? cvFile.name : 'Upload new CV (PDF/Word)'}
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
            />
          </label>
        </div>

        <h2 className="font-bold text-slate-900 pt-2">KYC & address</h2>
        <input
          value={nin}
          onChange={(e) => setNin(e.target.value)}
          placeholder="NIN"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
        />
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as Gender | '')}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm">
            <option value="">Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <StateSelect value={addressState} onChange={setAddressState} />
        <input
          value={addressLga}
          onChange={(e) => setAddressLga(e.target.value)}
          placeholder="LGA"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
        />
        <input
          value={addressLine}
          onChange={(e) => setAddressLine(e.target.value)}
          placeholder="Street address"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
        />

        <button
          type="submit"
          disabled={isSaving}
          className="w-full py-3 bg-primary text-white rounded-xl font-bold disabled:opacity-60">
          {isSaving ? 'Saving…' : 'Save profile'}
        </button>
      </form>

      <p className="text-sm text-slate-500 text-center">
        Account security →{' '}
        <Link to="/settings/account" className="text-primary font-semibold">
          Settings
        </Link>
      </p>
    </div>
  );
}
