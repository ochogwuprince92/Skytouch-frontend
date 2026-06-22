import React from 'react'
import { Link } from 'react-router-dom'
import { LogoMark } from './LogoMark'
export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <Link
              to="/"
              className="flex items-center gap-2.5 mb-6 group inline-flex"
            >
              <LogoMark className="w-8 h-8 rounded-lg" />
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                SkyTouch<span className="text-slate-400 font-medium">Jobs</span>
              </span>
            </Link>
            <p className="text-slate-500 mb-8 max-w-sm leading-relaxed text-sm">
              The premier enterprise recruitment marketplace connecting
              world-class talent with industry-leading companies globally.
            </p>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-6 text-sm">
              For Job Seekers
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  to="/jobs"
                  className="text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/companies"
                  className="text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Browse Companies
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Salary Calculator
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Career Advice
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-6 text-sm">
              For Employers
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link
                  to="/auth/register?role=employer"
                  className="text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Search Resumes
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Applicant Tracking
                </a>
              </li>
              <li>
                <Link
                  to="/pricing"
                  className="text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-bold mb-6 text-sm">Company</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="#"
                  className="text-slate-500 hover:text-slate-900 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>
            © {new Date().getFullYear()} Skytouch Jobs. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-900 transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-slate-900 transition-colors">
              LinkedIn
            </a>
            <a href="#" className="hover:text-slate-900 transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
