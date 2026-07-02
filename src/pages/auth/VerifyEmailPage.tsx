import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { MailCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { FormAlert } from '../../components/FormAlert';
import { ApiError } from '../../lib/api';
import {
  resendVerificationEmail,
  verifyEmail,
} from '../../services/authService';

const RESEND_COOLDOWN_SECONDS = 60;

export function VerifyEmailPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') ?? '';
  const justRegistered = searchParams.get('registered') === '1';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(
    justRegistered ? 'Check your email for a 6-digit code.' : null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [shake, setShake] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setInterval(() => {
      setCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [cooldown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const digit = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const digits = pasted.split('');
    const newOtp = [...otp];
    digits.forEach((digit, i) => {
      newOtp[i] = digit;
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(digits.length, 5)]?.focus();
  };

  const triggerShake = useCallback(() => {
    setShake(true);
    window.setTimeout(() => setShake(false), 500);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email) {
      setError('Missing email address. Please register again.');
      return;
    }

    const code = otp.join('');
    if (code.length !== 6) {
      setError('Please enter the full 6-digit code.');
      return;
    }

    setIsSubmitting(true);
    try {
      await verifyEmail(email, { otp: code });
      navigate('/login', {
        replace: true,
        state: { message: 'Email verified. You can now sign in.' },
      });
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setError('Invalid code. Please try again.');
        triggerShake();
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      } else if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Unable to verify email. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!email || cooldown > 0 || isResending) return;

    setError(null);
    setIsResending(true);
    try {
      await resendVerificationEmail({ email });
      setSuccess('A new verification code has been sent.');
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Unable to resend code. Please try again.');
      }
    } finally {
      setIsResending(false);
    }
  };

  if (!email) {
    return (
      <div className="text-center">
        <FormAlert message="No email address provided." />
        <Link
          to="/register"
          className="mt-6 inline-flex items-center text-sm font-medium text-primary hover:text-primary-600">
          Back to registration
        </Link>
      </div>
    );
  }

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
        <span className="font-medium text-slate-900">{email}</span>
      </p>

      {success && (
        <div className="mb-5">
          <FormAlert variant="success" message={success} />
        </div>
      )}
      {error && (
        <div className="mb-5">
          <FormAlert message={error} />
        </div>
      )}

      <form className="space-y-8" onSubmit={handleSubmit}>
        <motion.div
          animate={shake ? { x: [0, -8, 8, -8, 8, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center gap-2 sm:gap-3"
          onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white"
            />
          ))}
        </motion.div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold transition-all shadow-soft active:scale-[0.98]">
          {isSubmitting ? 'Verifying…' : 'Verify email'} <ArrowRight size={18} />
        </button>
      </form>

      <div className="mt-8 space-y-4">
        <p className="text-sm text-slate-600">
          Didn&apos;t receive the email?{' '}
          <button
            type="button"
            onClick={handleResend}
            disabled={cooldown > 0 || isResending}
            className="font-bold text-primary hover:text-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {cooldown > 0
              ? `Resend in ${cooldown}s`
              : isResending
                ? 'Sending…'
                : 'Click to resend'}
          </button>
        </p>

        <Link
          to="/login"
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
          <ArrowLeft size={16} className="mr-1.5" /> Back to log in
        </Link>
      </div>
    </motion.div>
  );
}
