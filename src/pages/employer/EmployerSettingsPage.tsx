import React, { useState } from 'react';
import {
  Building2,
  Users,
  CreditCard,
  Bell,
  Link as LinkIcon,
  Lock } from
'lucide-react';
import { Link } from 'react-router-dom';
export function EmployerSettingsPage() {
  const [activeTab, setActiveTab] = useState('account');
  const tabs = [
  {
    id: 'account',
    label: 'Company Account',
    icon: <Building2 size={18} />
  },
  {
    id: 'team',
    label: 'Team Members',
    icon: <Users size={18} />
  },
  {
    id: 'billing',
    label: 'Billing & Plans',
    icon: <CreditCard size={18} />
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: <Bell size={18} />
  },
  {
    id: 'integrations',
    label: 'Integrations',
    icon: <LinkIcon size={18} />
  }];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">
          Manage your employer account, team, and billing.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow-soft border border-slate-200 p-2 flex flex-col gap-1">
            {tabs.map((tab) =>
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-primary-50 text-primary' : 'text-slate-600 hover:bg-slate-50'}`}>
              
                {tab.icon}
                {tab.label}
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {activeTab === 'account' &&
          <div className="bg-white rounded-2xl shadow-soft border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-6">
                Account Settings
              </h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Admin Email
                  </label>
                  <input
                  type="email"
                  defaultValue="admin@technova.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                
                  <p className="text-xs text-slate-500 mt-1">
                    This email receives all billing and critical system
                    notifications.
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <h3 className="text-md font-bold text-slate-900 mb-2">
                    Password & security
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">
                    Change your password or deactivate your account from the
                    shared security settings page.
                  </p>
                  <Link
                    to="/settings/account"
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-600">
                    <Lock size={16} />
                    Manage account security
                  </Link>
                </div>
                <div className="flex justify-end pt-4">
                  <button
                  type="button"
                  className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold hover:bg-primary-600 transition-colors shadow-soft">
                  
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          }

          {activeTab === 'team' &&
          <div className="bg-white rounded-2xl shadow-soft border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Team Members
                </h2>
                <button className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary-600 transition-colors">
                  Invite Member
                </button>
              </div>
              <div className="space-y-4">
                {[
              {
                name: 'Sarah Jenkins',
                email: 'sarah@technova.com',
                role: 'Admin'
              },
              {
                name: 'Mike Ross',
                email: 'mike@technova.com',
                role: 'Recruiter'
              }].
              map((member, i) =>
              <div
                key={i}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                
                    <div>
                      <h4 className="font-bold text-slate-900">
                        {member.name}
                      </h4>
                      <p className="text-sm text-slate-500">{member.email}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                        {member.role}
                      </span>
                      <button className="text-slate-400 hover:text-danger text-sm font-medium">
                        Remove
                      </button>
                    </div>
                  </div>
              )}
              </div>
            </div>
          }

          {activeTab === 'billing' &&
          <div className="bg-white rounded-2xl shadow-soft border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-6">
                Billing & Plans
              </h2>
              <div className="bg-primary-50 border border-primary-100 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-primary">Pro Plan</h3>
                    <p className="text-sm text-primary/80">
                      Billed annually ($3,588/yr)
                    </p>
                  </div>
                  <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    Active
                  </span>
                </div>
                <p className="text-sm text-slate-700 mb-4">
                  Your next billing date is <strong>Oct 12, 2026</strong>.
                </p>
                <div className="flex gap-3">
                  <button className="bg-white text-primary border border-primary px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary-50 transition-colors">
                    Manage Subscription
                  </button>
                  <button className="text-slate-600 hover:text-slate-900 text-sm font-bold px-4 py-2">
                    View Invoices
                  </button>
                </div>
              </div>
            </div>
          }

          {activeTab === 'notifications' &&
          <div className="bg-white rounded-2xl shadow-soft border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-6">
                Notification Preferences
              </h2>
              <div className="space-y-6">
                {[
              {
                title: 'New Applications',
                desc: 'Email me when a candidate applies to my jobs.'
              },
              {
                title: 'Candidate Messages',
                desc: 'Email me when I receive a new message.'
              },
              {
                title: 'Daily Digest',
                desc: 'Send a daily summary of job performance.'
              }].
              map((item, i) =>
              <div key={i} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked />
                  
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
              )}
              </div>
            </div>
          }

          {activeTab === 'integrations' &&
          <div className="bg-white rounded-2xl shadow-soft border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-6">
                Integrations
              </h2>
              <div className="space-y-4">
                {[
              {
                name: 'Slack',
                desc: 'Get notifications for new applications in your channels.',
                connected: true
              },
              {
                name: 'Google Calendar',
                desc: 'Sync interview schedules automatically.',
                connected: false
              },
              {
                name: 'Zoom',
                desc: 'Generate meeting links for interviews.',
                connected: false
              }].
              map((item, i) =>
              <div
                key={i}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-xl">
                
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                        <LinkIcon size={20} className="text-slate-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">
                          {item.name}
                        </h4>
                        <p className="text-sm text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                    <button
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${item.connected ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-primary-50 text-primary hover:bg-primary-100'}`}>
                  
                      {item.connected ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
              )}
              </div>
            </div>
          }
        </div>
      </div>
    </div>);

}