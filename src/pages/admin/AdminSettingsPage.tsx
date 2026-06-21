import React, { useState } from 'react';
import { Settings, Shield, Globe, Mail, Bell } from 'lucide-react';
export function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const tabs = [
  {
    id: 'general',
    label: 'General',
    icon: <Globe size={18} />
  },
  {
    id: 'security',
    label: 'Security & Roles',
    icon: <Shield size={18} />
  },
  {
    id: 'email',
    label: 'Email Settings',
    icon: <Mail size={18} />
  },
  {
    id: 'notifications',
    label: 'System Alerts',
    icon: <Bell size={18} />
  },
  {
    id: 'advanced',
    label: 'Advanced',
    icon: <Settings size={18} />
  }];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Platform Settings</h1>
        <p className="text-slate-500 mt-1">
          Configure global platform settings and configurations.
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
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-danger-50 text-danger' : 'text-slate-600 hover:bg-slate-50'}`}>
              
                {tab.icon}
                {tab.label}
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {activeTab === 'general' &&
          <div className="bg-white rounded-2xl shadow-soft border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-6">
                General Settings
              </h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Platform Name
                    </label>
                    <input
                    type="text"
                    defaultValue="Skytouch Jobs"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-danger focus:ring-1 focus:ring-danger" />
                  
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Support Email
                    </label>
                    <input
                    type="email"
                    defaultValue="support@skytouchjobs.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-danger focus:ring-1 focus:ring-danger" />
                  
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Platform Description
                  </label>
                  <textarea
                  rows={3}
                  defaultValue="The leading enterprise recruitment marketplace."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-danger focus:ring-1 focus:ring-danger resize-none">
                </textarea>
                </div>

                <div className="pt-6 border-t border-slate-200">
                  <h3 className="text-md font-bold text-slate-900 mb-4">
                    Feature Flags
                  </h3>
                  <div className="space-y-4">
                    {[
                  {
                    title: 'Enable AI Resume Parsing',
                    desc: 'Allow seekers to auto-fill profiles using AI.'
                  },
                  {
                    title: 'Public Company Directory',
                    desc: 'Show companies listing page to non-authenticated users.'
                  },
                  {
                    title: 'Beta ATS Features',
                    desc: 'Enable experimental ATS features for Pro employers.'
                  }].
                  map((item, i) =>
                  <div
                    key={i}
                    className="flex items-center justify-between">
                    
                        <div>
                          <h4 className="font-bold text-slate-900">
                            {item.title}
                          </h4>
                          <p className="text-sm text-slate-500">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked={i !== 2} />
                      
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-danger"></div>
                        </label>
                      </div>
                  )}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                  type="button"
                  className="bg-danger text-white px-6 py-2.5 rounded-xl font-bold hover:bg-danger-600 transition-colors shadow-soft">
                  
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          }

          {activeTab === 'advanced' &&
          <div className="bg-white rounded-2xl shadow-soft border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-6">
                Advanced Settings
              </h2>

              <div className="space-y-6">
                <div className="p-4 border border-warning/30 bg-warning/5 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900">
                        Maintenance Mode
                      </h4>
                      <p className="text-sm text-slate-600">
                        Disable access for all non-admin users. Show maintenance
                        page.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-warning"></div>
                    </label>
                  </div>
                </div>

                <div className="p-4 border border-danger/30 bg-danger/5 rounded-xl">
                  <h4 className="font-bold text-danger mb-2">
                    Clear System Cache
                  </h4>
                  <p className="text-sm text-slate-600 mb-4">
                    Force clear all Redis caches. This may temporarily slow down
                    the platform.
                  </p>
                  <button className="bg-white border border-danger text-danger px-4 py-2 rounded-xl text-sm font-bold hover:bg-danger-50 transition-colors">
                    Clear Cache Now
                  </button>
                </div>
              </div>
            </div>
          }

          {/* Placeholders for other tabs */}
          {['security', 'email', 'notifications'].includes(activeTab) &&
          <div className="bg-white rounded-2xl shadow-soft border border-slate-200 p-6 flex flex-col items-center justify-center h-64 text-slate-500">
              <Settings size={48} className="mb-4 opacity-20" />
              <p>Settings panel for {activeTab} is under construction.</p>
            </div>
          }
        </div>
      </div>
    </div>);

}