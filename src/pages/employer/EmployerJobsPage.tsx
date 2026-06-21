import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Users,
  Eye,
  Edit,
  Copy,
  Trash2,
  Clock,
  MapPin } from
'lucide-react';
import { motion } from 'framer-motion';
export function EmployerJobsPage() {
  const [activeTab, setActiveTab] = useState('active');
  const jobs = [
  {
    id: 1,
    title: 'Senior Frontend Engineer',
    location: 'San Francisco, CA (Hybrid)',
    type: 'Full-time',
    status: 'Active',
    candidates: 124,
    newCandidates: 12,
    views: 1450,
    posted: '14 days ago',
    expires: '16 days'
  },
  {
    id: 2,
    title: 'Product Manager',
    location: 'Remote',
    type: 'Full-time',
    status: 'Active',
    candidates: 86,
    newCandidates: 5,
    views: 980,
    posted: '21 days ago',
    expires: '9 days'
  },
  {
    id: 3,
    title: 'UX Researcher',
    location: 'New York, NY',
    type: 'Contract',
    status: 'Closed',
    candidates: 45,
    newCandidates: 0,
    views: 650,
    posted: '2 months ago',
    expires: 'Expired'
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    location: 'Seattle, WA',
    type: 'Full-time',
    status: 'Draft',
    candidates: 0,
    newCandidates: 0,
    views: 0,
    posted: 'Not posted',
    expires: '-'
  }];

  const filteredJobs = jobs.filter((job) => {
    if (activeTab === 'all') return true;
    return job.status.toLowerCase() === activeTab;
  });
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            Job Postings
          </h1>
          <p className="text-slate-600">
            Manage your job listings and track performance.
          </p>
        </div>
        <button className="bg-primary hover:bg-primary-600 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-soft flex items-center justify-center gap-2 w-full sm:w-auto">
          <Plus size={18} /> Post a New Job
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header & Filters */}
        <div className="p-4 sm:p-6 border-b border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto overflow-x-auto hide-scrollbar">
              {['Active', 'Draft', 'Closed', 'All'].map((tab) =>
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`flex-1 sm:flex-none px-6 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${activeTab === tab.toLowerCase() ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                
                  {tab}
                </button>
              )}
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <div className="flex-1 sm:w-64 relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
                
              </div>
              <button className="bg-slate-50 border border-slate-200 p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors shrink-0">
                <Filter size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="divide-y divide-slate-100">
          {filteredJobs.map((job, index) =>
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
            className="p-4 sm:p-6 hover:bg-slate-50 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    {job.title}
                  </h3>
                  <span
                  className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${job.status === 'Active' ? 'bg-success/10 text-success' : job.status === 'Draft' ? 'bg-warning/10 text-warning' : 'bg-slate-100 text-slate-500'}`}>
                  
                    {job.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-4">
                  <span className="flex items-center">
                    <MapPin size={14} className="mr-1.5" /> {job.location}
                  </span>
                  <span className="flex items-center">
                    <Clock size={14} className="mr-1.5" /> {job.type}
                  </span>
                  <span className="flex items-center">
                    Posted: {job.posted}
                  </span>
                </div>

                {job.status !== 'Draft' &&
              <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary-50 text-primary flex items-center justify-center">
                        <Users size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {job.candidates}{' '}
                          <span className="font-normal text-slate-500">
                            Candidates
                          </span>
                        </p>
                        {job.newCandidates > 0 &&
                    <p className="text-xs text-success font-medium">
                            +{job.newCandidates} new this week
                          </p>
                    }
                      </div>
                    </div>
                    <div className="w-px h-8 bg-slate-200"></div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center">
                        <Eye size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {job.views}{' '}
                          <span className="font-normal text-slate-500">
                            Views
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
              }
              </div>

              <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-4 border-t lg:border-t-0 border-slate-100 pt-4 lg:pt-0">
                {job.status === 'Active' &&
              <p className="text-sm text-slate-500">
                    Expires in{' '}
                    <span className="font-bold text-slate-900">
                      {job.expires}
                    </span>
                  </p>
              }
                <div className="flex items-center gap-2">
                  {job.status !== 'Draft' &&
                <Link
                  to="/employer/ats"
                  className="bg-primary-50 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                  
                      View Candidates
                    </Link>
                }
                  <div className="flex gap-1">
                    <button
                    className="p-2 text-slate-400 hover:text-primary hover:bg-primary-50 rounded-lg transition-colors"
                    title="Edit">
                    
                      <Edit size={18} />
                    </button>
                    <button
                    className="p-2 text-slate-400 hover:text-primary hover:bg-primary-50 rounded-lg transition-colors"
                    title="Duplicate">
                    
                      <Copy size={18} />
                    </button>
                    <button
                    className="p-2 text-slate-400 hover:text-danger hover:bg-danger/10 rounded-lg transition-colors"
                    title="Delete">
                    
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {filteredJobs.length === 0 &&
          <div className="p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Briefcase size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                No jobs found
              </h3>
              <p className="text-slate-500 mb-6">
                You don't have any {activeTab !== 'all' ? activeTab : ''} jobs
                at the moment.
              </p>
              <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-primary-600 transition-colors inline-flex items-center gap-2">
                <Plus size={18} /> Post a New Job
              </button>
            </div>
          }
        </div>
      </div>
    </div>);

}