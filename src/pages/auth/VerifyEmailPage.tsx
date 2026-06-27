import React, { useState, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { MailCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { authApi } from '../../services/api';

export function VerifyEmailPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      setServerError('Please enter all 6 digits.');
      return;
    }

    setIsLoading(true);
    setServerError(null);

    try {
      // POST /api/auth/verify-email
      await authApi.verifyEmail({ email, otp: code });
      // After email verified, redirect to login
      navigate('/auth/login');
    } catch (err: any) {
      setServerError(err.message || 'Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setResendMessage(null);
    setServerError(null);
    try {
      // POST /api/auth/verify-email/resend
      await authApi.resendVerification(email);
      setResendMessage('A new code has been sent to your email.');
    } catch (err: any) {
      setServerError(err.message || 'Failed to resend code.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-center">

      <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
        <MailCheck size={32} />
      </div>

      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        Check your email
      </h1>
      <p className="text-slate-600 mb-8">
        We sent a 6-digit verification code to <br />
        <span className="font-medium text-slate-900">{email || 'your email'}</span>
      </p>

      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="flex justify-center gap-2 sm:gap-3">
          {otp.map((digit, index) =>
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el; }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white" />
          )}
        </div>

        {serverError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-xl">
            {serverError}
          </p>
        )}

        {resendMessage && (
          <p className="text-sm text-green-600 bg-green-50 border border-green-200 p-3 rounded-xl">
            {resendMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-primary-600 text-white py-3 rounded-xl font-bold transition-all shadow-soft active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed">
          {isLoading ? 'Verifying...' : <> Verify Email <ArrowRight size={18} /> </>}
        </button>
      </form>

      <div className="mt-8 space-y-4">
        <p className="text-sm text-slate-600">
          Didn't receive the email?{' '}
          <button
            onClick={handleResend}
            disabled={isResending}
            className="font-bold text-primary hover:text-primary-600 transition-colors disabled:opacity-60">
            {isResending ? 'Resending...' : 'Click to resend'}
          </button>
        </p>

        <Link
          to="/auth/login"
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
          <ArrowLeft size={16} className="mr-1.5" /> Back to log in
        </Link>
      </div>
    </motion.div>);
}
