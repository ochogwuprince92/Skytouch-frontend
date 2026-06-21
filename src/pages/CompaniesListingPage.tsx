import React from 'react';
import {
  Search,
  MapPin,
  Building2,
  Users,
  Star,
  ArrowRight } from
'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const companies = [
{
  id: 1,
  name: 'TechNova',
  logo: 'TN',
  color: 'bg-blue-500',
  industry: 'Enterprise Software',
  location: 'San Francisco, CA',
  size: '500-1000',
  rating: 4.8,
  openJobs: 24,
  description:
  'Leading provider of cloud-based enterprise software solutions empowering businesses to scale.'
},
{
  id: 2,
  name: 'CreativeFlow',
  logo: 'CF',
  color: 'bg-purple-500',
  industry: 'Design Tools',
  location: 'Remote',
  size: '100-500',
  rating: 4.9,
  openJobs: 12,
  description:
  'Building the next generation of collaborative design and prototyping tools for modern teams.'
},
{
  id: 3,
  name: 'ScaleUp Inc',
  logo: 'SU',
  color: 'bg-emerald-500',
  industry: 'Fintech',
  location: 'New York, NY',
  size: '1000-5000',
  rating: 4.6,
  openJobs: 45,
  description:
  'Democratizing access to financial services through innovative technology and data.'
},
{
  id: 4,
  name: 'DataMinds',
  logo: 'DM',
  color: 'bg-orange-500',
  industry: 'Artificial Intelligence',
  location: 'London, UK',
  size: '50-100',
  rating: 4.7,
  openJobs: 8,
  description:
  'Pioneering machine learning solutions for predictive analytics in healthcare.'
},
{
  id: 5,
  name: 'WebWorks',
  logo: 'WW',
  color: 'bg-teal-500',
  industry: 'E-commerce',
  location: 'Austin, TX',
  size: '10000+',
  rating: 4.2,
  openJobs: 156,
  description:
  'Global marketplace connecting millions of buyers and sellers around the world.'
},
{
  id: 6,
  name: 'CloudSync',
  logo: 'CS',
  color: 'bg-indigo-500',
  industry: 'Cloud Infrastructure',
  location: 'Seattle, WA',
  size: '5000-10000',
  rating: 4.5,
  openJobs: 89,
  description:
  'Secure, scalable, and reliable cloud infrastructure for the modern enterprise.'
}];

export function CompaniesListingPage() {
  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-12 px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Discover Top Companies
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Explore company cultures, benefits, and open roles at the world's
            most innovative organizations.
          </p>

          <div className="bg-white p-2 rounded-2xl shadow-card border border-slate-100 max-w-3xl mx-auto flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-slate-100">
              <Search className="text-slate-400 mr-3" size={20} />
              <input
                type="text"
                placeholder="Company name or industry"
                className="bg-transparent border-none outline-none w-full text-slate-700 placeholder:text-slate-400" />
              
            </div>
            <div className="flex-1 flex items-center px-4 py-2">
              <MapPin className="text-slate-400 mr-3" size={20} />
              <input
                type="text"
                placeholder="Location"
                className="bg-transparent border-none outline-none w-full text-slate-700 placeholder:text-slate-400" />
              
            </div>
            <button className="bg-primary hover:bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold transition-all md:w-auto w-full">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto hide-scrollbar">
            <button className="whitespace-nowrap px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm">
              All Industries
            </button>
            <button className="whitespace-nowrap px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg font-medium text-sm transition-colors">
              Technology
            </button>
            <button className="whitespace-nowrap px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg font-medium text-sm transition-colors">
              Finance
            </button>
            <button className="whitespace-nowrap px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg font-medium text-sm transition-colors">
              Healthcare
            </button>
            <button className="whitespace-nowrap px-4 py-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg font-medium text-sm transition-colors">
              E-commerce
            </button>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-slate-500 text-sm whitespace-nowrap">
              Sort by:
            </span>
            <select className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary font-medium w-full md:w-auto">
              <option>Most Relevant</option>
              <option>Highest Rated</option>
              <option>Most Open Jobs</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company, index) =>
          <motion.div
            key={company.id}
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.4,
              delay: index * 0.1
            }}
            className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-card hover:border-primary/30 transition-all group flex flex-col h-full">
            
              <div className="flex items-start justify-between mb-4">
                <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl ${company.color} shadow-sm`}>
                
                  {company.logo}
                </div>
                <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-md">
                  <Star
                  size={14}
                  className="text-yellow-500 mr-1 fill-yellow-500" />
                
                  <span className="text-sm font-bold text-yellow-700">
                    {company.rating}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">
                {company.name}
              </h3>
              <p className="text-sm text-primary font-medium mb-3">
                {company.industry}
              </p>

              <p className="text-slate-600 text-sm mb-6 flex-grow line-clamp-3">
                {company.description}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center text-sm text-slate-600">
                  <MapPin size={16} className="text-slate-400 mr-2 shrink-0" />
                  <span className="truncate">{company.location}</span>
                </div>
                <div className="flex items-center text-sm text-slate-600">
                  <Users size={16} className="text-slate-400 mr-2 shrink-0" />
                  <span className="truncate">{company.size}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                <span className="text-sm font-medium text-slate-600">
                  <strong className="text-slate-900">{company.openJobs}</strong>{' '}
                  open jobs
                </span>
                <Link
                to={`/companies/${company.id}`}
                className="text-primary font-semibold hover:text-primary-600 flex items-center text-sm">
                
                  View Profile <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </motion.div>
          )}
        </div>

        <div className="mt-12 text-center">
          <button className="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-xl font-semibold transition-all">
            Load More Companies
          </button>
        </div>
      </div>
    </div>);

}