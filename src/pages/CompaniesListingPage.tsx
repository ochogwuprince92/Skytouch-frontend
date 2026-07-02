import React, { useCallback, useMemo, useState } from 'react';
import {
  Search,
  MapPin,
  Building2,
  Users,
  Star,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PaginatedList } from '../components/PaginatedList';
import { searchCompanies } from '../services/companyService';
import { companyColor, companyInitials } from '../lib/format';
import type { CompanySummary } from '../types/company';

function CompanyCard({ company }: { company: CompanySummary }) {
  const color = companyColor(company.name);
  const logo = companyInitials(company.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-primary/30 hover:shadow-card transition-all group flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        {company.logoUrl ? (
          <img
            src={company.logoUrl}
            alt={company.name}
            className="w-14 h-14 rounded-xl object-cover"
          />
        ) : (
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl ${color}`}>
            {logo}
          </div>
        )}
        {company.rating != null && (
          <div className="flex items-center gap-1 text-sm font-bold text-yellow-500 bg-yellow-50 px-2 py-1 rounded-lg">
            <Star size={14} fill="currentColor" />
            {company.rating.toFixed(1)}
          </div>
        )}
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">
        {company.name}
      </h3>
      <p className="text-sm font-medium text-slate-500 mb-3">
        {company.industry ?? 'Industry not listed'}
      </p>
      <p className="text-sm text-slate-600 mb-6 line-clamp-3 flex-1">
        {company.description ?? 'No company description available.'}
      </p>

      <div className="flex flex-wrap gap-3 text-sm text-slate-500 mb-6">
        {company.location && (
          <span className="flex items-center gap-1">
            <MapPin size={14} /> {company.location}
          </span>
        )}
        {company.size && (
          <span className="flex items-center gap-1">
            <Users size={14} /> {company.size}
          </span>
        )}
        {company.openJobsCount != null && (
          <span className="flex items-center gap-1">
            <Building2 size={14} /> {company.openJobsCount} open roles
          </span>
        )}
      </div>

      <Link
        to={`/companies/${company.id}`}
        className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-600 mt-auto">
        View company <ArrowRight size={16} />
      </Link>
    </motion.div>
  );
}

export function CompaniesListingPage() {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [searchKey, setSearchKey] = useState(0);

  const filters = useMemo(
    () => ({
      keyword: keyword.trim() || undefined,
      location: location.trim() || undefined,
    }),
    [keyword, location],
  );

  const fetchPage = useCallback(
    (page: number, size: number) => searchCompanies(page, size, filters),
    [filters],
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchKey((k) => k + 1);
  };

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="bg-white border-b border-slate-200 py-12 px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Discover top companies
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Explore company cultures, benefits, and open roles at innovative
            organizations.
          </p>

          <form
            onSubmit={handleSearch}
            className="bg-white p-2 rounded-2xl shadow-card border border-slate-100 max-w-3xl mx-auto flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-slate-100">
              <Search className="text-slate-400 mr-3" size={20} />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Company name or industry"
                className="bg-transparent border-none outline-none w-full text-slate-700 placeholder:text-slate-400"
              />
            </div>
            <div className="flex-1 flex items-center px-4 py-2">
              <MapPin className="text-slate-400 mr-3" size={20} />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                className="bg-transparent border-none outline-none w-full text-slate-700 placeholder:text-slate-400"
              />
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold transition-all md:w-auto w-full">
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PaginatedList
          key={searchKey}
          refreshKey={searchKey}
          fetchPage={fetchPage}
          emptyMessage="No companies found. Try a different search."
          listClassName="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          renderItem={(company) => <CompanyCard company={company} />}
          getItemKey={(company) => company.id}
        />
      </div>
    </div>
  );
}
