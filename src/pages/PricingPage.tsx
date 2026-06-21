import React, { useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { motion } from 'framer-motion';
export function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const plans = [
  {
    name: 'Starter',
    description: 'Perfect for small businesses hiring occasionally.',
    priceMonthly: 99,
    priceAnnual: 79,
    features: [
    'Up to 3 active job postings',
    'Basic applicant tracking system',
    'Standard job board distribution',
    'Email support',
    'Company profile page'],

    notIncluded: [
    'AI Resume Parsing',
    'Advanced Analytics',
    'Custom hiring workflows',
    'Dedicated account manager'],

    buttonText: 'Start Free Trial',
    popular: false
  },
  {
    name: 'Professional',
    description: 'Ideal for growing companies with consistent hiring needs.',
    priceMonthly: 299,
    priceAnnual: 249,
    features: [
    'Up to 15 active job postings',
    'Advanced ATS with Kanban boards',
    'Premium job board distribution',
    'AI Resume Parsing (500/mo)',
    'Collaborative hiring tools',
    'Basic Analytics dashboard',
    'Priority email & chat support'],

    notIncluded: ['Custom hiring workflows', 'Dedicated account manager'],
    buttonText: 'Get Started',
    popular: true
  },
  {
    name: 'Enterprise',
    description:
    'For large organizations needing scalable recruitment solutions.',
    priceMonthly: 899,
    priceAnnual: 749,
    features: [
    'Unlimited job postings',
    'Enterprise ATS & custom workflows',
    'Unlimited AI Resume Parsing',
    'Advanced Analytics & Reporting',
    'API access & integrations',
    'Custom roles & permissions',
    'Dedicated account manager',
    'SLA & 24/7 phone support'],

    notIncluded: [],
    buttonText: 'Contact Sales',
    popular: false
  }];

  return (
    <div className="pt-24 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-slate-600 mb-10">
            Choose the perfect plan for your hiring needs. No hidden fees,
            cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span
              className={`text-sm font-medium ${!isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
              
              Monthly billing
            </span>
            <button
              className="relative w-16 h-8 rounded-full bg-primary transition-colors focus:outline-none"
              onClick={() => setIsAnnual(!isAnnual)}>
              
              <div
                className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform duration-300 ${isAnnual ? 'translate-x-8' : 'translate-x-0'}`} />
              
            </button>
            <span
              className={`text-sm font-medium flex items-center gap-2 ${isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
              
              Annual billing
              <span className="bg-success/10 text-success text-xs px-2 py-0.5 rounded-full font-bold">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) =>
          <motion.div
            key={plan.name}
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.4,
              delay: index * 0.1
            }}
            className={`bg-white rounded-3xl p-8 border-2 relative flex flex-col ${plan.popular ? 'border-primary shadow-xl scale-105 z-10' : 'border-slate-200 shadow-sm'}`}>
            
              {plan.popular &&
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                  Most Popular
                </div>
            }

              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {plan.name}
              </h3>
              <p className="text-slate-600 text-sm mb-6 min-h-[40px]">
                {plan.description}
              </p>

              <div className="mb-8">
                <span className="text-4xl font-extrabold text-slate-900">
                  ${isAnnual ? plan.priceAnnual : plan.priceMonthly}
                </span>
                <span className="text-slate-500 font-medium">/mo</span>
                {isAnnual &&
              <p className="text-sm text-success font-medium mt-1">
                    Billed ${plan.priceAnnual * 12} annually
                  </p>
              }
              </div>

              <button
              className={`w-full py-3.5 rounded-xl font-bold text-lg mb-8 transition-all ${plan.popular ? 'bg-primary hover:bg-primary-600 text-white shadow-soft' : 'bg-primary-50 text-primary hover:bg-primary-100'}`}>
              
                {plan.buttonText}
              </button>

              <div className="space-y-4 flex-grow">
                <p className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                  What's included
                </p>
                {plan.features.map((feature, i) =>
              <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-success shrink-0" />
                    <span className="text-slate-600 text-sm">{feature}</span>
                  </div>
              )}

                {plan.notIncluded.length > 0 &&
              <div className="pt-4 mt-4 border-t border-slate-100 space-y-4">
                    {plan.notIncluded.map((feature, i) =>
                <div
                  key={i}
                  className="flex items-start gap-3 opacity-50">
                  
                        <X size={20} className="text-slate-400 shrink-0" />
                        <span className="text-slate-500 text-sm">
                          {feature}
                        </span>
                      </div>
                )}
                  </div>
              }
              </div>
            </motion.div>
          )}
        </div>

        {/* FAQ Teaser */}
        <div className="mt-24 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Have questions?
          </h2>
          <p className="text-slate-600 mb-6">
            Our team is here to help you find the right plan for your business.
          </p>
          <button className="text-primary font-semibold hover:text-primary-600">
            Contact our sales team →
          </button>
        </div>
      </div>
    </div>);

}