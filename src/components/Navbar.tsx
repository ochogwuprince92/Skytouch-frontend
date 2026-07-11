import React, { useEffect, useState } from 'react';
import { Briefcase, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-white/80 backdrop-blur-lg border-slate-200/50 py-3' : 'bg-white border-transparent py-5'}`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 cursor-pointer group">
            
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white transition-transform group-hover:scale-105">
              <Briefcase size={16} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              SkyTouch<span className="text-slate-400 font-medium">Jobs</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/jobs"
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
              
              Find Jobs
            </Link>
            <Link
              to="/companies"
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
              
              Companies
            </Link>
            <Link
              to="/pricing"
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
              
              Pricing
            </Link>
            <div className="relative group cursor-pointer">
              <div className="flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                Platform
                <ChevronDown
                  size={14}
                  className="group-hover:rotate-180 transition-transform duration-200 opacity-50" />
                
              </div>
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 px-4 py-2 transition-colors">
              
              Log in
            </Link>
            <Link
              to="/register?role=employer"
              className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm">
              
              Post a Job
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-slate-900 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen &&
        <motion.div
          initial={{
            opacity: 0,
            y: -10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            y: -10
          }}
          transition={{
            duration: 0.2
          }}
          className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-slate-100 md:hidden">
          
            <div className="flex flex-col p-6 gap-6">
              <Link to="/jobs" className="text-lg font-semibold text-slate-900">
                Find Jobs
              </Link>
              <Link
              to="/companies"
              className="text-lg font-semibold text-slate-900">
              
                Companies
              </Link>
              <Link
              to="/pricing"
              className="text-lg font-semibold text-slate-900">
              
                Pricing
              </Link>
              <hr className="border-slate-100" />
              <Link
              to="/login"
              className="text-lg font-semibold text-slate-600">
              
                Log in
              </Link>
              <Link
              to="/register?role=employer"
              className="bg-slate-900 text-white p-4 rounded-xl font-semibold text-center block">
              
                Post a Job
              </Link>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </header>);

}