import React, { useState, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function OtpVerificationPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const navigate = useNavigate();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setServerError(null);

    const code = otp.join('');
    if (code.length < 6) {
      setValidationError('Please enter all 6 digits of the reset code.');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate verification delay for UX
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsSuccess(true);
      // After collecting OTP, redirect to reset password page with OTP
      setTimeout(() => {
        navigate(`/reset-password?email=${encodeURIComponent(email)}&otp=${code}`);
      }, 1000);
    } catch (err: any) {
      setServerError(err.message || 'Invalid or expired code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center">

        <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-success">
          <CheckCircle2 size={32} />
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Code verified!
        </h1>
        <p className="text-slate-600 mb-8">
          Redirecting to reset password...
        </p>
      </motion.div>);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Verify your email
        </h1>
        <p className="text-slate-600">
          Enter the 6-digit code sent to <span className="font-medium text-slate-900">{email}</span>
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>

        {/* OTP inputs */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Verification Code
          </label>
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
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                className="w-12 h-14 text-center text-2xl font-bold border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-white" />
            )}
          </div>
        </div>

        {validationError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-xl">
            {validationError}
          </p>
        )}

        {serverError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-xl">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-primary-600 text-white py-3 rounded-xl font-bold transition-all shadow-soft active:scale-[0.98] mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
          {isLoading ? 'Verifying...' : <> Verify Code <ArrowRight size={18} /> </>}
        </button>
      </form>

      <div className="mt-8">
        <Link
          to="/forgot-password"
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
          <ArrowLeft size={16} className="mr-1.5" /> Back to forgot password
        </Link>
      </div>
    </motion.div>);
}
