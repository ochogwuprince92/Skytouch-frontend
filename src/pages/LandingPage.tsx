import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { FeaturedJobs } from '../components/FeaturedJobs';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
export function LandingPage() {
  return (
    <main className="bg-white">
      <Hero />

      {/* Trusted By Section - Clean Grid */}
      <section className="py-12 border-t border-slate-200 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">
            Trusted by innovative teams worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="text-xl font-extrabold text-slate-900 tracking-tight">
              Acme Corp
            </div>
            <div className="text-xl font-extrabold text-slate-900 tracking-tight">
              GlobalTech
            </div>
            <div className="text-xl font-extrabold text-slate-900 tracking-tight">
              Nexus
            </div>
            <div className="text-xl font-extrabold text-slate-900 tracking-tight">
              Stark Ind.
            </div>
            <div className="text-xl font-extrabold text-slate-900 tracking-tight">
              Wayne Ent.
            </div>
          </div>
        </div>
      </section>

      <Features />
      <FeaturedJobs />

      {/* CTA Section - Editorial & Clean */}
      <section className="py-32 bg-slate-900 relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1]
            }}>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
              Ready to transform your hiring?
            </h2>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of companies and millions of candidates already
              using Skytouch Jobs to build the future.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register?role=employer"
                className="w-full sm:w-auto bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-colors">
                
                Start Hiring Now
              </Link>
              <Link
                to="/jobs"
                className="w-full sm:w-auto bg-slate-800 text-white border border-slate-700 px-8 py-4 rounded-xl font-bold hover:bg-slate-700 transition-colors">
                
                Find a Job
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>);

}