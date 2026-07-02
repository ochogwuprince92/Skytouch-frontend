import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Clock,
  DollarSign,
  Building2,
  BookmarkPlus,
  Share2,
  ArrowLeft,
  Loader2,
} from 'lucide-react';
import { FormAlert } from '../components/FormAlert';
import { useAuth } from '../context/AuthContext';
import { ApiError } from '../lib/api';
import {
  companyColor,
  companyInitials,
  formatEmploymentType,
  formatLocation,
  formatRelativeTime,
  formatSalary,
  formatWorkType,
} from '../lib/format';
import { getJob } from '../services/jobService';
import { applyToJob, getMyProfile } from '../services/seekerService';
import { saveJob, unsaveJob } from '../services/savedJobsService';
import type { JobDetail } from '../types/job';

export function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [job, setJob] = useState<JobDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [applyError, setApplyError] = useState<string | null>(null);
  const [applySuccess, setApplySuccess] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [hasCv, setHasCv] = useState<boolean | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getJob(id!);
        if (!cancelled) {
          setJob(data);
          setIsSaved(Boolean(data.saved));
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError ? err.message : 'Failed to load job.',
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'JOB_SEEKER') {
      setHasCv(null);
      return;
    }
    let cancelled = false;
    void getMyProfile()
      .then((profile) => {
        if (!cancelled) setHasCv(Boolean(profile.cv));
      })
      .catch(() => {
        if (!cancelled) setHasCv(false);
      });
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, user?.role]);

  const handleApply = async () => {
    if (!job) return;
    setApplyError(null);
    setApplySuccess(false);

    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/jobs/${job.id}` } });
      return;
    }

    if (user?.role !== 'JOB_SEEKER') {
      setApplyError('Only job seekers can apply to jobs.');
      return;
    }

    if (hasCv === false) {
      setApplyError('Upload your CV before applying.');
      return;
    }

    setIsApplying(true);
    try {
      await applyToJob(job.id, {
        coverLetter: coverLetter.trim() || undefined,
      });
      setApplySuccess(true);
    } catch (err) {
      setApplyError(
        err instanceof ApiError ? err.message : 'Unable to submit application.',
      );
    } finally {
      setIsApplying(false);
    }
  };

  const handleToggleSave = async () => {
    if (!job || user?.role !== 'JOB_SEEKER') return;
    setIsSaving(true);
    try {
      if (isSaved) {
        await unsaveJob(job.id);
        setIsSaved(false);
      } else {
        await saveJob(job.id);
        setIsSaved(true);
      }
    } catch {
      /* ignore */
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="pt-24 pb-20 min-h-screen max-w-2xl mx-auto px-4">
        <FormAlert message={error ?? 'Job not found.'} />
        <Link to="/jobs" className="mt-6 inline-block text-primary font-semibold">
          ← Back to jobs
        </Link>
      </div>
    );
  }

  const color = companyColor(job.companyName);
  const logo = companyInitials(job.companyName);

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/jobs"
          className="inline-flex items-center text-slate-500 hover:text-primary font-medium mb-6 transition-colors">
          <ArrowLeft size={16} className="mr-2" />
          Back to jobs
        </Link>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-6">
              <div
                className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shrink-0 ${color}`}>
                {logo}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                  {job.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-slate-600 mb-4">
                  <div className="flex items-center font-medium text-primary">
                    <Building2 size={18} className="mr-1.5" />
                    {job.companyName}
                  </div>
                  <div className="flex items-center">
                    <MapPin size={18} className="mr-1.5 text-slate-400" />
                    {formatLocation(job.locationState, job.locationLga)} (
                    {formatWorkType(job.workMode)})
                  </div>
                  <div className="flex items-center">
                    <Clock size={18} className="mr-1.5 text-slate-400" />
                    Posted {formatRelativeTime(job.publishedAt ?? job.createdAt)}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 min-w-[200px]">
              {applySuccess ? (
                <div className="rounded-xl bg-success/10 text-success px-4 py-3 text-sm font-semibold text-center">
                  Application submitted!
                </div>
              ) : hasCv === false && isAuthenticated && user?.role === 'JOB_SEEKER' ? (
                <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-center">
                  <p className="text-amber-900 font-medium mb-2">
                    Upload your CV to apply
                  </p>
                  <Link
                    to="/seeker/onboarding"
                    className="text-primary font-semibold hover:underline">
                    Complete profile →
                  </Link>
                </div>
              ) : (
                <>
                  {isAuthenticated && user?.role === 'JOB_SEEKER' && (
                    <textarea
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      rows={3}
                      placeholder="Add a short cover letter (optional)"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm resize-none"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => void handleApply()}
                    disabled={isApplying || (user?.role === 'JOB_SEEKER' && hasCv === null)}
                    className="w-full bg-primary hover:bg-primary-600 disabled:opacity-60 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-soft">
                    {isApplying ? 'Applying…' : 'Apply now'}
                  </button>
                </>
              )}
              {applyError && (
                <p className="text-sm text-danger text-center">{applyError}</p>
              )}
              <div className="flex gap-3">
                {isAuthenticated && user?.role === 'JOB_SEEKER' && (
                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={() => void handleToggleSave()}
                    className={`flex-1 border px-4 py-2.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                      isSaved
                        ? 'bg-primary-50 border-primary text-primary'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}>
                    <BookmarkPlus size={18} />
                    {isSaved ? 'Saved' : 'Save'}
                  </button>
                )}
                <button
                  type="button"
                  className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2">
                  <Share2 size={18} />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                About the role
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 whitespace-pre-wrap">
                {job.description}
              </div>
              {job.requirements && (
                <>
                  <h3 className="text-lg font-bold text-slate-900 mt-8 mb-4">
                    Requirements
                  </h3>
                  <div className="text-slate-600 whitespace-pre-wrap">
                    {job.requirements}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="lg:w-1/3 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Job overview
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary shrink-0">
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Salary</p>
                    <p className="text-slate-900 font-semibold">
                      {formatSalary(
                        job.salaryMin,
                        job.salaryMax,
                        job.salaryCurrency,
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Location</p>
                    <p className="text-slate-900 font-semibold">
                      {formatLocation(job.locationState, job.locationLga)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Job type</p>
                    <p className="text-slate-900 font-semibold">
                      {formatEmploymentType(job.employmentType)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl ${color}`}>
                  {logo}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {job.companyName}
                  </h3>
                  <Link
                    to={`/companies/${job.companyId}`}
                    className="text-sm text-primary hover:underline">
                    View company profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
