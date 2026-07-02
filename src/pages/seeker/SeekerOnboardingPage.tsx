import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  MapPin,
  User,
  FileText,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { FormAlert } from '../../components/FormAlert';
import { ApiError } from '../../lib/api';
import { completeOnboarding } from '../../services/seekerService';

const ACCEPTED_CV_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export function SeekerOnboardingPage() {
  const navigate = useNavigate();
  const [job, setJob] = useState('');
  const [qualification, setQualification] = useState('');
  const [about, setAbout] = useState('');
  const [openToWork, setOpenToWork] = useState(true);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_CV_TYPES.includes(file.type)) {
      setError('Please upload a PDF or Word document.');
      setCvFile(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('CV file must be smaller than 5 MB.');
      setCvFile(null);
      return;
    }

    setError(null);
    setCvFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!cvFile) {
      setError('Please upload your CV to continue.');
      return;
    }

    setIsSubmitting(true);
    try {
      await completeOnboarding({
        job: job.trim() || undefined,
        qualification: qualification.trim() || undefined,
        about: about.trim() || undefined,
        openToWork,
        cv: cvFile,
      });
      navigate('/seeker/dashboard', { replace: true });
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Unable to complete onboarding. Please try again.');
      }
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
        <div className="bg-primary-900 px-6 sm:px-8 py-8 text-white">
          <p className="text-primary-200 text-sm font-semibold uppercase tracking-wide mb-2">
            Step 1 of 1
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Complete your profile
          </h1>
          <p className="text-primary-100">
            Add a headline, location, and upload your CV so employers can find
            you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {error && <FormAlert message={error} />}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Current / desired role{' '}
              <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-slate-400" />
              </div>
              <input
                type="text"
                value={job}
                onChange={(e) => setJob(e.target.value)}
                placeholder="e.g. Senior Software Engineer"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Highest qualification{' '}
              <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin size={18} className="text-slate-400" />
              </div>
              <input
                type="text"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                placeholder="e.g. BSc Computer Science"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              About you{' '}
              <span className="text-slate-400 font-normal">(optional)</span>
            </label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={4}
              placeholder="Tell employers a bit about your experience and goals…"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
            />
          </div>

          <label className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 cursor-pointer">
            <input
              type="checkbox"
              checked={openToWork}
              onChange={(e) => setOpenToWork(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium text-slate-700">
              I'm open to work — show my profile to employers
            </span>
          </label>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Upload CV
            </label>
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-primary hover:bg-primary-50/30 transition-colors">
              <input
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="hidden"
                onChange={handleFileChange}
              />
              {cvFile ? (
                <div className="flex flex-col items-center text-center px-4">
                  <CheckCircle2 size={32} className="text-success mb-2" />
                  <p className="font-semibold text-slate-900">{cvFile.name}</p>
                  <p className="text-sm text-slate-500 mt-1">
                    {(cvFile.size / 1024).toFixed(0)} KB — click to replace
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center px-4">
                  <Upload size={32} className="text-slate-400 mb-2" />
                  <p className="font-semibold text-slate-700">
                    Click to upload your CV
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    PDF or Word, max 5 MB
                  </p>
                </div>
              )}
            </label>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 flex gap-3">
            <FileText size={20} className="text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-slate-600">
              Your CV is stored securely and shared with employers only when you
              apply to their jobs.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-primary-600 disabled:opacity-60 text-white py-3 rounded-xl font-bold transition-all shadow-soft">
            {isSubmitting ? 'Saving…' : 'Complete setup'}{' '}
            <ArrowRight size={18} />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
