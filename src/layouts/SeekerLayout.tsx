import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  Briefcase,
  LayoutDashboard,
  User,
  FileText,
  Bookmark,
  Bell,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Search } from
'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useLogout } from '../hooks/useLogout';
import { NotificationBell } from '../components/NotificationBell';
export function SeekerLayout() {
  const { user } = useAuth();
  const handleLogout = useLogout();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();
  // Close drawer on navigation
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location.pathname]);
  const navItems = [
  {
    name: 'Dashboard',
    path: '/seeker/dashboard',
    icon: <LayoutDashboard size={20} />
  },
  {
    name: 'My Profile',
    path: '/seeker/profile',
    icon: <User size={20} />
  },
  {
    name: 'Applications',
    path: '/seeker/applications',
    icon: <FileText size={20} />
  },
  {
    name: 'Saved Jobs',
    path: '/seeker/saved',
    icon: <Bookmark size={20} />
  },
  {
    name: 'Job Alerts',
    path: '/seeker/alerts',
    icon: <Bell size={20} />
  },
  {
    name: 'Messages',
    path: '/seeker/messages',
    icon: <MessageSquare size={20} />
  },
  {
    name: 'Settings',
    path: '/seeker/settings',
    icon: <Settings size={20} />
  }];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Scrim */}
      <AnimatePresence>
        {isDrawerOpen &&
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 0.2
          }}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40"
          onClick={() => setIsDrawerOpen(false)}
          aria-hidden="true" />

        }
      </AnimatePresence>

      {/* Drawer Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-slate-900 text-slate-300 z-50 flex flex-col transform transition-transform duration-300 ease-out shadow-2xl ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Seeker navigation">
        
        <div className="p-6 flex items-center justify-between border-b border-slate-800">
          <Link
            to="/"
            className="flex items-center gap-2.5 cursor-pointer group">
            
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <Briefcase size={18} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Skytouch<span className="text-slate-500 font-medium">Jobs</span>
            </span>
          </Link>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="text-slate-400 hover:text-white transition-colors p-1"
            aria-label="Close menu">
            
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-colors ${isActive ? 'bg-primary text-white shadow-soft' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                
                <div className="flex items-center gap-3">
                  {item.icon}
                  {item.name}
                </div>
                {item.badge &&
                <span className="bg-danger text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                }
              </Link>);

          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl font-medium text-slate-400 hover:bg-slate-800 hover:text-danger transition-colors">
            <LogOut size={20} />
            Log out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 p-2 rounded-lg transition-colors"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open menu">
              
              <Menu size={22} />
            </button>
            <div className="hidden sm:flex items-center bg-slate-50 rounded-xl px-4 py-2.5 border border-slate-200 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all w-64 lg:w-96">
              <Search className="text-slate-400 mr-2" size={18} />
              <input
                type="text"
                placeholder="Search jobs..."
                className="bg-transparent border-none outline-none w-full text-slate-700 placeholder:text-slate-400 text-sm" />
              
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <NotificationBell
              resolveApplicationHref={(id) => `/seeker/applications/${id}`}
            />
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-slate-900">
                  {user?.email.split('@')[0] ?? 'User'}
                </p>
                <p className="text-xs text-slate-500">Job seeker</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                {(user?.email?.[0] ?? 'U').toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>);

}