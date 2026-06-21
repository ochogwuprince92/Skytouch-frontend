import React, { useState } from 'react';
import { User, Bell, Shield, AlertTriangle } from 'lucide-react';
export function SeekerSettingsPage() {
  const [activeTab, setActiveTab] = useState('account');
  const tabs = [
  {
    id: 'account',
    label: 'Account',
    icon: <User size={18} />
  },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: <Bell size={18} />
  },
  {
    id: 'privacy',
    label: 'Privacy',
    icon: <Shield size={18} />
  },
  {
    id: 'danger',
    label: 'Danger Zone',
    icon: <AlertTriangle size={18} />
  }];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">
          Manage your account preferences and settings.
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
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === tab.id ? tab.id === 'danger' ? 'bg-danger-50 text-danger' : 'bg-primary-50 text-primary' : 'text-slate-600 hover:bg-slate-50'}`}>
              
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
                Account Information
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      First Name
                    </label>
                    <input
                    type="text"
                    defaultValue="John"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                  
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Last Name
                    </label>
                    <input
                    type="text"
                    defaultValue="Doe"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                  
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                  type="email"
                  defaultValue="john.doe@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <h3 className="text-md font-bold text-slate-900 mb-4">
                    Change Password
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        Current Password
                      </label>
                      <input
                      type="password"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                    
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">
                        New Password
                      </label>
                      <input
                      type="password"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
                    
                    </div>
                  </div>
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

          {activeTab === 'notifications' &&
          <div className="bg-white rounded-2xl shadow-soft border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-6">
                Notification Preferences
              </h2>
              <div className="space-y-6">
                {[
              {
                title: 'Job Alerts',
                desc: 'Receive emails about new jobs matching your profile.'
              },
              {
                title: 'Application Updates',
                desc: 'Get notified when an employer updates your application status.'
              },
              {
                title: 'Messages',
                desc: 'Receive emails when you get a new message.'
              },
              {
                title: 'Marketing',
                desc: 'Receive news, tips, and promotional emails.'
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
                    defaultChecked={i !== 3} />
                  
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
              )}
              </div>
            </div>
          }

          {activeTab === 'privacy' &&
          <div className="bg-white rounded-2xl shadow-soft border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-6">
                Privacy Settings
              </h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900">
                      Profile Visibility
                    </h4>
                    <p className="text-sm text-slate-500">
                      Allow employers to find your profile in searches.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked />
                  
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900">
                      Show Salary Expectations
                    </h4>
                    <p className="text-sm text-slate-500">
                      Display your expected salary on your profile.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          }

          {activeTab === 'danger' &&
          <div className="bg-white rounded-2xl shadow-soft border border-danger-200 p-6">
              <h2 className="text-lg font-bold text-danger mb-2">
                Danger Zone
              </h2>
              <p className="text-sm text-slate-600 mb-6">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
              <button className="bg-danger-50 text-danger border border-danger-200 px-6 py-2.5 rounded-xl font-bold hover:bg-danger hover:text-white transition-colors">
                Delete Account
              </button>
            </div>
          }
        </div>
      </div>
    </div>);

}