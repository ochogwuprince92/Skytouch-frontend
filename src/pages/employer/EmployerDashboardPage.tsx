import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Briefcase,
  Eye,
  TrendingUp,
  CheckCircle2,
  Clock,
  MoreVertical,
  ArrowRight } from
'lucide-react';
import { motion } from 'framer-motion';
export function EmployerDashboardPage() {
  const stats = [
  {
    label: 'Active Jobs',
    value: '12',
    icon: <Briefcase size={24} />,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    label: 'Total Candidates',
    value: '845',
    icon: <Users size={24} />,
    color: 'text-purple-600',
    bg: 'bg-purple-50'
  },
  {
    label: 'New Applications',
    value: '48',
    icon: <TrendingUp size={24} />,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  },
  {
    label: 'Interviews Scheduled',
    value: '14',
    icon: <Clock size={24} />,
    color: 'text-orange-600',
    bg: 'bg-orange-50'
  }];

  const recentJobs = [
  {
    id: 1,
    title: 'Senior Frontend Engineer',
    candidates: 124,
    new: 12,
    status: 'Active',
    daysLeft: 14
  },
  {
    id: 2,
    title: 'Product Manager',
    candidates: 86,
    new: 5,
    status: 'Active',
    daysLeft: 21
  },
  {
    id: 3,
    title: 'UX Researcher',
    candidates: 45,
    new: 0,
    status: 'Closed',
    daysLeft: 0
  }];

  const upcomingInterviews = [
  {
    id: 1,
    candidate: 'Sarah Jenkins',
    role: 'Senior Frontend Engineer',
    time: 'Today, 2:00 PM',
    type: 'Video Call'
  },
  {
    id: 2,
    candidate: 'Michael Chen',
    role: 'Product Manager',
    time: 'Tomorrow, 10:00 AM',
    type: 'Onsite'
  },
  {
    id: 3,
    candidate: 'Aisha Patel',
    role: 'Senior Frontend Engineer',
    time: 'Tomorrow, 1:30 PM',
    type: 'Video Call'
  }];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            Employer Dashboard
          </h1>
          <p className="text-slate-600">
            Overview of your hiring pipeline and active jobs.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
            View Analytics
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) =>
        <motion.div
          key={stat.label}
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.3,
            delay: index * 0.1
          }}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          
            <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} shrink-0`}>
            
              {stat.icon}
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            </div>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Active Jobs */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Active Jobs Overview
              </h2>
              <Link
                to="/employer/jobs"
                className="text-sm font-semibold text-primary hover:text-primary-600">
                
                View all jobs
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {recentJobs.map((job) =>
              <div
                key={job.id}
                className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-slate-500">
                        <strong className="text-slate-900">
                          {job.candidates}
                        </strong>{' '}
                        candidates
                      </span>
                      {job.new > 0 &&
                    <span className="text-success font-medium flex items-center">
                          <span className="w-2 h-2 rounded-full bg-success mr-1.5"></span>
                          {job.new} new
                        </span>
                    }
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto w-full">
                    <div className="text-right">
                      <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${job.status === 'Active' ? 'bg-success/10 text-success' : 'bg-slate-100 text-slate-500'}`}>
                      
                        {job.status}
                      </span>
                      {job.status === 'Active' &&
                    <p className="text-xs text-slate-400 mt-1.5">
                          {job.daysLeft} days left
                        </p>
                    }
                    </div>
                    <Link
                    to="/employer/ats"
                    className="p-2 text-slate-400 hover:text-primary transition-colors bg-slate-50 rounded-lg">
                    
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Upcoming Interviews */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">
                Upcoming Interviews
              </h2>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreVertical size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {upcomingInterviews.map((interview) =>
              <div key={interview.id} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold shrink-0">
                    {interview.candidate.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      {interview.candidate}
                    </h3>
                    <p className="text-xs text-slate-500 mb-1">
                      {interview.role}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-medium">
                      <span className="text-primary bg-primary-50 px-2 py-0.5 rounded">
                        {interview.time}
                      </span>
                      <span className="text-slate-500 border border-slate-200 px-2 py-0.5 rounded">
                        {interview.type}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button className="w-full mt-6 py-2 bg-slate-50 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition-colors text-sm">
              View Calendar
            </button>
          </div>

          {/* Subscription Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-md">
            <h3 className="font-bold mb-2">Professional Plan</h3>
            <p className="text-slate-400 text-sm mb-4">
              You have used 12 of 15 active job slots this month.
            </p>
            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-primary rounded-full"
                style={{
                  width: '80%'
                }}>
              </div>
            </div>
            <Link
              to="/employer/settings"
              className="text-sm font-semibold text-primary-400 hover:text-primary-300">
              
              Upgrade Plan →
            </Link>
          </div>
        </div>
      </div>
    </div>);

}