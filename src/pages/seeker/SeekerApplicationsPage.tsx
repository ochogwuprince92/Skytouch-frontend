import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  MapPin,
  DollarSign,
  Clock,
  Building2,
  MoreVertical,
  X } from
'lucide-react';
import { motion } from 'framer-motion';
export function SeekerApplicationsPage() {
  const [activeTab, setActiveTab] = useState('applied');
  const applications = [
  {
    id: 1,
    role: 'Senior Product Designer',
    company: 'TechNova',
    logo: 'TN',
    color: 'bg-blue-500',
    location: 'San Francisco, CA',
    salary: '$150k - $180k',
    status: 'In Review',
    date: 'Applied 2 days ago',
    stage: 2,
    totalStages: 5
  },
  {
    id: 2,
    role: 'UX Researcher',
    company: 'CreativeFlow',
    logo: 'CF',
    color: 'bg-purple-500',
    location: 'Remote',
    salary: '$130k - $160k',
    status: 'Interview',
    date: 'Applied 1 week ago',
    stage: 3,
    totalStages: 4
  },
  {
    id: 3,
    role: 'Product Manager',
    company: 'ScaleUp Inc',
    logo: 'SU',
    color: 'bg-emerald-500',
    location: 'New York, NY',
    salary: '$160k - $200k',
    status: 'Applied',
    date: 'Applied 2 weeks ago',
    stage: 1,
    totalStages: 4
  },
  {
    id: 4,
    role: 'Lead UI Designer',
    company: 'DesignHub',
    logo: 'DH',
    color: 'bg-orange-500',
    location: 'Remote',
    salary: '$140k - $170k',
    status: 'Rejected',
    date: 'Applied 1 month ago',
    stage: 0,
    totalStages: 4
  }];

  const savedJobs = [
  {
    id: 101,
    role: 'Frontend Developer',
    company: 'WebWorks',
    logo: 'WW',
    color: 'bg-teal-500',
    location: 'Austin, TX',
    salary: '$110k - $140k',
    date: 'Saved 2 days ago'
  },
  {
    id: 102,
    role: 'DevOps Engineer',
    company: 'CloudSync',
    logo: 'CS',
    color: 'bg-indigo-500',
    location: 'Seattle, WA',
    salary: '$140k - $180k',
    date: 'Saved 5 days ago'
  }];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            My Applications
          </h1>
          <p className="text-slate-600">
            Track your job applications and saved opportunities.
          </p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('applied')}
            className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'applied' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
            
            Applied (4)
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'saved' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
            
            Saved (2)
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          
          <input
            type="text"
            placeholder="Search by role or company"
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
          
        </div>
        <div className="flex gap-2">
          <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-primary">
            <option>All Statuses</option>
            <option>Applied</option>
            <option>In Review</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>
          <button className="bg-slate-50 border border-slate-200 p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {activeTab === 'applied' &&
        applications.map((app, index) =>
        <motion.div
          key={app.id}
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.3,
            delay: index * 0.05
          }}
          className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-card transition-all">
          
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl ${app.color} shrink-0`}>
                
                    {app.logo}
                  </div>
                  <div>
                    <Link
                  to={`/jobs/${app.id}`}
                  className="text-xl font-bold text-slate-900 hover:text-primary transition-colors block mb-1">
                  
                      {app.role}
                    </Link>
                    <div className="flex items-center text-slate-600 font-medium mb-3">
                      <Building2 size={16} className="mr-1.5" /> {app.company}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <span className="flex items-center text-sm text-slate-500">
                        <MapPin size={14} className="mr-1" /> {app.location}
                      </span>
                      <span className="flex items-center text-sm text-slate-500">
                        <DollarSign size={14} className="mr-1" /> {app.salary}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-4 w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <div className="flex items-center justify-between md:justify-end w-full gap-4">
                    <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${app.status === 'Interview' ? 'bg-purple-100 text-purple-700' : app.status === 'In Review' ? 'bg-blue-100 text-blue-700' : app.status === 'Rejected' ? 'bg-danger/10 text-danger' : 'bg-slate-100 text-slate-700'}`}>
                  
                      {app.status}
                    </span>
                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreVertical size={20} />
                    </button>
                  </div>

                  {app.status !== 'Rejected' &&
              <div className="w-full md:w-48">
                      <div className="flex justify-between text-xs text-slate-500 mb-1.5 font-medium">
                        <span>
                          Stage {app.stage} of {app.totalStages}
                        </span>
                      </div>
                      <div className="flex gap-1 h-2">
                        {Array.from({
                    length: app.totalStages
                  }).map((_, i) =>
                  <div
                    key={i}
                    className={`flex-1 rounded-full ${i < app.stage ? 'bg-primary' : 'bg-slate-100'}`} />

                  )}
                      </div>
                    </div>
              }

                  <span className="text-xs text-slate-400 font-medium flex items-center">
                    <Clock size={12} className="mr-1" /> {app.date}
                  </span>
                </div>
              </div>
            </motion.div>
        )}

        {activeTab === 'saved' &&
        savedJobs.map((job, index) =>
        <motion.div
          key={job.id}
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.3,
            delay: index * 0.05
          }}
          className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-card transition-all">
          
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg ${job.color} shrink-0`}>
                
                    {job.logo}
                  </div>
                  <div>
                    <Link
                  to={`/jobs/${job.id}`}
                  className="text-lg font-bold text-slate-900 hover:text-primary transition-colors block">
                  
                      {job.role}
                    </Link>
                    <div className="flex items-center text-slate-500 text-sm mt-1">
                      <Building2 size={14} className="mr-1" />{' '}
                      <span className="mr-3">{job.company}</span>
                      <MapPin size={14} className="mr-1" />{' '}
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Link
                to={`/jobs/${job.id}`}
                className="flex-1 sm:flex-none bg-primary text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-primary-600 transition-colors text-center">
                
                    Apply Now
                  </Link>
                  <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:text-danger hover:bg-danger/5 transition-colors">
                    <X size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
        )}
      </div>
    </div>);

}