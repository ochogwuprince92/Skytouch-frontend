import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { JobCard } from '../../components/JobCard';
import { PaginatedList } from '../../components/PaginatedList';
import { listMySavedJobs, unsaveJob } from '../../services/savedJobsService';
import type { JobSummary } from '../../types/job';

export function SeekerSavedJobsPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchPage = useCallback(
    (page: number, size: number) => listMySavedJobs(page, size),
    [],
  );

  const handleUnsave = async (job: JobSummary) => {
    await unsaveJob(job.id);
    setRefreshKey((k) => k + 1);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Saved jobs</h1>
        <p className="text-slate-600">
          Jobs you've bookmarked for later.{' '}
          <Link to="/seeker/jobs" className="text-primary font-semibold hover:underline">
            Browse more →
          </Link>
        </p>
      </div>

      <PaginatedList
        refreshKey={refreshKey}
        fetchPage={fetchPage}
        emptyMessage="No saved jobs yet. Save jobs from the listings page."
        listClassName="space-y-4"
        renderItem={(job: JobSummary) => (
          <div className="relative">
            <JobCard job={{ ...job, saved: true }} showSave={false} />
            <button
              type="button"
              onClick={() => void handleUnsave(job)}
              className="absolute top-6 right-6 text-sm font-semibold text-danger hover:underline">
              Unsave
            </button>
          </div>
        )}
        getItemKey={(job) => job.id}
      />
    </div>
  );
}
