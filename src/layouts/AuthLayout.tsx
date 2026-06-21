import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Briefcase, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
const testimonials = [
{
  quote:
  'Skytouch Jobs transformed how we hire. We scaled our engineering team across three continents in just six months.',
  author: 'Sarah Jenkins',
  role: 'VP of Talent, TechNova'
},
{
  quote:
  'The AI resume parsing and automated scheduling saved our recruiting team over 20 hours a week.',
  author: 'Michael Chen',
  role: 'Head of HR, ScaleUp Inc'
},
{
  quote:
  'As a job seeker, the platform was incredibly intuitive. I found my dream role within two weeks of signing up.',
  author: 'Aisha Patel',
  role: 'Senior Product Manager'
}];

export function AuthLayout() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary-900 relative overflow-hidden flex-col justify-between p-12">
        {/* Decorative Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary-800/50 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary-700/30 blur-3xl" />

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 cursor-pointer w-fit">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-soft">
              <Briefcase size={24} strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">
              Skytouch<span className="text-primary-300">Jobs</span>
            </span>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg">
          <Quote size={48} className="text-primary-400/50 mb-6" />
          <div className="h-48 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                exit={{
                  opacity: 0,
                  y: -20
                }}
                transition={{
                  duration: 0.5
                }}
                className="absolute inset-0">
                
                <p className="text-2xl font-medium text-white leading-relaxed mb-6">
                  "{testimonials[currentTestimonial].quote}"
                </p>
                <div>
                  <p className="text-white font-bold">
                    {testimonials[currentTestimonial].author}
                  </p>
                  <p className="text-primary-200">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex gap-2 mt-8">
            {testimonials.map((_, idx) =>
            <button
              key={idx}
              onClick={() => setCurrentTestimonial(idx)}
              className={`w-2 h-2 rounded-full transition-all ${idx === currentTestimonial ? 'bg-white w-6' : 'bg-primary-600 hover:bg-primary-400'}`}
              aria-label={`Go to testimonial ${idx + 1}`} />

            )}
          </div>
        </div>
      </div>

      {/* Right Panel - Auth Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12 relative">
        {/* Mobile Logo */}
        <div className="lg:hidden absolute top-6 left-6">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-soft">
              <Briefcase size={20} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              Skytouch<span className="text-primary">Jobs</span>
            </span>
          </Link>
        </div>

        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>);

}