import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { FormAlert } from '../../components/FormAlert';
import { useAuth } from '../../context/AuthContext';
import { ApiError } from '../../lib/api';
import { dashboardPathForRole } from '../../lib/roleRoutes';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success] = useState<string | null>(
    (location.state as { message?: string } | null)?.message ?? null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from =
    (location.state as { from?: string } | null)?.from ??
    undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await login(email.trim(), password);
      const dashboard = from ?? dashboardPathForRole(response.role);
      navigate(dashboard, { replace: true });
    } catch (err) {
      if (err instanceof ApiError) {
        const message = err.message.toLowerCase();
        if (message.includes('not verified') || message.includes('verify')) {
          setError('Email not verified. Please verify your email to continue.');
        } else if (message.includes('suspended')) {
          setError(
            'Your account is suspended. Please contact support for assistance.',
          );
        } else if (err.status === 401) {
          setError('Invalid email or password.');
        } else {
          setError(err.message);
        }
      } else {
        setError('Unable to sign in. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const showVerifyLink =
    error?.toLowerCase().includes('not verified') ?? false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h1>
        <p className="text-slate-600">
          Enter your details to access your account.
        </p>
      </div>

      {success && (
        <div className="mb-5">
          <FormAlert variant="success" message={success} />
        </div>
      )}

      {error && (
        <div className="mb-5">
          <FormAlert
            message={error}
            action={
              showVerifyLink ? (
                <Link
                  to={`/verify-email?email=${encodeURIComponent(email.trim())}`}
                  className="font-semibold underline hover:no-underline">
                  Verify your email
                </Link>
              ) : undefined
            }
          />
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
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

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-primary hover:text-primary-600 transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-slate-400" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold transition-all shadow-soft active:scale-[0.98]">
          {isSubmitting ? 'Signing in…' : 'Sign in'} <ArrowRight size={18} />
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-600">
        Don&apos;t have an account?{' '}
        <Link
          to="/register"
          className="font-bold text-primary hover:text-primary-600 transition-colors">
          Sign up
        </Link>
      </p>
    </motion.div>
  );
}
