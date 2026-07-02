import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  MapPin,
  Clock,
  DollarSign,
  BookmarkPlus,
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  companyColor,
  companyInitials,
  formatEmploymentType,
  formatLocation,
  formatRelativeTime,
  formatSalary,
  formatWorkType,
} from '../lib/format';
import type { JobSummary } from '../types/job';

interface JobCardProps {
  job: JobSummary;
  index?: number;
  showSave?: boolean;
  saved?: boolean;
  onToggleSave?: (job: JobSummary, saved: boolean) => void;
}

export function JobCard({
  job,
  index = 0,
  showSave = true,
  saved,
  onToggleSave,
}: JobCardProps) {
  const color = companyColor(job.companyName);
  const logo = companyInitials(job.companyName);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary/30 hover:shadow-card transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl ${color}`}>
            {logo}
          </div>
          <div>
            <Link
              to={`/jobs/${job.id}`}
              className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors block mb-1">
              {job.title}
            </Link>
            <div className="flex items-center text-slate-500">
              <Building2 size={16} className="mr-1.5" />
              <span className="font-medium">{job.companyName}</span>
            </div>
          </div>
        </div>
        {showSave && onToggleSave && (
          <button
            type="button"
            onClick={() => onToggleSave(job, !(saved ?? job.saved))}
            className={`transition-colors p-2 rounded-lg ${
              saved ?? job.saved
                ? 'text-primary bg-primary-50'
                : 'text-slate-400 hover:text-primary hover:bg-primary-50'
            }`}
            aria-label={saved ?? job.saved ? 'Unsave job' : 'Save job'}>
            <BookmarkPlus size={20} />
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3 mb-5">
        <div className="flex items-center text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
          <MapPin size={14} className="mr-1.5 text-slate-400" />
          {formatLocation(job.locationState, job.locationLga)} (
          {formatWorkType(job.workMode)})
        </div>
        <div className="flex items-center text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
          <Clock size={14} className="mr-1.5 text-slate-400" />
          {formatEmploymentType(job.employmentType)}
        </div>
        <div className="flex items-center text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
          <DollarSign size={14} className="mr-1.5 text-slate-400" />
          {formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
        </div>
      </div>

      <div className="flex items-center justify-end pt-4 border-t border-slate-100">
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-400 font-medium">
            {formatRelativeTime(job.publishedAt ?? job.createdAt)}
          </span>
          <Link
            to={`/jobs/${job.id}`}
            className="text-sm font-semibold text-primary hover:text-primary-600">
            View job →
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
