import { useCallback, useMemo, useState } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import { PaginatedList } from '../components/PaginatedList';
import { JobCard } from '../components/JobCard';
import { useAuth } from '../context/AuthContext';
import { searchJobs } from '../services/jobService';
import { saveJob, unsaveJob } from '../services/savedJobsService';
import type { EmploymentType, JobSummary, WorkMode } from '../types/job';

export function JobsListingPage() {
  const { isAuthenticated, user } = useAuth();
  const canSave = isAuthenticated && user?.role === 'JOB_SEEKER';
  const [keyword, setKeyword] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [industry, setIndustry] = useState('');
  const [workMode, setWorkMode] = useState<WorkMode | ''>('');
  const [employmentType, setEmploymentType] = useState<EmploymentType | ''>('');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [searchKey, setSearchKey] = useState(0);

  const filters = useMemo(
    () => ({
      keyword: keyword.trim() || undefined,
      state: stateFilter.trim() || undefined,
      industry: industry.trim() || undefined,
      workMode: workMode || undefined,
      employmentType: employmentType || undefined,
    }),
    [keyword, stateFilter, industry, workMode, employmentType],
  );

  const fetchPage = useCallback(
    (page: number, size: number) => searchJobs(page, size, filters),
    [filters],
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchKey((k) => k + 1);
  };

  const clearFilters = () => {
    setKeyword('');
    setStateFilter('');
    setIndustry('');
    setWorkMode('');
    setEmploymentType('');
    setSearchKey((k) => k + 1);
  };

  const handleToggleSave = async (job: JobSummary, currentlySaved: boolean) => {
    if (!canSave) return;
    if (currentlySaved) await unsaveJob(job.id);
    else await saveJob(job.id);
    setSearchKey((k) => k + 1);
  };

  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="bg-primary-900 py-12 px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            Find your next dream job
          </h1>
          <form
            onSubmit={handleSearch}
            className="bg-white p-2 rounded-2xl shadow-lg max-w-4xl mx-auto flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center px-4 py-2 border-b md:border-b-0 md:border-r border-slate-100">
              <Search className="text-slate-400 mr-3" size={20} />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Job title, keywords, or company"
                className="bg-transparent border-none outline-none w-full text-slate-700 placeholder:text-slate-400"
              />
            </div>
            <div className="flex-1 flex items-center px-4 py-2">
              <MapPin className="text-slate-400 mr-3" size={20} />
              <input
                type="text"
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                placeholder="State (e.g. Lagos)"
                className="bg-transparent border-none outline-none w-full text-slate-700 placeholder:text-slate-400"
              />
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold transition-all md:w-auto w-full">
              Search jobs
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <button
            type="button"
            className="lg:hidden flex items-center justify-center gap-2 bg-white border border-slate-200 p-3 rounded-xl font-medium text-slate-700"
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}>
            <Filter size={20} />
            Filters
          </button>

          <div
            className={`lg:w-1/4 ${isMobileFiltersOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900">Filters</h2>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-sm text-primary font-medium hover:text-primary-600">
                  Clear all
                </button>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-slate-900 mb-3">
                  Workplace type
                </h3>
                <div className="space-y-2">
                  {(['REMOTE', 'HYBRID', 'ONSITE'] as WorkMode[]).map(
                    (mode) => (
                      <label
                        key={mode}
                        className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="workMode"
                          checked={workMode === mode}
                          onChange={() => {
                            setWorkMode(mode);
                            setSearchKey((k) => k + 1);
                          }}
                          className="w-4 h-4 border-slate-300 text-primary focus:ring-primary"
                        />
                        <span className="text-slate-600">
                          {mode.charAt(0) + mode.slice(1).toLowerCase()}
                        </span>
                      </label>
                    ),
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-slate-900 mb-3">
                  Employment type
                </h3>
                <select
                  value={employmentType}
                  onChange={(e) => {
                    setEmploymentType(e.target.value as EmploymentType | '');
                    setSearchKey((k) => k + 1);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                  <option value="">Any type</option>
                  <option value="FULL_TIME">Full-time</option>
                  <option value="PART_TIME">Part-time</option>
                  <option value="CONTRACT">Contract</option>
                  <option value="INTERNSHIP">Internship</option>
                </select>
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Industry</h3>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  onBlur={() => setSearchKey((k) => k + 1)}
                  placeholder="e.g. Fintech"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          <div className="lg:w-3/4">
            <PaginatedList
              key={searchKey}
              refreshKey={searchKey}
              fetchPage={fetchPage}
              emptyMessage="No jobs match your search. Try adjusting your filters."
              listClassName="space-y-4"
              renderItem={(job) => (
                <JobCard
                  job={job}
                  showSave={canSave}
                  onToggleSave={canSave ? handleToggleSave : undefined}
                />
              )}
              getItemKey={(job) => job.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
