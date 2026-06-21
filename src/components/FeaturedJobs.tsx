import React from 'react';
import { MapPin, Clock, Building2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const jobs = [
{
  id: 1,
  title: 'Senior Full Stack Engineer',
  company: 'TechNova',
  location: 'San Francisco, CA',
  type: 'Full-time',
  salary: '$150k - $200k',
  postedAt: '2 hours ago'
},
{
  id: 2,
  title: 'Product Design Lead',
  company: 'CreativeFlow',
  location: 'Remote',
  type: 'Full-time',
  salary: '$130k - $170k',
  postedAt: '5 hours ago'
},
{
  id: 3,
  title: 'VP of Engineering',
  company: 'ScaleUp Inc',
  location: 'New York, NY',
  type: 'Full-time',
  salary: '$200k - $250k',
  postedAt: '1 day ago'
},
{
  id: 4,
  title: 'Data Scientist',
  company: 'DataMinds',
  location: 'Hybrid (London)',
  type: 'Contract',
  salary: '£80k - £110k',
  postedAt: '2 days ago'
}];

export function FeaturedJobs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Featured Opportunities
            </h2>
            <p className="text-lg text-slate-600">
              Discover your next career move with top companies actively hiring
              on Skytouch Jobs.
            </p>
          </div>
          <Link
            to="/jobs"
            className="inline-flex items-center text-sm font-bold text-slate-900 hover:text-primary transition-colors whitespace-nowrap">
            
            View all jobs <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {jobs.map((job, index) =>
          <motion.div
            key={job.id}
            initial={{
              opacity: 0,
              y: 10
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.4,
              delay: index * 0.1
            }}>
            
              <Link
              to={`/jobs/${job.id}`}
              className="block bg-white p-6 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all group">
              
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-900 font-bold text-lg group-hover:bg-slate-900 group-hover:text-white transition-colors">
                      {job.company.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex items-center text-slate-500 mt-1 text-sm">
                        <Building2 size={14} className="mr-1.5" />
                        <span className="font-medium">{job.company}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-6">
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-1.5 text-slate-400" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1.5 text-slate-400" />
                    {job.type}
                  </div>
                  <div className="font-medium text-slate-900">{job.salary}</div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {job.postedAt}
                  </span>
                  <span className="text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
                    Apply now <ArrowRight size={14} className="ml-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}