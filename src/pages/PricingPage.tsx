import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, X, Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function PricingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    // Redirect authenticated employers to the new subscription flow
    if (user && user.role === 'EMPLOYER') {
      setIsRedirecting(true);
      navigate('/employer/subscription/plans');
      return;
    }
    
    // Redirect authenticated job seekers to their dashboard
    if (user && user.role === 'JOB_SEEKER') {
      setIsRedirecting(true);
      navigate('/seeker/dashboard');
      return;
    }

    // Redirect authenticated admins to their dashboard
    if (user && user.role === 'ADMIN') {
      setIsRedirecting(true);
      navigate('/admin/dashboard');
      return;
    }
  }, [user, navigate]);

  // Show loading state while redirecting
  if (isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-slate-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  // Show public pricing information for unauthenticated users
  const plans = [
    {
      name: 'Basic',
      description: 'Perfect for small businesses hiring occasionally.',
      features: [
        'Up to 5 active job postings',
        'Basic applicant tracking',
        'Company profile page',
        'Email support',
      ],
      buttonText: 'Get Started',
      popular: false,
    },
    {
      name: 'Standard',
      description: 'Ideal for growing companies with consistent hiring needs.',
      features: [
        'Up to 15 active job postings',
        'Advanced applicant tracking',
        'Premium job board distribution',
        'Priority email & chat support',
        'Basic analytics dashboard',
      ],
      buttonText: 'Get Started',
      popular: true,
    },
    {
      name: 'Premium',
      description: 'For large organizations needing scalable recruitment solutions.',
      features: [
        'Unlimited job postings',
        'Advanced analytics & reporting',
        'API access & integrations',
        'Custom roles & permissions',
        'Dedicated account manager',
        '24/7 phone support',
      ],
      buttonText: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <div className="pt-24 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-slate-600 mb-10">
            Choose the perfect plan for your hiring needs. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`bg-white rounded-3xl p-8 border-2 relative flex flex-col ${
                plan.popular ? 'border-primary shadow-xl scale-105 z-10' : 'border-slate-200 shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
              <p className="text-slate-600 text-sm mb-6 min-h-[40px]">{plan.description}</p>

              <div className="mb-8">
                <span className="text-4xl font-extrabold text-slate-900">Custom</span>
                <span className="text-slate-500 font-medium"> pricing</span>
                <p className="text-sm text-slate-500 mt-1">Contact us for details</p>
              </div>

              <Link
                to="/register?role=employer"
                className={`w-full py-3.5 rounded-xl font-bold text-lg mb-8 transition-all text-center block ${
                  plan.popular
                    ? 'bg-primary hover:bg-primary/90 text-white shadow-md'
                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                }`}
              >
                {plan.buttonText}
                <ArrowRight className="inline w-4 h-4 ml-2" />
              </Link>

              <div className="space-y-4 flex-grow">
                <p className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                  What's included
                </p>
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                    <span className="text-slate-600 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Have questions?</h2>
          <p className="text-slate-600 mb-6">
            Our team is here to help you find the right plan for your business.
          </p>
          <Link to="/help" className="text-primary font-semibold hover:text-primary/90">
            Contact our support team →
          </Link>
        </div>
      </div>
    </div>
  );
}