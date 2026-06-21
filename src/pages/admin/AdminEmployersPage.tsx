import React, { useState } from 'react';
import {
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle } from
'lucide-react';
const MOCK_EMPLOYERS = [
{
  id: 1,
  name: 'TechNova',
  email: 'admin@technova.com',
  status: 'verified',
  plan: 'Pro',
  jobs: 12,
  joined: 'Oct 12, 2023'
},
{
  id: 2,
  name: 'Global Systems',
  email: 'hr@globalsys.com',
  status: 'pending',
  plan: 'Free',
  jobs: 0,
  joined: 'Today'
},
{
  id: 3,
  name: 'Innovate Inc',
  email: 'careers@innovate.io',
  status: 'verified',
  plan: 'Enterprise',
  jobs: 45,
  joined: 'Jan 05, 2022'
},
{
  id: 4,
  name: 'StartupX',
  email: 'founder@startupx.co',
  status: 'suspended',
  plan: 'Free',
  jobs: 2,
  joined: 'Mar 15, 2024'
},
{
  id: 5,
  name: 'CloudScale',
  email: 'team@cloudscale.net',
  status: 'pending',
  plan: 'Pro',
  jobs: 1,
  joined: 'Yesterday'
}];

export function AdminEmployersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Employers</h1>
          <p className="text-slate-500 mt-1">
            Manage company accounts and verification requests.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18} />
            
            <input
              type="text"
              placeholder="Search employers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-danger focus:ring-1 focus:ring-danger text-sm w-full sm:w-64" />
            
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition-colors">
            <Filter size={18} />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-soft border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                <th className="px-6 py-4 font-medium">Company</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Plan</th>
                <th className="px-6 py-4 font-medium">Active Jobs</th>
                <th className="px-6 py-4 font-medium">Joined</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {MOCK_EMPLOYERS.map((employer) =>
              <tr
                key={employer.id}
                className="hover:bg-slate-50 transition-colors">
                
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-600">
                        {employer.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">
                          {employer.name}
                        </p>
                        <p className="text-sm text-slate-500">
                          {employer.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {employer.status === 'verified' &&
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-success/10 text-success">
                        <CheckCircle size={14} /> Verified
                      </span>
                  }
                    {employer.status === 'pending' &&
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-warning/10 text-warning">
                        <AlertCircle size={14} /> Pending
                      </span>
                  }
                    {employer.status === 'suspended' &&
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-danger/10 text-danger">
                        <XCircle size={14} /> Suspended
                      </span>
                  }
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-700">
                      {employer.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-700">
                      {employer.jobs}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500">
                      {employer.joined}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {employer.status === 'pending' &&
                    <button
                      className="text-success hover:bg-success/10 p-1.5 rounded-lg transition-colors"
                      title="Approve">
                      
                          <CheckCircle size={18} />
                        </button>
                    }
                      <button className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500">
          <span>Showing 1 to 5 of 5 entries</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50">
              Prev
            </button>
            <button className="px-3 py-1 border border-slate-200 rounded-lg bg-danger text-white hover:bg-danger-600">
              1
            </button>
            <button className="px-3 py-1 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>);

}