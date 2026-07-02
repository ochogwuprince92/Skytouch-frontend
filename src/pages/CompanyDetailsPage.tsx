import React, { useEffect, useState } from 'react';
import {
  MapPin,
  Building2,
  Users,
  Star,
  ExternalLink,
  Plus,
  CheckCircle2,
  Calendar,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { FormAlert } from '../components/FormAlert';
import { JobCard } from '../components/JobCard';
import { useAuth } from '../context/AuthContext';
import { ApiError } from '../lib/api';
import { companyColor, companyInitials } from '../lib/format';
import { getCompany } from '../services/companyService';
import { getCompanyJobs } from '../services/jobService';
import type { CompanyDetail } from '../types/company';
import type { JobSummary } from '../types/job';

export function CompanyDetailsPage() {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isFollowing, setIsFollowing] = useState(false);
  const [company, setCompany] = useState<CompanyDetail | null>(null);
  const [jobs, setJobs] = useState<JobSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const companyId = id;
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        const [companyData, jobsData] = await Promise.all([
          getCompany(companyId),
          getCompanyJobs(companyId, 0, 10),
        ]);
        if (!cancelled) {
          setCompany(companyData);
          setJobs(jobsData.content);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError ? err.message : 'Failed to load company.',
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !company) {
    return (
      <div className="pt-24 pb-20 max-w-2xl mx-auto px-4">
        <FormAlert message={error ?? 'Company not found.'} />
        <Link to="/companies" className="mt-6 inline-block text-primary font-semibold">
          ← Back to companies
        </Link>
      </div>
    );
  }

  const color = companyColor(company.name);
  const logo = companyInitials(company.name);
  const coverImage =
    company.coverUrl ??
    'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80';
  const perks = company.specialties?.map((title) => ({ icon: null, title, desc: '' })) ?? [];
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Cover Banner */}
      <div className="h-64 md:h-80 w-full relative">
        <img
          src={coverImage}
          alt={`${company.name} office`}
          className="w-full h-full object-cover" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        {/* Company Header Card */}
        <div className="bg-white rounded-2xl shadow-card p-6 md:p-8 border border-slate-200 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              <div
                className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl flex items-center justify-center text-white font-bold text-4xl md:text-5xl ${color} shadow-lg border-4 border-white shrink-0 overflow-hidden`}>
                {company.logoUrl ? (
                  <img
                    src={company.logoUrl}
                    alt={company.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  logo
                )}
              </div>
              <div className="pb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                  {company.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-slate-600 text-sm md:text-base">
                  <span className="flex items-center">
                    <Building2 size={18} className="mr-1.5 text-slate-400" />{' '}
                    {company.industry ?? '—'}
                  </span>
                  <span className="hidden md:inline text-slate-300">•</span>
                  <span className="flex items-center">
                    <Users size={18} className="mr-1.5 text-slate-400" />{' '}
                    {company.size ?? '—'}
                  </span>
                  <span className="hidden md:inline text-slate-300">•</span>
                  <span className="flex items-center">
                    <MapPin size={18} className="mr-1.5 text-slate-400" />{' '}
                    {company.location ?? '—'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pb-2 w-full md:w-auto">
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${isFollowing ? 'bg-slate-100 text-slate-700 hover:bg-slate-200' : 'bg-primary text-white hover:bg-primary-600 shadow-soft'}`}>
                
                {isFollowing ? <CheckCircle2 size={20} /> : <Plus size={20} />}
                {isFollowing ? 'Following' : 'Follow'}
              </button>
              {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-6 py-3 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                
                <ExternalLink size={20} />
                Visit Website
              </a>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100">
            <div className="text-center md:text-left">
              <p className="text-slate-500 text-sm font-medium mb-1">
                Open Roles
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {company.openJobsCount ?? 0}
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-slate-500 text-sm font-medium mb-1">
                Followers
              </p>
              <p className="text-2xl font-bold text-slate-900">
                {company.followersCount ?? '—'}
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-slate-500 text-sm font-medium mb-1">Founded</p>
              <p className="text-2xl font-bold text-slate-900">
                {company.founded ?? '—'}
              </p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-slate-500 text-sm font-medium mb-1">Rating</p>
              <div className="flex items-center justify-center md:justify-start gap-1">
                <p className="text-2xl font-bold text-slate-900">
                  {(company.rating ?? 0).toFixed(1)}
                </p>
                <Star size={20} className="text-yellow-500 fill-yellow-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar mb-8 border-b border-slate-200">
          {['overview', 'jobs', 'reviews', 'life'].map((tab) =>
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 font-semibold text-sm md:text-base whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
            
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'jobs' &&
            <span className="ml-2 bg-primary-50 text-primary px-2 py-0.5 rounded-full text-xs">
                  {company.openJobsCount ?? 0}
                </span>
            }
            </button>
          )}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' &&
            <motion.div
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.3
              }}>
              
                <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    About {company.name}
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {company.description ?? 'No description available.'}
                  </p>

                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">
                      Specialties
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {(company.specialties ?? []).map((spec) =>
                    <span
                      key={spec}
                      className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-700 text-sm font-medium">
                      
                          {spec}
                        </span>
                    )}
                    </div>
                  </div>
                </section>

                {(company.specialties ?? []).length > 0 && (
                <section className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    Perks & Benefits
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {perks.map((perk, i) => (
                  <div key={i} className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary flex items-center justify-center shrink-0">
                          <Building2 size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900 mb-1">
                            {perk.title}
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
                )}
              </motion.div>
            }

            {/* JOBS TAB */}
            {activeTab === 'jobs' &&
            <motion.div
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.3
              }}
              className="space-y-4">
              
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">
                    Open Roles
                  </h2>
                  <div className="flex gap-2">
                    <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 text-sm outline-none focus:border-primary">
                      <option>All Departments</option>
                      <option>Engineering</option>
                      <option>Product</option>
                    </select>
                  </div>
                </div>

                {jobs.length === 0 ? (
                  <p className="text-slate-500 text-center py-12">
                    No open roles at this company right now.
                  </p>
                ) : (
                  jobs.map((job) => (
                    <JobCard key={job.id} job={job} showSave={false} />
                  ))
                )}
              </motion.div>
            }

            {/* REVIEWS TAB */}
            {activeTab === 'reviews' &&
            <motion.div
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.3
              }}>
              
                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center text-slate-500">
                  Employee reviews are not available yet.
                </div>
              </motion.div>
            }

            {/* LIFE TAB */}
            {activeTab === 'life' &&
            <motion.div
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.3
              }}
              className="space-y-8">
              
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    Life at {company.name}
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-8">
                    We believe that doing your best work requires a supportive,
                    inclusive, and dynamic environment. From our annual company
                    retreats to weekly tech talks and hackathons, we foster a
                    culture of continuous learning and collaboration.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <img
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Team collaboration"
                      className="w-full h-64 object-cover rounded-xl" />
                    
                      <h3 className="font-bold text-slate-900 text-lg">
                        Collaborative Environment
                      </h3>
                      <p className="text-slate-600 text-sm">
                        We work in cross-functional teams, ensuring everyone has
                        a voice in the product direction.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <img
                      src="https://images.unsplash.com/photo-1515169067868-5387ec356754?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Company event"
                      className="w-full h-64 object-cover rounded-xl" />
                    
                      <h3 className="font-bold text-slate-900 text-lg">
                        Annual Retreats
                      </h3>
                      <p className="text-slate-600 text-sm">
                        Once a year, we bring the entire global team together
                        for a week of planning, learning, and fun.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            }
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">Company Details</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Building2
                    size={20}
                    className="text-slate-400 shrink-0 mt-0.5" />
                  
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Industry
                    </p>
                    <p className="text-sm text-slate-600">{company.industry}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Users size={20} className="text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Company Size
                    </p>
                    <p className="text-sm text-slate-600">{company.size}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin
                    size={20}
                    className="text-slate-400 shrink-0 mt-0.5" />
                  
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Headquarters
                    </p>
                    <p className="text-sm text-slate-600">{company.location}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar
                    size={20}
                    className="text-slate-400 shrink-0 mt-0.5" />
                  
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Founded
                    </p>
                    <p className="text-sm text-slate-600">{company.founded}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-primary-50 rounded-2xl p-6 border border-primary-100">
              <h3 className="font-bold text-primary-900 mb-2">
                Want to work here?
              </h3>
              <p className="text-primary-700 text-sm mb-4">
                Get notified when {company.name} posts new roles that match your
                skills.
              </p>
              {isAuthenticated && user?.role === 'JOB_SEEKER' ? (
                <Link
                  to={`/seeker/alerts?create=1&keyword=${encodeURIComponent(company.name)}${company.industry ? `&industry=${encodeURIComponent(company.industry)}` : ''}`}
                  className="block w-full text-center bg-primary text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-primary-600 transition-colors shadow-soft">
                  Create job alert
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="block w-full text-center bg-primary text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-primary-600 transition-colors shadow-soft">
                  Sign in to create alert
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>);

}