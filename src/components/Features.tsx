import {
  LayoutDashboard,
  Zap,
  Users,
  BarChart3,
  CheckCircle2,
  ArrowRight } from
'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
export function Features() {
  return (
    <section className="py-24 lg:py-32 bg-slate-50 border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Everything you need to <br className="hidden md:block" />
            scale your team.
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            SkyTouch Jobs combines a massive talent marketplace with a
            world-class Applicant Tracking System built for modern enterprise
            workflows.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Large Feature 1 */}
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
              duration: 0.5
            }}
            className="md:col-span-2 bg-white rounded-3xl p-8 lg:p-12 border border-slate-200 shadow-sm relative overflow-hidden group">
            
            <div className="relative z-10 max-w-md">
              <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white mb-6">
                <LayoutDashboard size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Enterprise ATS
              </h3>
              <p className="text-slate-600 leading-relaxed mb-8">
                Manage your entire hiring pipeline with our powerful,
                customizable Kanban boards. Automate stage progressions, trigger
                emails, and keep your team aligned.
              </p>
              <Link
                to="/auth/register"
                className="inline-flex items-center text-sm font-bold text-slate-900 hover:text-primary transition-colors">
                
                Explore ATS features <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            {/* Decorative background element */}
            <div className="absolute right-0 bottom-0 w-2/3 h-2/3 bg-slate-50 border-t border-l border-slate-200 rounded-tl-3xl translate-x-8 translate-y-8 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-500 flex items-start justify-start p-6">
              <div className="w-full space-y-3 opacity-50">
                <div className="h-8 bg-white rounded-lg border border-slate-200 w-3/4"></div>
                <div className="h-8 bg-white rounded-lg border border-slate-200 w-full"></div>
                <div className="h-8 bg-white rounded-lg border border-slate-200 w-5/6"></div>
              </div>
            </div>
          </motion.div>

          {/* Small Feature 1 */}
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
              duration: 0.5,
              delay: 0.1
            }}
            className="bg-slate-900 rounded-3xl p-8 lg:p-10 border border-slate-800 shadow-sm flex flex-col justify-between">
            
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary-400 mb-6">
                <Zap size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                AI Resume Parsing
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Instantly extract skills, experience, and education from
                candidate resumes to match them with your requirements.
              </p>
            </div>
          </motion.div>

          {/* Small Feature 2 */}
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
              duration: 0.5,
              delay: 0.2
            }}
            className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-sm">
            
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-6">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Collaborative Hiring
            </h3>
            <p className="text-slate-600 leading-relaxed">
              Involve your entire team with shared notes, candidate ratings, and
              structured interview scorecards.
            </p>
          </motion.div>

          {/* Large Feature 2 */}
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
              duration: 0.5,
              delay: 0.3
            }}
            className="md:col-span-2 bg-white rounded-3xl p-8 lg:p-12 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-8 items-center">
            
            <div className="flex-1">
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900 mb-6">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Advanced Analytics
              </h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                Track time-to-hire, source quality, and pipeline bottlenecks
                with comprehensive reporting dashboards built for data-driven
                teams.
              </p>
              <ul className="space-y-3">
                {[
                'Custom report builder',
                'Export to CSV/PDF',
                'Real-time pipeline metrics'].
                map((item, i) =>
                <li
                  key={i}
                  className="flex items-center text-sm font-medium text-slate-700">
                  
                    <CheckCircle2 className="text-primary mr-3" size={16} />
                    {item}
                  </li>
                )}
              </ul>
            </div>
            <div className="flex-1 w-full bg-slate-50 rounded-2xl border border-slate-200 p-6 h-64 flex items-end gap-4">
              {/* Abstract Chart */}
              {[40, 70, 45, 90, 65, 80].map((height, i) =>
              <div
                key={i}
                className="flex-1 bg-slate-200 rounded-t-sm relative group">
                
                  <div
                  className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-sm transition-all duration-500 group-hover:bg-slate-900"
                  style={{
                    height: `${height}%`
                  }}>
                </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}