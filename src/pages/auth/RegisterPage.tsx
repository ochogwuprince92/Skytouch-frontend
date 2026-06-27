import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  User,
  Briefcase,
  UserCircle2,
  ArrowRight,
  Eye,
  EyeOff } from
'lucide-react';
import { motion } from 'framer-motion';
import { authApi } from '../../services/api';
type SeekerForm = {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
};
type SeekerErrors = Partial<Record<keyof SeekerForm, string>>;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Fixed country dialing code. The user types only their local number.
const COUNTRY_CODE = '+234';
function validateSeeker(values: SeekerForm): SeekerErrors {
  const errors: SeekerErrors = {};
  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = 'Email must be valid';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Passwords do not match';
  }
  if (values.firstName.length > 255) {
    errors.firstName = 'First name must not exceed 255 characters';
  }
  if (values.middleName.length > 255) {
    errors.middleName = 'Middle name must not exceed 255 characters';
  }
  if (values.lastName.length > 255) {
    errors.lastName = 'Last name must not exceed 255 characters';
  }
  if (!values.phone.trim()) {
    errors.phone = 'Phone Number is required';
  } else if (COUNTRY_CODE.length + values.phone.length > 50) {
    errors.phone = 'Phone must not exceed 50 characters';
  }
  return errors;
}
const inputBase =
'block w-full pl-10 pr-3 py-2.5 border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all';
export function RegisterPage() {
  const [searchParams] = useSearchParams();
  const initialRole =
  searchParams.get('role') === 'employer' ? 'employer' : 'seeker';
  const [role, setRole] = useState<'seeker' | 'employer'>(initialRole);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [values, setValues] = useState<SeekerForm>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    middleName: '',
    lastName: '',
    phone: ''
  });
  const [errors, setErrors] = useState<SeekerErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleChange =
  (field: keyof SeekerForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValues((prev) => ({
      ...prev,
      [field]: value
    }));
    setErrors((prev) =>
    prev[field] ?
    {
      ...prev,
      [field]: undefined
    } :
    prev
    );
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateSeeker(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsLoading(true);
    setServerError(null);
    try {
      await authApi.register({
        email: values.email.trim(),
        password: values.password,
        confirmPassword: values.confirmPassword,
        firstName: values.firstName,
        middleName: values.middleName || undefined,
        lastName: values.lastName,
        phone: `${COUNTRY_CODE}${values.phone}`,
      });
      navigate(`/auth/verify?email=${encodeURIComponent(values.email.trim())}`);
    } catch (err: any) {
      setServerError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  const fieldClasses = (field: keyof SeekerForm) =>
  `${inputBase} ${errors[field] ? 'border-red-300 focus:ring-red-400' : 'border-slate-200 focus:ring-primary'}`;
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
          Join SkyTouch Jobs to find your next opportunity or hire top talent.
        </p>
      </div>

      {/* Role Selection */}
      <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
        <button
          type="button"
          onClick={() => setRole('seeker')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${role === 'seeker' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
          
          <UserCircle2
            size={18}
            className={role === 'seeker' ? 'text-primary' : ''} />
          
          I am a Job Seeker
        </button>
        <button
          type="button"
          onClick={() => setRole('employer')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${role === 'employer' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
          
          <Briefcase
            size={18}
            className={role === 'employer' ? 'text-primary' : ''} />
          
          I am an Employer
        </button>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        {/* Name fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-slate-700 mb-1.5">
              
              First Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-slate-400" />
              </div>
              <input
                id="firstName"
                type="text"
                maxLength={255}
                value={values.firstName}
                onChange={handleChange('firstName')}
                className={fieldClasses('firstName')}
                placeholder="John"
                aria-invalid={!!errors.firstName} />
              
            </div>
            {errors.firstName &&
            <p className="mt-1.5 text-xs text-red-600">{errors.firstName}</p>
            }
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-slate-700 mb-1.5">
              
              Last Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-slate-400" />
              </div>
              <input
                id="lastName"
                type="text"
                maxLength={255}
                value={values.lastName}
                onChange={handleChange('lastName')}
                className={fieldClasses('lastName')}
                placeholder="Doe"
                aria-invalid={!!errors.lastName} />
              
            </div>
            {errors.lastName &&
            <p className="mt-1.5 text-xs text-red-600">{errors.lastName}</p>
            }
          </div>
        </div>

        <div>
          <label
            htmlFor="middleName"
            className="block text-sm font-medium text-slate-700 mb-1.5">
            
            Middle Name{' '}
            <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={18} className="text-slate-400" />
            </div>
            <input
              id="middleName"
              type="text"
              maxLength={255}
              value={values.middleName}
              onChange={handleChange('middleName')}
              className={fieldClasses('middleName')}
              placeholder="William"
              aria-invalid={!!errors.middleName} />
            
          </div>
          {errors.middleName &&
          <p className="mt-1.5 text-xs text-red-600">{errors.middleName}</p>
          }
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700 mb-1.5">
            
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-slate-400" />
            </div>
            <input
              id="email"
              type="email"
              value={values.email}
              onChange={handleChange('email')}
              className={fieldClasses('email')}
              placeholder="you@example.com"
              aria-invalid={!!errors.email} />
            
          </div>
          {errors.email &&
          <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>
          }
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-slate-700 mb-1.5">
            
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 pr-3 flex items-center border-r border-slate-200 pointer-events-none">
              <span className="text-sm font-medium text-slate-600">
                {COUNTRY_CODE}
              </span>
            </div>
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              maxLength={50 - COUNTRY_CODE.length}
              value={values.phone}
              onChange={handleChange('phone')}
              className={`${fieldClasses('phone')} !pl-20`}
              placeholder="801 234 5678"
              aria-invalid={!!errors.phone} />
            
          </div>
          {errors.phone &&
          <p className="mt-1.5 text-xs text-red-600">{errors.phone}</p>
          }
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700 mb-1.5">
            
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-slate-400" />
            </div>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              className={`${fieldClasses('password')} !pr-11`}
              placeholder="••••••••"
              aria-invalid={!!errors.password} />
            
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors">
              
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password ?
          <p className="mt-1.5 text-xs text-red-600">{errors.password}</p> :

          <p className="mt-1.5 text-xs text-slate-500">
              Must be at least 8 characters long.
            </p>
          }
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-slate-700 mb-1.5">
            
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-slate-400" />
            </div>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={values.confirmPassword}
              onChange={handleChange('confirmPassword')}
              className={`${fieldClasses('confirmPassword')} !pr-11`}
              placeholder="••••••••"
              aria-invalid={!!errors.confirmPassword} />
            
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              aria-label={
              showConfirmPassword ? 'Hide password' : 'Show password'
              }
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors">
              
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword &&
          <p className="mt-1.5 text-xs text-red-600">
              {errors.confirmPassword}
            </p>
          }
        </div>

        {serverError && (
          <p className="text-sm text-red-600 text-center bg-red-50 border border-red-200 p-3 rounded-xl">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-primary-600 text-white py-3 rounded-xl font-bold transition-all shadow-soft active:scale-[0.98] mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
          {isLoading ? 'Creating account...' : <> Create Account <ArrowRight size={18} /> </>}
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