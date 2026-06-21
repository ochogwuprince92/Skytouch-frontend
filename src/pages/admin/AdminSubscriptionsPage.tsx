import React from 'react';
import {
  CreditCard,
  TrendingUp,
  Users,
  AlertCircle,
  Search,
  Filter,
  MoreVertical } from
'lucide-react';
const MOCK_SUBSCRIPTIONS = [
{
  id: 1,
  company: 'TechNova',
  plan: 'Pro',
  mrr: '$299',
  status: 'active',
  renewal: 'Oct 12, 2026'
},
{
  id: 2,
  company: 'Global Systems',
  plan: 'Enterprise',
  mrr: '$999',
  status: 'active',
  renewal: 'Nov 01, 2026'
},
{
  id: 3,
  company: 'Innovate Inc',
  plan: 'Pro',
  mrr: '$299',
  status: 'past_due',
  renewal: 'Sep 15, 2026'
},
{
  id: 4,
  company: 'StartupX',
  plan: 'Basic',
  mrr: '$99',
  status: 'canceled',
  renewal: '-'
}];

export function AdminSubscriptionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Subscriptions & Billing
        </h1>
        <p className="text-slate-500 mt-1">
          Manage employer plans and revenue metrics.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
        {
          title: 'Monthly Recurring Revenue',
          value: '$45,250',
          trend: '+12%',
          icon: <TrendingUp size={24} />,
          color: 'text-success',
          bg: 'bg-success/10'
        },
        {
          title: 'Active Subscriptions',
          value: '342',
          trend: '+5%',
          icon: <CreditCard size={24} />,
          color: 'text-primary',
          bg: 'bg-primary-50'
        },
        {
          title: 'Enterprise Plans',
          value: '45',
          trend: '+2',
          icon: <Users size={24} />,
          color: 'text-secondary',
          bg: 'bg-secondary/10'
        },
        {
          title: 'Past Due',
          value: '12',
          trend: '-3',
          icon: <AlertCircle size={24} />,
          color: 'text-danger',
          bg: 'bg-danger/10'
        }].
        map((stat, i) =>
        <div
          key={i}
          className="bg-white p-6 rounded-2xl shadow-soft border border-slate-200">
          
            <div className="flex items-center justify-between mb-4">
              <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              
                {stat.icon}
              </div>
              <span
              className={`text-sm font-bold px-2.5 py-1 rounded-full ${stat.title === 'Past Due' ? 'text-success bg-success/10' : 'text-success bg-success/10'}`}>
              
                {stat.trend}
              </span>
            </div>
            <h3 className="text-slate-500 text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {stat.value}
            </p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-soft border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-slate-900">
            Recent Subscriptions
          </h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18} />
              
              <input
                type="text"
                placeholder="Search company..."
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-danger focus:ring-1 focus:ring-danger text-sm w-full sm:w-64" />
              
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium hover:bg-slate-100 transition-colors text-sm">
              <Filter size={16} />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                <th className="px-6 py-4 font-medium">Company</th>
                <th className="px-6 py-4 font-medium">Plan</th>
                <th className="px-6 py-4 font-medium">MRR</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Next Renewal</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {MOCK_SUBSCRIPTIONS.map((sub) =>
              <tr
                key={sub.id}
                className="hover:bg-slate-50 transition-colors">
                
                  <td className="px-6 py-4 font-bold text-slate-900">
                    {sub.company}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700">
                      {sub.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">
                    {sub.mrr}
                  </td>
                  <td className="px-6 py-4">
                    {sub.status === 'active' &&
                  <span className="text-xs font-bold text-success bg-success/10 px-2.5 py-1 rounded-full">
                        Active
                      </span>
                  }
                    {sub.status === 'past_due' &&
                  <span className="text-xs font-bold text-warning bg-warning/10 px-2.5 py-1 rounded-full">
                        Past Due
                      </span>
                  }
                    {sub.status === 'canceled' &&
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                        Canceled
                      </span>
                  }
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {sub.renewal}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>);

}