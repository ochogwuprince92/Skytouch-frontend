import React from 'react';
import {
  Users,
  Building2,
  Briefcase,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ArrowRight } from
'lucide-react';
import { motion } from 'framer-motion';
export function AdminDashboardPage() {
  const stats = [
  {
    label: 'Total Users',
    value: '124,592',
    change: '+12%',
    icon: <Users size={24} />,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    label: 'Active Employers',
    value: '8,430',
    change: '+5%',
    icon: <Building2 size={24} />,
    color: 'text-purple-600',
    bg: 'bg-purple-50'
  },
  {
    label: 'Live Jobs',
    value: '45,210',
    change: '+18%',
    icon: <Briefcase size={24} />,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  },
  {
    label: 'Monthly MRR',
    value: '$1.2M',
    change: '+8%',
    icon: <DollarSign size={24} />,
    color: 'text-orange-600',
    bg: 'bg-orange-50'
  }];

  const pendingApprovals = [
  {
    id: 1,
    company: 'Stark Industries',
    industry: 'Defense',
    requested: '2 hours ago',
    status: 'Pending'
  },
  {
    id: 2,
    company: 'Wayne Enterprises',
    industry: 'Conglomerate',
    requested: '5 hours ago',
    status: 'Pending'
  },
  {
    id: 3,
    company: 'Acme Corp',
    industry: 'Manufacturing',
    requested: '1 day ago',
    status: 'Pending'
  }];

  const recentActivity = [
  {
    id: 1,
    text: 'New enterprise subscription: TechNova',
    time: '10 mins ago',
    type: 'success'
  },
  {
    id: 2,
    text: 'Job flagged for moderation: "Data Entry"',
    time: '1 hour ago',
    type: 'warning'
  },
  {
    id: 3,
    text: 'System backup completed successfully',
    time: '3 hours ago',
    type: 'info'
  },
  {
    id: 4,
    text: 'Failed login attempts spike detected',
    time: '5 hours ago',
    type: 'danger'
  }];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">
          Platform Overview
        </h1>
        <p className="text-slate-600">
          Monitor platform health, user growth, and pending actions.
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
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          
            <div className="flex items-center justify-between mb-4">
              <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              
                {stat.icon}
              </div>
              <span className="flex items-center text-sm font-bold text-success bg-success/10 px-2 py-1 rounded-lg">
                <TrendingUp size={14} className="mr-1" /> {stat.change}
              </span>
            </div>
            <p className="text-3xl font-bold text-slate-900 mb-1">
              {stat.value}
            </p>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Pending Approvals */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">
                  Pending Employer Approvals
                </h2>
                <span className="bg-danger text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  5
                </span>
              </div>
              <button className="text-sm font-semibold text-danger hover:text-danger/80">
                View all
              </button>
            </div>
            <div className="divide-y divide-slate-100">
              {pendingApprovals.map((company) =>
              <div
                key={company.id}
                className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                
                  <div>
                    <h3 className="font-bold text-slate-900">
                      {company.company}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {company.industry} • Requested {company.requested}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">
                      Review
                    </button>
                    <button className="flex-1 sm:flex-none px-4 py-2 bg-success text-white rounded-lg text-sm font-semibold hover:bg-success/90 transition-colors flex items-center justify-center gap-1">
                      <CheckCircle2 size={16} /> Approve
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - System Activity */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-6">
              Recent Activity
            </h2>
            <div className="space-y-6">
              {recentActivity.map((activity) =>
              <div key={activity.id} className="flex gap-4">
                  <div className="mt-0.5">
                    {activity.type === 'success' &&
                  <CheckCircle2 size={18} className="text-success" />
                  }
                    {activity.type === 'warning' &&
                  <AlertCircle size={18} className="text-warning" />
                  }
                    {activity.type === 'danger' &&
                  <AlertCircle size={18} className="text-danger" />
                  }
                    {activity.type === 'info' &&
                  <div className="w-4 h-4 rounded-full bg-blue-500 mt-0.5" />
                  }
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {activity.text}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <button className="w-full mt-6 py-2 bg-slate-50 text-slate-700 font-semibold rounded-lg hover:bg-slate-100 transition-colors text-sm flex items-center justify-center gap-1">
              View full audit log <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>);

}