import React, { useState } from 'react';
import {
  Search,
  Filter,
  AlertTriangle,
  Check,
  X,
  ExternalLink } from
'lucide-react';
const MOCK_JOBS = [
{
  id: 1,
  title: 'Senior Frontend Developer',
  company: 'TechNova',
  status: 'pending',
  reportedReason: null,
  date: '2 hours ago'
},
{
  id: 2,
  title: 'Data Entry Clerk - Work From Home',
  company: 'Unknown Corp',
  status: 'flagged',
  reportedReason: 'Suspected scam/phishing',
  date: '5 hours ago'
},
{
  id: 3,
  title: 'Product Manager',
  company: 'Innovate Inc',
  status: 'approved',
  reportedReason: null,
  date: '1 day ago'
},
{
  id: 4,
  title: 'Guaranteed Income $5000/week',
  company: 'QuickCash',
  status: 'flagged',
  reportedReason: 'Spam/Misleading',
  date: '1 day ago'
}];

export function AdminJobsModerationPage() {
  const [activeTab, setActiveTab] = useState('pending');
  const tabs = [
  {
    id: 'pending',
    label: 'Pending Review',
    count: 12
  },
  {
    id: 'flagged',
    label: 'Flagged/Reported',
    count: 5
  },
  {
    id: 'approved',
    label: 'Approved',
    count: null
  }];

  const filteredJobs = MOCK_JOBS.filter((job) => job.status === activeTab);
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Jobs Moderation</h1>
          <p className="text-slate-500 mt-1">
            Review job postings and handle reported content.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18} />
            
            <input
              type="text"
              placeholder="Search jobs..."
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-danger focus:ring-1 focus:ring-danger text-sm w-full sm:w-64" />
            
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-soft border border-slate-200 overflow-hidden">
        <div className="flex border-b border-slate-200">
          {tabs.map((tab) =>
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-4 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${activeTab === tab.id ? 'border-danger text-danger' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
            
              {tab.label}
              {tab.count !== null &&
            <span
              className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-danger/10 text-danger' : 'bg-slate-100 text-slate-600'}`}>
              
                  {tab.count}
                </span>
            }
            </button>
          )}
        </div>

        <div className="divide-y divide-slate-200">
          {filteredJobs.length === 0 ?
          <div className="p-8 text-center text-slate-500">
              No jobs found in this category.
            </div> :

          filteredJobs.map((job) =>
          <div
            key={job.id}
            className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
            
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-slate-900">
                      {job.title}
                    </h3>
                    <a
                  href="#"
                  className="text-slate-400 hover:text-primary transition-colors">
                  
                      <ExternalLink size={16} />
                    </a>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">
                    Posted by{' '}
                    <span className="font-bold text-slate-900">
                      {job.company}
                    </span>{' '}
                    • {job.date}
                  </p>
                  {job.reportedReason &&
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-warning/10 text-warning">
                      <AlertTriangle size={14} /> Reported: {job.reportedReason}
                    </div>
              }
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {job.status !== 'approved' &&
              <button className="flex items-center gap-1.5 px-4 py-2 bg-success/10 text-success hover:bg-success/20 rounded-xl text-sm font-bold transition-colors">
                      <Check size={16} /> Approve
                    </button>
              }
                  <button className="flex items-center gap-1.5 px-4 py-2 bg-danger/10 text-danger hover:bg-danger/20 rounded-xl text-sm font-bold transition-colors">
                    <X size={16} /> Reject & Remove
                  </button>
                </div>
              </div>
          )
          }
        </div>
      </div>
    </div>);

}