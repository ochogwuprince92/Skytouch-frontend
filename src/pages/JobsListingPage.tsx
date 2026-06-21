import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Filter,
  ChevronDown,
  BookmarkPlus,
  Building2,
  Clock,
  DollarSign } from
'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const jobs = [
{
  id: 1,
  title: 'Senior Full Stack Engineer',
  company: 'TechNova',
  logo: 'TN',
  location: 'San Francisco, CA',
  type: 'Full-time',
  salary: '$150k - $200k',
  tags: ['React', 'Node.js', 'AWS'],
  postedAt: '2 hours ago',
  color: 'bg-blue-500',
  workplaceType: 'Hybrid'
},
{
  id: 2,
  title: 'Product Design Lead',
  company: 'CreativeFlow',
  logo: 'CF',
  location: 'Remote',
  type: 'Full-time',
  salary: '$130k - $170k',
  tags: ['Figma', 'UX Research', 'Design Systems'],
  postedAt: '5 hours ago',
  color: 'bg-purple-500',
  workplaceType: 'Remote'
},
{
  id: 3,
  title: 'VP of Engineering',
  company: 'ScaleUp Inc',
  logo: 'SU',
  location: 'New York, NY',
  type: 'Full-time',
  salary: '$200k - $250k',
  tags: ['Leadership', 'System Architecture'],
  postedAt: '1 day ago',
  color: 'bg-emerald-500',
  workplaceType: 'Onsite'
},
{
  id: 4,
  title: 'Data Scientist',
  company: 'DataMinds',
  logo: 'DM',
  location: 'London, UK',
  type: 'Contract',
  salary: '£80k - £110k',
  tags: ['Python', 'Machine Learning', 'SQL'],
  postedAt: '2 days ago',
  color: 'bg-orange-500',
  workplaceType: 'Hybrid'
},
{
  id: 5,
  title: 'Frontend Developer',
  company: 'WebWorks',
  logo: 'WW',
  location: 'Austin, TX',
  type: 'Full-time',
  salary: '$110k - $140k',
  tags: ['Vue.js', 'Tailwind CSS', 'TypeScript'],
  postedAt: '3 days ago',
  color: 'bg-teal-500',
  workplaceType: 'Remote'
},
{
  id: 6,
  title: 'DevOps Engineer',
  company: 'CloudSync',
  logo: 'CS',
  location: 'Seattle, WA',
  type: 'Full-time',
  salary: '$140k - $180k',
  tags: ['Kubernetes', 'Docker', 'CI/CD'],
  postedAt: '4 days ago',
  color: 'bg-indigo-500',
  workplaceType: 'Hybrid'
}];

