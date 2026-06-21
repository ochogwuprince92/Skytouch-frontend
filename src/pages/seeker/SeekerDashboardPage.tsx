import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Bookmark,
  Eye,
  TrendingUp,
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  ChevronRight } from
'lucide-react';
import { motion } from 'framer-motion';
export function SeekerDashboardPage() {
  const stats = [
  {
    label: 'Applied Jobs',
    value: '12',
    icon: <FileText size={24} />,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    label: 'Saved Jobs',
    value: '24',
    icon: <Bookmark size={24} />,
    color: 'text-purple-600',
    bg: 'bg-purple-50'
  },
  {
    label: 'Profile Views',
    value: '156',
    icon: <Eye size={24} />,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  },
  {
    label: 'Search Appearances',
    value: '342',
    icon: <TrendingUp size={24} />,
    color: 'text-orange-600',
    bg: 'bg-orange-50'
  }];

  const recentApplications = [
  {
    id: 1,
    role: 'Senior Product Designer',
    company: 'TechNova',
    logo: 'TN',
    color: 'bg-blue-500',
    status: 'In Review',
    date: '2 days ago'
  },
  {
    id: 2,
    role: 'UX Researcher',
    company: 'CreativeFlow',
    logo: 'CF',
    color: 'bg-purple-500',
    status: 'Interview',
    date: '1 week ago'
  },
  {
    id: 3,
    role: 'Product Manager',
    company: 'ScaleUp Inc',
    logo: 'SU',
    color: 'bg-emerald-500',
    status: 'Applied',
    date: '2 weeks ago'
  }];

  const recommendedJobs = [
  {
    id: 101,
    title: 'Lead UI Designer',
    company: 'DesignHub',
    location: 'Remote',
    salary: '$120k - $150k',
    type: 'Full-time'
  },
  {
    id: 102,
    title: 'Senior UX Designer',
    company: 'FinTech Pro',
    location: 'New York, NY',
    salary: '$140k - $170k',
    type: 'Hybrid'
  }];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">
          Welcome back, John! 👋
        </h1>
        <p className="text-slate-600">
          Here's what's happening with your job search today.
        </p>
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
        {/* Left Column - Recent Applications */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Recent Applications
              </h2>
              <Link
                to="/seeker/applications"
                className="text-sm font-semibold text-primary hover:text-primary-600">
                
                View all
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {recentApplications.map((app) =>
              <div
                key={app.id}
                className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                
                  <div className="flex items-center gap-4">
                    <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg ${app.color} shrink-0`}>
                    
                      {app.logo}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{app.role}</h3>
                      <p className="text-sm text-slate-500">{app.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-6 sm:w-auto w-full">
                    <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${app.status === 'Interview' ? 'bg-purple-100 text-purple-700' : app.status === 'In Review' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}`}>
                    
                      {app.status}
                    </span>
                    <span className="text-sm text-slate-400 font-medium">
                      {app.date}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Profile Completion Card */}
          <div className="bg-gradient-to-br from-primary-900 to-primary-700 rounded-2xl p-8 text-white shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Complete your profile
                </h3>
                <p className="text-primary-100 mb-4 max-w-md">
                  Candidates with complete profiles are 3x more likely to be
                  contacted by recruiters.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-2 bg-primary-900/50 rounded-full overflow-hidden w-48">
                    <div
                      className="h-full bg-success rounded-full"
                      style={{
                        width: '65%'
                      }}>
                    </div>
                  </div>
                  <span className="font-bold">65%</span>
                </div>
              </div>
              <Link
                to="/seeker/profile"
                className="bg-white text-primary-900 px-6 py-3 rounded-xl font-bold hover:bg-primary-50 transition-colors whitespace-nowrap w-full sm:w-auto text-center">
                
                Update Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column - Recommended Jobs */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900">
                Recommended for you
              </h2>
            </div>
            <div className="space-y-4">
              {recommendedJobs.map((job) =>
              <div
                key={job.id}
                className="border border-slate-100 rounded-xl p-4 hover:border-primary/30 hover:shadow-sm transition-all group cursor-pointer">
                
                  <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors mb-1">
                    {job.title}
                  </h3>
                  <div className="flex items-center text-sm text-slate-500 mb-3">
                    <Briefcase size={14} className="mr-1.5" /> {job.company}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs font-medium text-slate-600 bg-slate-50 px-2 py-1 rounded-md flex items-center">
                      <MapPin size={12} className="mr-1" /> {job.location}
                    </span>
                    <span className="text-xs font-medium text-slate-600 bg-slate-50 px-2 py-1 rounded-md flex items-center">
                      <DollarSign size={12} className="mr-1" /> {job.salary}
                    </span>
                  </div>
                  <button className="w-full py-2 bg-primary-50 text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-colors text-sm">
                    View Details
                  </button>
                </div>
              )}
            </div>
            <Link
              to="/jobs"
              className="mt-4 flex items-center justify-center gap-1 text-sm font-semibold text-primary hover:text-primary-600 w-full py-2">
              
              Explore more jobs <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>);

}