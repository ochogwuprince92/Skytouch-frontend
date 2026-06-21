import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MailCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
export function VerifyEmailPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleKeyDown = (
  index: number,
  e: React.KeyboardEvent<HTMLInputElement>) =>
  {
    // Move to previous input on backspace if current is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.4
      }}
      className="text-center">
      
      <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
        <MailCheck size={32} />
      </div>

      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        Check your email
      </h1>
      <p className="text-slate-600 mb-8">
        We sent a 6-digit verification code to <br />
        <span className="font-medium text-slate-900">you@example.com</span>
      </p>

      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        <div className="flex justify-center gap-2 sm:gap-3">
          {otp.map((digit, index) =>
          <input
            key={index}
            ref={(el) => inputRefs.current[index] = el}
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

        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-primary-600 text-white py-3 rounded-xl font-bold transition-all shadow-soft active:scale-[0.98]">
          
          Verify Email <ArrowRight size={18} />
        </button>
      </form>

      <div className="mt-8 space-y-4">
        <p className="text-sm text-slate-600">
          Didn't receive the email?{' '}
          <button className="font-bold text-primary hover:text-primary-600 transition-colors">
            Click to resend
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