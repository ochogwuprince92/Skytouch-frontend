import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Mail,
  Lock,
  User,
  Briefcase,
  UserCircle2,
  ArrowRight } from
'lucide-react';
import { motion } from 'framer-motion';
export function RegisterPage() {
  const [searchParams] = useSearchParams();
  const initialRole =
  searchParams.get('role') === 'employer' ? 'employer' : 'seeker';
  const [role, setRole] = useState<'seeker' | 'employer'>(initialRole);
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
      }}>
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Create an account
        </h1>
        <p className="text-slate-600">
          Join Skytouch Jobs to find your next opportunity or hire top talent.
        </p>
      </div>

      {/* Role Selection */}
      <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
        <button
          onClick={() => setRole('seeker')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${role === 'seeker' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
          
          <UserCircle2
            size={18}
            className={role === 'seeker' ? 'text-primary' : ''} />
          
          I am a Job Seeker
        </button>
        <button
          onClick={() => setRole('employer')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${role === 'employer' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
          
          <Briefcase
            size={18}
            className={role === 'employer' ? 'text-primary' : ''} />
          
          I am an Employer
        </button>
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={18} className="text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="John Doe"
              required />
            
          </div>
        </div>

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

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-slate-400" />
            </div>
            <input
              type="password"
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="••••••••"
              required />
            
          </div>
          <p className="mt-1.5 text-xs text-slate-500">
            Must be at least 8 characters long.
          </p>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-primary-600 text-white py-3 rounded-xl font-bold transition-all shadow-soft active:scale-[0.98] mt-2">
          
          Create Account <ArrowRight size={18} />
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-slate-500">
        By signing up, you agree to our{' '}
        <a href="#" className="text-primary hover:underline">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="text-primary hover:underline">
          Privacy Policy
        </a>
        .
      </p>

      <p className="mt-8 text-center text-sm text-slate-600">
        Already have an account?{' '}
        <Link
          to="/auth/login"
          className="font-bold text-primary hover:text-primary-600 transition-colors">
          
          Sign in
        </Link>
      </p>
    </motion.div>);

}