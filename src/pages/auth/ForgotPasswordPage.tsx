import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
export function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  if (isSubmitted) {
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
        
        <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-success">
          <Mail size={32} />
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Check your email
        </h1>
        <p className="text-slate-600 mb-8">
          We've sent password reset instructions to your email address.
        </p>

        <button
          onClick={() => setIsSubmitted(false)}
          className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-primary-600 text-white py-3 rounded-xl font-bold transition-all shadow-soft active:scale-[0.98] mb-6">
          
          Open Email App
        </button>

        <p className="text-sm text-slate-600 mb-6">
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
      </motion.div>);

  }
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
        <KeyRound size={32} />
      </div>

      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        Forgot password?
      </h1>
      <p className="text-slate-600 mb-8">
        No worries, we'll send you reset instructions.
      </p>

      <form
        className="space-y-6 text-left"
        onSubmit={(e) => {
          e.preventDefault();
          setIsSubmitted(true);
        }}>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-slate-400" />
            </div>
            <input
              type="email"
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="you@example.com"
              required />
            
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-primary-600 text-white py-3 rounded-xl font-bold transition-all shadow-soft active:scale-[0.98]">
          
          Reset Password <ArrowRight size={18} />
        </button>
      </form>

      <div className="mt-8">
        <Link
          to="/auth/login"
          className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
          
          <ArrowLeft size={16} className="mr-1.5" /> Back to log in
        </Link>
      </div>
    </motion.div>);

}