export function JobsListingPage() {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      {/* Search Header */}
      <div className="bg-primary-900 py-12 px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            Find your next dream job
          </h1>
          <div className="bg-white p-2 rounded-2xl shadow-lg max-w-4xl mx-auto flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-slate-100">
              <Search className="text-slate-400 mr-3" size={20} />
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                className="bg-transparent border-none outline-none w-full text-slate-700 placeholder:text-slate-400" />
              
            </div>
            <div className="flex-1 flex items-center px-4 py-2">
              <MapPin className="text-slate-400 mr-3" size={20} />
              <input
                type="text"
                placeholder="City, state, or remote"
                className="bg-transparent border-none outline-none w-full text-slate-700 placeholder:text-slate-400" />
              
            </div>
            <button className="bg-primary hover:bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold transition-all md:w-auto w-full">
              Search Jobs
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <button
            className="lg:hidden flex items-center justify-center gap-2 bg-white border border-slate-200 p-3 rounded-xl font-medium text-slate-700"
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}>
            
            <Filter size={20} />
            Filters
          </button>

          {/* Sidebar Filters */}
          <div
            className={`lg:w-1/4 ${isMobileFiltersOpen ? 'block' : 'hidden'} lg:block`}>
            
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900">Filters</h2>
                <button className="text-sm text-primary font-medium hover:text-primary-600">
                  Clear all
                </button>
              </div>

              {/* Workplace Type */}
              <div className="mb-6">
                <h3 className="font-semibold text-slate-900 mb-3">
                  Workplace Type
                </h3>
                <div className="space-y-2">
                  {['Remote', 'Hybrid', 'Onsite'].map((type) =>
                  <label
                    key={type}
                    className="flex items-center gap-3 cursor-pointer">
                    
                      <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" />
                    
                      <span className="text-slate-600">{type}</span>
                    </label>
                  )}
                </div>
              </div>

              {/* Employment Type */}
              <div className="mb-6">
                <h3 className="font-semibold text-slate-900 mb-3">
                  Employment Type
                </h3>
                <div className="space-y-2">
                  {['Full-time', 'Part-time', 'Contract', 'Internship'].map(
                    (type) =>
                    <label
                      key={type}
                      className="flex items-center gap-3 cursor-pointer">
                      
                        <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" />
                      
                        <span className="text-slate-600">{type}</span>
                      </label>

                  )}
                </div>
              </div>

              {/* Experience Level */}
              <div className="mb-6">
                <h3 className="font-semibold text-slate-900 mb-3">
                  Experience Level
                </h3>
                <div className="space-y-2">
                  {[
                  'Entry Level',
                  'Mid Level',
                  'Senior Level',
                  'Director',
                  'Executive'].
                  map((level) =>
                  <label
                    key={level}
                    className="flex items-center gap-3 cursor-pointer">
                    
                      <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary" />
                    
                      <span className="text-slate-600">{level}</span>
                    </label>
                  )}
                </div>
              </div>

              {/* Salary Range */}
              <div className="mb-6">
                <h3 className="font-semibold text-slate-900 mb-3">
                  Salary Range
                </h3>
                <div className="space-y-2">
                  {[
                  'Under $50k',
                  '$50k - $100k',
                  '$100k - $150k',
                  '$150k+'].
                  map((range) =>
                  <label
                    key={range}
                    className="flex items-center gap-3 cursor-pointer">
                    
                      <input
                      type="radio"
                      name="salary"
                      className="w-4 h-4 border-slate-300 text-primary focus:ring-primary" />
                    
                      <span className="text-slate-600">{range}</span>
                    </label>
                  )}
                </div>
              </div>

              {/* Date Posted */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">
                  Date Posted
                </h3>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                  <option>Any time</option>
                  <option>Past 24 hours</option>
                  <option>Past week</option>
                  <option>Past month</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <p className="text-slate-600 font-medium">
                Showing <span className="text-slate-900 font-bold">2,451</span>{' '}
                jobs
              </p>
              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-sm">Sort by:</span>
                <select className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary font-medium">
                  <option>Most Relevant</option>
                  <option>Most Recent</option>
                  <option>Highest Salary</option>
                  <option>Company Rating</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {jobs.map((job, index) =>
              <motion.div
                key={job.id}
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05
                }}
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary/30 hover:shadow-card transition-all group">
                
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl ${job.color}`}>
                      
                        {job.logo}
                      </div>
                      <div>
                        <Link
                        to={`/jobs/${job.id}`}
                        className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors block mb-1">
                        
                          {job.title}
                        </Link>
                        <div className="flex items-center text-slate-500">
                          <Building2 size={16} className="mr-1.5" />
                          <span className="font-medium mr-3">
                            {job.company}
                          </span>
                          <span className="flex items-center text-yellow-500 text-sm font-medium">
                            ★ 4.8
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-primary transition-colors p-2 hover:bg-primary-50 rounded-lg">
                      <BookmarkPlus size={20} />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-5">
                    <div className="flex items-center text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                      <MapPin size={14} className="mr-1.5 text-slate-400" />
                      {job.location} ({job.workplaceType})
                    </div>
                    <div className="flex items-center text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                      <Clock size={14} className="mr-1.5 text-slate-400" />
                      {job.type}
                    </div>
                    <div className="flex items-center text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                      <DollarSign size={14} className="mr-1.5 text-slate-400" />
                      {job.salary}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex gap-2">
                      {job.tags.map((tag) =>
                    <span
                      key={tag}
                      className="text-xs font-medium text-primary bg-primary-50 px-2.5 py-1 rounded-md">
                      
                          {tag}
                        </span>
                    )}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-slate-400 font-medium">
                        {job.postedAt}
                      </span>
                      <Link
                      to={`/jobs/${job.id}`}
                      className="text-sm font-semibold text-primary hover:text-primary-600">
                      
                        Apply Now →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <div className="flex gap-2">
                <button
                  className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-50"
                  disabled>
                  
                  ←
                </button>
                <button className="w-10 h-10 rounded-lg bg-primary text-white font-medium flex items-center justify-center">
                  1
                </button>
                <button className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 font-medium hover:bg-slate-50">
                  2
                </button>
                <button className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-700 font-medium hover:bg-slate-50">
                  3
                </button>
                <span className="w-10 h-10 flex items-center justify-center text-slate-400">
                  ...
                </span>
                <button className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50">
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}