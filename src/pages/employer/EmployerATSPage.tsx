import React, { useState } from 'react';
import {
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Calendar,
  Eye,
  Star,
  CheckCircle2,
  XCircle,
  Clock } from
'lucide-react';
import { motion } from 'framer-motion';
// Mock Data
const stages = [
{
  id: 'applied',
  name: 'Applied',
  count: 12
},
{
  id: 'screening',
  name: 'Screening',
  count: 8
},
{
  id: 'interview',
  name: 'Interview',
  count: 5
},
{
  id: 'offer',
  name: 'Offer Sent',
  count: 2
},
{
  id: 'hired',
  name: 'Hired',
  count: 1
}];

const candidates = [
{
  id: 1,
  name: 'Sarah Jenkins',
  role: 'Senior Frontend Engineer',
  stage: 'applied',
  rating: 4,
  appliedDate: '2 days ago',
  avatar: 'SJ',
  match: 92
},
{
  id: 2,
  name: 'Michael Chen',
  role: 'Senior Frontend Engineer',
  stage: 'screening',
  rating: 5,
  appliedDate: '4 days ago',
  avatar: 'MC',
  match: 95
},
{
  id: 3,
  name: 'Aisha Patel',
  role: 'Senior Frontend Engineer',
  stage: 'interview',
  rating: 4,
  appliedDate: '1 week ago',
  avatar: 'AP',
  match: 88
},
{
  id: 4,
  name: 'David Kim',
  role: 'Senior Frontend Engineer',
  stage: 'applied',
  rating: 3,
  appliedDate: '1 day ago',
  avatar: 'DK',
  match: 75
},
{
  id: 5,
  name: 'Elena Rodriguez',
  role: 'Senior Frontend Engineer',
  stage: 'offer',
  rating: 5,
  appliedDate: '2 weeks ago',
  avatar: 'ER',
  match: 98
},
{
  id: 6,
  name: 'James Wilson',
  role: 'Senior Frontend Engineer',
  stage: 'screening',
  rating: 4,
  appliedDate: '5 days ago',
  avatar: 'JW',
  match: 85
}];

export function EmployerATSPage() {
  const [selectedJob, setSelectedJob] = useState('Senior Frontend Engineer');
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            Applicant Tracking
          </h1>
          <p className="text-slate-600">
            Manage candidates across your hiring pipeline.
          </p>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedJob}
            onChange={(e) => setSelectedJob(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-slate-900 font-semibold outline-none focus:ring-2 focus:ring-primary shadow-sm">
            
            <option>Senior Frontend Engineer</option>
            <option>Product Manager</option>
            <option>UX Researcher</option>
          </select>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row gap-3 shrink-0">
        <div className="flex-1 relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          
          <input
            type="text"
            placeholder="Search candidates by name or skills..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
          
        </div>
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          <button className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap flex items-center gap-2">
            <Filter size={16} /> Filters
          </button>
          <button className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap">
            Rating: 4+ ★
          </button>
          <button className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors whitespace-nowrap">
            Match: 80%+
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto hide-scrollbar pb-4">
        <div className="flex gap-6 h-full min-w-max">
          {stages.map((stage) =>
          <div key={stage.id} className="w-80 flex flex-col h-full">
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4 shrink-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900">{stage.name}</h3>
                  <span className="bg-slate-200 text-slate-700 text-xs font-bold px-2 py-0.5 rounded-full">
                    {stage.count}
                  </span>
                </div>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              {/* Column Cards Container */}
              <div className="flex-1 bg-slate-100/50 rounded-2xl p-3 overflow-y-auto space-y-3 border border-slate-200/50">
                {candidates.
              filter((c) => c.stage === stage.id).
              map((candidate) =>
              <motion.div
                layoutId={`card-${candidate.id}`}
                key={candidate.id}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary-100 text-primary font-bold flex items-center justify-center text-sm">
                            {candidate.avatar}
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">
                              {candidate.name}
                            </h4>
                            <p className="text-xs text-slate-500">
                              {candidate.appliedDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-xs font-bold text-success bg-success/10 px-1.5 py-0.5 rounded flex items-center">
                            {candidate.match}% Match
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) =>
                  <Star
                    key={star}
                    size={14}
                    className={
                    star <= candidate.rating ?
                    'text-yellow-500 fill-yellow-500' :
                    'text-slate-200 fill-slate-200'
                    } />

                  )}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <div className="flex gap-1">
                          <button
                      className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary-50 rounded-lg transition-colors"
                      title="View Profile">
                      
                            <Eye size={16} />
                          </button>
                          <button
                      className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary-50 rounded-lg transition-colors"
                      title="Message">
                      
                            <Mail size={16} />
                          </button>
                          <button
                      className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary-50 rounded-lg transition-colors"
                      title="Schedule Interview">
                      
                            <Calendar size={16} />
                          </button>
                        </div>
                        <div className="flex gap-1">
                          <button
                      className="p-1.5 text-slate-400 hover:text-danger hover:bg-danger/10 rounded-lg transition-colors"
                      title="Reject">
                      
                            <XCircle size={16} />
                          </button>
                          <button
                      className="p-1.5 text-slate-400 hover:text-success hover:bg-success/10 rounded-lg transition-colors"
                      title="Advance">
                      
                            <CheckCircle2 size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
              )}

                {/* Empty State for Column */}
                {candidates.filter((c) => c.stage === stage.id).length ===
              0 &&
              <div className="h-24 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-sm font-medium">
                    Drop candidates here
                  </div>
              }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>);

}