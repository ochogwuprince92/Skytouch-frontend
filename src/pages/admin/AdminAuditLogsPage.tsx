import React from 'react';
import {
  Search,
  Filter,
  ShieldAlert,
  User,
  Settings,
  FileText } from
'lucide-react';
const MOCK_LOGS = [
{
  id: 1,
  actor: 'System Admin',
  action: 'Modified platform settings',
  target: 'Global Settings',
  ip: '192.168.1.1',
  time: '10 mins ago',
  severity: 'medium',
  icon: <Settings size={16} />
},
{
  id: 2,
  actor: 'Mike Ross',
  action: 'Approved employer account',
  target: 'TechNova',
  ip: '10.0.0.5',
  time: '1 hour ago',
  severity: 'low',
  icon: <User size={16} />
},
{
  id: 3,
  actor: 'System',
  action: 'Failed login attempt',
  target: 'admin@skytouch.com',
  ip: '45.22.11.9',
  time: '2 hours ago',
  severity: 'high',
  icon: <ShieldAlert size={16} />
},
{
  id: 4,
  actor: 'Sarah Jenkins',
  action: 'Deleted job posting',
  target: 'Job #1042',
  ip: '10.0.0.12',
  time: '5 hours ago',
  severity: 'medium',
  icon: <FileText size={16} />
}];

export function AdminAuditLogsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Audit Logs</h1>
          <p className="text-slate-500 mt-1">
            Monitor system activity and security events.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18} />
            
            <input
              type="text"
              placeholder="Search logs..."
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
                <th className="px-6 py-4 font-medium">Event</th>
                <th className="px-6 py-4 font-medium">Actor</th>
                <th className="px-6 py-4 font-medium">Target</th>
                <th className="px-6 py-4 font-medium">IP Address</th>
                <th className="px-6 py-4 font-medium">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {MOCK_LOGS.map((log) =>
              <tr
                key={log.id}
                className="hover:bg-slate-50 transition-colors">
                
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${log.severity === 'high' ? 'bg-danger/10 text-danger' : log.severity === 'medium' ? 'bg-warning/10 text-warning' : 'bg-slate-100 text-slate-600'}`}>
                      
                        {log.icon}
                      </div>
                      <span className="font-medium text-slate-900">
                        {log.action}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">
                    {log.actor}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {log.target}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 font-mono">
                    {log.ip}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {log.time}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500">
          <span>Showing 1 to 4 of 1,240 entries</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50">
              Prev
            </button>
            <button className="px-3 py-1 border border-slate-200 rounded-lg bg-danger text-white hover:bg-danger-600">
              1
            </button>
            <button className="px-3 py-1 border border-slate-200 rounded-lg hover:bg-slate-50">
              2
            </button>
            <button className="px-3 py-1 border border-slate-200 rounded-lg hover:bg-slate-50">
              3
            </button>
            <button className="px-3 py-1 border border-slate-200 rounded-lg hover:bg-slate-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>);

}