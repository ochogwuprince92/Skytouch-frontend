import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Briefcase, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function SettingsLayout() {
  const { user, dashboardPath } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <Briefcase size={18} strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold text-slate-900">
              Skytouch<span className="text-primary">Jobs</span>
            </span>
          </Link>

          {dashboardPath && (
            <Link
              to={dashboardPath}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900">
              <ArrowLeft size={16} />
              Back to dashboard
            </Link>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {user && (
          <p className="text-sm text-slate-500 mb-6">
            Signed in as{' '}
            <span className="font-medium text-slate-700">{user.email}</span>
          </p>
        )}
        <Outlet />
      </main>
    </div>
  );
}
