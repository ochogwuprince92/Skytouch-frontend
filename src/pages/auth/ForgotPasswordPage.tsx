import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { KeyRound, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { FormAlert } from '../../components/FormAlert';
import { ApiError } from '../../lib/api';
import { forgotPassword } from '../../services/authService';

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await forgotPassword({ email: email.trim() });
      setIsSubmitted(true);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Unable to send reset instructions. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center">
        <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-success">
          <Mail size={32} />
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Check your email
        </h1>
        <p className="text-slate-600 mb-8">
          We&apos;ve sent a 6-digit reset code to{' '}
          <span className="font-medium text-slate-900">{email}</span>.
        </p>

        <button
          type="button"
          onClick={() =>
            navigate(
              `/reset-password?email=${encodeURIComponent(email.trim())}`,
            )
          }
          className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-primary-600 text-white py-3 rounded-xl font-bold transition-all shadow-soft active:scale-[0.98] mb-6">
          Enter reset code <ArrowRight size={18} />
        </button>

        <Link
          to="/login"
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
          <ArrowLeft size={16} className="mr-1.5" /> Back to log in
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-center">
      <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
        <KeyRound size={32} />
      </div>

      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        Forgot password?
      </h1>
      <p className="text-slate-600 mb-8">
        No worries, we&apos;ll send you a reset code.
      </p>

      {error && (
        <div className="mb-5 text-left">
          <FormAlert message={error} />
        </div>
      )}

      <form className="space-y-6 text-left" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Email address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-slate-400" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="you@example.com"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold transition-all shadow-soft active:scale-[0.98]">
          {isSubmitting ? 'Sending…' : 'Send reset code'} <ArrowRight size={18} />
        </button>
      </form>

      <div className="mt-8">
        <Link
          to="/login"
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
          <ArrowLeft size={16} className="mr-1.5" /> Back to log in
        </Link>
      </div>
    </motion.div>
  );
}
