import { useState } from 'react';
import { Settings, Shield, Globe, Mail, Bell, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FormAlert } from '../../components/FormAlert';
import { ApiError } from '../../lib/api';
import {
  expireStaleOffers,
  runJobAlertDigest,
} from '../../services/adminService';

export function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [opsMessage, setOpsMessage] = useState<string | null>(null);
  const [opsError, setOpsError] = useState<string | null>(null);
  const [isRunningDigest, setIsRunningDigest] = useState(false);
  const [isExpiringOffers, setIsExpiringOffers] = useState(false);
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

  const handleRunDigest = async () => {
    setOpsError(null);
    setOpsMessage(null);
    setIsRunningDigest(true);
    try {
      const result = await runJobAlertDigest();
      setOpsMessage(
        `Digest complete: ${result.seekersNotified ?? 0} seekers notified, ${result.jobsIncluded ?? 0} jobs included.`,
      );
    } catch (err) {
      setOpsError(
        err instanceof ApiError ? err.message : 'Failed to run job alert digest.',
      );
    } finally {
      setIsRunningDigest(false);
    }
  };

  const handleExpireOffers = async () => {
    setOpsError(null);
    setOpsMessage(null);
    setIsExpiringOffers(true);
    try {
      const result = await expireStaleOffers();
      setOpsMessage(`Expired ${result.offersExpired ?? 0} stale offers.`);
    } catch (err) {
      setOpsError(
        err instanceof ApiError ? err.message : 'Failed to expire stale offers.',
      );
    } finally {
      setIsExpiringOffers(false);
    }
  };

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
                Platform operations
              </h2>

              {opsError && (
                <div className="mb-4">
                  <FormAlert message={opsError} />
                </div>
              )}
              {opsMessage && (
                <div className="mb-4">
                  <FormAlert message={opsMessage} variant="success" />
                </div>
              )}

              <div className="space-y-4">
                <div className="p-4 border border-slate-200 rounded-xl">
                  <h4 className="font-bold text-slate-900 mb-1">
                    Run job alert digest
                  </h4>
                  <p className="text-sm text-slate-600 mb-4">
                    Send digest notifications to seekers with active job alerts.
                  </p>
                  <button
                    type="button"
                    onClick={() => void handleRunDigest()}
                    disabled={isRunningDigest}
                    className="bg-danger text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-danger-600 disabled:opacity-60">
                    {isRunningDigest ? 'Running…' : 'Run digest'}
                  </button>
                </div>

                <div className="p-4 border border-slate-200 rounded-xl">
                  <h4 className="font-bold text-slate-900 mb-1">
                    Expire stale offers
                  </h4>
                  <p className="text-sm text-slate-600 mb-4">
                    Mark past-due pending offers as expired.
                  </p>
                  <button
                    type="button"
                    onClick={() => void handleExpireOffers()}
                    disabled={isExpiringOffers}
                    className="bg-white border border-danger text-danger px-4 py-2 rounded-xl text-sm font-bold hover:bg-danger-50 disabled:opacity-60">
                    {isExpiringOffers ? 'Processing…' : 'Expire stale offers'}
                  </button>
                </div>
              </div>
            </div>
          }

          {/* Placeholders for other tabs */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-2xl shadow-soft border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-2">
                Your admin account
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Change your password or deactivate your personal admin account.
              </p>
              <Link
                to="/settings/account"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-600">
                <Lock size={16} />
                Manage account security
              </Link>
            </div>
          )}

          {['email', 'notifications'].includes(activeTab) &&
          <div className="bg-white rounded-2xl shadow-soft border border-slate-200 p-6 flex flex-col items-center justify-center h-64 text-slate-500">
              <Settings size={48} className="mb-4 opacity-20" />
              <p>Settings panel for {activeTab} is under construction.</p>
            </div>
          }
        </div>
      </div>
    </div>);

}