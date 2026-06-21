import React from 'react';
import { Search, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
export function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-white overflow-hidden">
      {/* Subtle structural background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          {/* Left Column: Typography */}
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
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="max-w-2xl">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold tracking-wide uppercase mb-8">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              Enterprise Recruitment Platform
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
              Hire the top 1% <br />
              <span className="text-primary">without the noise.</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
              Skytouch Jobs is the definitive marketplace for enterprise teams.
              Discover vetted talent, automate your pipeline, and close
              candidates faster.
            </p>

            {/* Search Box */}
            <div className="bg-white p-2 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-200 flex flex-col sm:flex-row gap-2 max-w-xl mb-8">
              <div className="flex-1 flex items-center px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus-within:border-primary focus-within:bg-white transition-colors">
                <Search className="text-slate-400 mr-3 shrink-0" size={18} />
                <input
                  type="text"
                  placeholder="Role, skill, or company"
                  className="bg-transparent border-none outline-none w-full text-slate-900 placeholder:text-slate-500 text-sm font-medium" />
                
              </div>
              <div className="flex-1 flex items-center px-4 py-3 bg-slate-50 rounded-xl border border-transparent focus-within:border-primary focus-within:bg-white transition-colors hidden sm:flex">
                <MapPin className="text-slate-400 mr-3 shrink-0" size={18} />
                <input
                  type="text"
                  placeholder="Location"
                  className="bg-transparent border-none outline-none w-full text-slate-900 placeholder:text-slate-500 text-sm font-medium" />
                
              </div>
              <button className="bg-primary hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shrink-0">
                Search <ArrowRight size={16} />
              </button>
            </div>

            <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-primary" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-primary" />
                150k+ active jobs
              </div>
            </div>
          </motion.div>

          {/* Right Column: Abstract UI Mockup */}
          <motion.div
            initial={{
              opacity: 0,
              x: 20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="relative hidden lg:block h-[600px]">
            
            {/* Base UI Frame */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-slate-50 rounded-3xl border border-slate-200 shadow-2xl p-6 overflow-hidden">
              {/* Mock Header */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-200">
                <div>
                  <div className="h-4 w-32 bg-slate-200 rounded-full mb-2"></div>
                  <div className="h-3 w-24 bg-slate-100 rounded-full"></div>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                  <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                </div>
              </div>

              {/* Mock Kanban Columns */}
              <div className="flex gap-4 h-full">
                <div className="flex-1 space-y-4">
                  <div className="h-3 w-20 bg-slate-200 rounded-full mb-4"></div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                        JD
                      </div>
                      <div className="h-3 w-24 bg-slate-200 rounded-full"></div>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full mb-2"></div>
                    <div className="h-2 w-2/3 bg-slate-100 rounded-full"></div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm opacity-50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100"></div>
                      <div className="h-3 w-20 bg-slate-200 rounded-full"></div>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full mb-2"></div>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="h-3 w-24 bg-slate-200 rounded-full mb-4"></div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm opacity-50">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100"></div>
                      <div className="h-3 w-24 bg-slate-200 rounded-full"></div>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full mb-2"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div
              animate={{
                y: [0, -10, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute -left-12 top-24 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 w-64">
              
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center text-success">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Offer Accepted
                  </p>
                  <p className="text-xs text-slate-500">
                    Sarah Jenkins • Engineering
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{
                y: [0, 10, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1
              }}
              className="absolute -bottom-8 left-12 bg-slate-900 p-5 rounded-2xl shadow-xl border border-slate-800 w-72">
              
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Time to Hire
              </p>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold text-white">14</span>
                <span className="text-slate-400 font-medium pb-1">days</span>
              </div>
              <div className="mt-3 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-1/3 rounded-full"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>);

}