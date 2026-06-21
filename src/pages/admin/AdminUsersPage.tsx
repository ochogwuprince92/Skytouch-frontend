import React, { useState } from 'react';
import {
  Search,
  Filter,
  MoreVertical,
  Shield,
  User,
  Building2,
  CheckCircle2,
  XCircle,
  Edit } from
'lucide-react';
import { motion } from 'framer-motion';
export function AdminUsersPage() {
  const [activeTab, setActiveTab] = useState('all');
  const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Job Seeker',
    status: 'Active',
    joined: 'Oct 12, 2023',
    lastLogin: '2 hours ago'
  },
  {
    id: 2,
    name: 'Sarah Jenkins',
    email: 'sarah@technova.com',
    role: 'Employer',
    company: 'TechNova',
    status: 'Active',
    joined: 'Sep 05, 2023',
    lastLogin: '1 day ago'
  },
  {
    id: 3,
    name: 'Michael Chen',
    email: 'michael@scaleup.io',
    role: 'Employer',
    company: 'ScaleUp Inc',
    status: 'Suspended',
    joined: 'Nov 20, 2023',
    lastLogin: '1 week ago'
  },
  {
    id: 4,
    name: 'Aisha Patel',
    email: 'aisha@example.com',
    role: 'Job Seeker',
    status: 'Active',
    joined: 'Dec 01, 2023',
    lastLogin: 'Just now'
  },
  {
    id: 5,
    name: 'System Admin',
    email: 'admin@skytouch.com',
    role: 'Admin',
    status: 'Active',
    joined: 'Jan 01, 2023',
    lastLogin: 'Currently active'
  }];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">
            User Management
          </h1>
          <p className="text-slate-600">
            Manage all platform users, roles, and permissions.
          </p>
        </div>
        <button className="bg-danger hover:bg-danger/90 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-soft w-full sm:w-auto">
          Add New User
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header & Filters */}
        <div className="p-4 sm:p-6 border-b border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto overflow-x-auto hide-scrollbar">
              {['All', 'Job Seekers', 'Employers', 'Admins'].map((tab) =>
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
                  placeholder="Search users..."
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-danger focus:border-transparent" />
                
              </div>
              <button className="bg-slate-50 border border-slate-200 p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors shrink-0">
                <Filter size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                <th className="p-4 font-medium">User</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Joined</th>
                <th className="p-4 font-medium">Last Login</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user, index) =>
              <motion.tr
                key={user.id}
                initial={{
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.05
                }}
                className="hover:bg-slate-50 transition-colors group">
                
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{user.name}</p>
                        <p className="text-sm text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {user.role === 'Admin' &&
                    <Shield size={16} className="text-danger" />
                    }
                      {user.role === 'Employer' &&
                    <Building2 size={16} className="text-primary" />
                    }
                      {user.role === 'Job Seeker' &&
                    <User size={16} className="text-slate-500" />
                    }
                      <span className="text-sm font-medium text-slate-700">
                        {user.role}
                      </span>
                    </div>
                    {user.company &&
                  <p className="text-xs text-slate-500 mt-1">
                        {user.company}
                      </p>
                  }
                  </td>
                  <td className="p-4">
                    <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center w-fit gap-1 ${user.status === 'Active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                    
                      {user.status === 'Active' ?
                    <CheckCircle2 size={12} /> :

                    <XCircle size={12} />
                    }
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-600">{user.joined}</td>
                  <td className="p-4 text-sm text-slate-600">
                    {user.lastLogin}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                      className="p-2 text-slate-400 hover:text-primary hover:bg-primary-50 rounded-lg transition-colors"
                      title="Edit User">
                      
                        <Edit size={18} />
                      </button>
                      <button
                      className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                      title="More Options">
                      
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500">
          <p>Showing 1 to 5 of 124,592 entries</p>
          <div className="flex gap-1">
            <button
              className="px-3 py-1 border border-slate-200 rounded-md hover:bg-slate-50 disabled:opacity-50"
              disabled>
              
              Prev
            </button>
            <button className="px-3 py-1 bg-danger text-white rounded-md">
              1
            </button>
            <button className="px-3 py-1 border border-slate-200 rounded-md hover:bg-slate-50">
              2
            </button>
            <button className="px-3 py-1 border border-slate-200 rounded-md hover:bg-slate-50">
              3
            </button>
            <button className="px-3 py-1 border border-slate-200 rounded-md hover:bg-slate-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>);

}