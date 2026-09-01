import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Building2, Download, ExternalLink, Loader2 } from 'lucide-react';
import { ApplicationStatusBadge, EMPLOYER_STATUS_OPTIONS } from '../../components/ApplicationStatusBadge';
import { FormAlert } from '../../components/FormAlert';
import { ApplicationMessagesTab } from '../../components/applications/ApplicationMessagesTab';
import { ApplicationInterviewsTab } from '../../components/applications/ApplicationInterviewsTab';
import { ApplicationOffersTab } from '../../components/applications/ApplicationOffersTab';
import { ApiError, API_BASE_URL } from '../../lib/api';
import { companyInitials, formatDate, formatRelativeTime } from '../../lib/format';
import { listJobApplicants, updateApplicationStatus } from '../../services/jobService';
import {
  getMyApplication,
  withdrawApplication,
} from '../../services/seekerService';
import type { ApplicationResponse, ApplicationStatus } from '../../types/application';

type TabId = 'overview' | 'messages' | 'interviews' | 'offers';

interface ApplicationDetailPageProps {
  role: 'JOB_SEEKER' | 'EMPLOYER' | 'ADMIN';
}

export function ApplicationDetailPage({ role }: ApplicationDetailPageProps) {
  const { id, jobId } = useParams();
  const isEmployer = role === 'EMPLOYER';
  const isAdmin = role === 'ADMIN';

  const [application, setApplication] = useState<ApplicationResponse | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [statusComment, setStatusComment] = useState('');
  const [showCommentField, setShowCommentField] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<ApplicationStatus | null>(null);

  const backPath = isEmployer ? '/employer/ats' : isAdmin ? '/admin/jobs' : '/seeker/applications';

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);
      try {
        if (isEmployer || isAdmin) {
          if (!jobId) throw new Error('Job ID is required.');
          const page = await listJobApplicants(jobId, 0, 100);
          const found = page.content.find((a) => a.id === id);
          if (!found) throw new Error('Application not found.');
          if (!cancelled) setApplication(found);
        } else {
          const data = await getMyApplication(id!);
          if (!cancelled) setApplication(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof ApiError
              ? err.message
              : err instanceof Error
                ? err.message
                : 'Failed to load application.',
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
  }, [id, jobId, isEmployer]);

  const handleStatusChange = async (status: ApplicationStatus) => {
    if (!application || !jobId) return;
    
    // Show comment field for REJECTED status (required by backend)
    if (status === 'REJECTED') {
      setPendingStatus(status);
      setShowCommentField(true);
      return;
    }
    
    setIsUpdating(true);
    setError(null);
    try {
      const updated = await updateApplicationStatus(jobId, application.id, {
        status,
      });
      setApplication(updated);
      setShowCommentField(false);
      setStatusComment('');
      setPendingStatus(null);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Unable to update status.',
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleStatusSubmit = async () => {
    if (!application || !jobId || !pendingStatus) return;
    setIsUpdating(true);
    setError(null);
    try {
      const updated = await updateApplicationStatus(jobId, application.id, {
        status: pendingStatus,
        comment: statusComment.trim() || undefined,
      });
      setApplication(updated);
      setShowCommentField(false);
      setStatusComment('');
      setPendingStatus(null);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Unable to update status.',
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const handleWithdraw = async () => {
    if (!application) return;
    setIsWithdrawing(true);
    setError(null);
    try {
      const updated = await withdrawApplication(application.id);
      setApplication(updated);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Unable to withdraw application.',
      );
    } finally {
      setIsWithdrawing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error && !application) {
    return (
      <div className="max-w-2xl mx-auto">
        <FormAlert message={error} />
        <Link to={backPath} className="mt-4 inline-block text-primary font-semibold">
          ← Back
        </Link>
      </div>
    );
  }

  if (!application) return null;

  const tabs: { id: TabId; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'messages', label: 'Messages' },
    { id: 'interviews', label: 'Interviews' },
    { id: 'offers', label: 'Offers' },
  ];

  const canWithdraw =
    !isEmployer && !isAdmin &&
    !['WITHDRAWN', 'HIRED', 'REJECTED'].includes(application.status);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link
        to={backPath}
        className="inline-flex items-center text-slate-500 hover:text-primary font-medium text-sm">
        <ArrowLeft size={16} className="mr-1.5" />
        Back to applications
      </Link>

      {error && <FormAlert message={error} />}

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600">
              {companyInitials(application.companyName)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {application.jobTitle}
              </h1>
              <p className="text-slate-600 flex items-center gap-1.5 mt-1">
                <Building2 size={16} />
                {application.companyName}
              </p>
              {!isEmployer && (
                <Link
                  to={isAdmin ? `/admin/jobs/${application.jobId}` : `/jobs/${application.jobId}`}
                  className="text-sm text-primary hover:underline inline-flex items-center gap-1 mt-2">
                  View job posting <ExternalLink size={14} />
                </Link>
              )}
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2">
            <ApplicationStatusBadge status={application.status} />
            <span className="text-xs text-slate-400">
              Applied {formatRelativeTime(application.appliedAt)}
            </span>
          </div>
        </div>

        {(isEmployer || isAdmin) && jobId && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <label className="block text-xs font-semibold text-slate-500 mb-1.5">
              Update pipeline status
            </label>
            <select
              value={showCommentField ? pendingStatus : application.status}
              disabled={isUpdating}
              onChange={(e) =>
                void handleStatusChange(e.target.value as ApplicationStatus)
              }
              className="w-full sm:w-64 px-3 py-2 rounded-xl border border-slate-200 text-sm disabled:opacity-60">
              {EMPLOYER_STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
            {showCommentField && (
              <div className="mt-3 space-y-2">
                <textarea
                  value={statusComment}
                  onChange={(e) => setStatusComment(e.target.value)}
                  placeholder="Reason for rejection (required)"
                  rows={2}
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm resize-none"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleStatusSubmit}
                    disabled={isUpdating || !statusComment.trim()}
                    className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold disabled:opacity-60">
                    {isUpdating ? 'Updating…' : 'Confirm'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCommentField(false);
                      setStatusComment('');
                      setPendingStatus(null);
                    }}
                    className="px-4 py-2 text-slate-600 text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            )}
            <p className="text-xs text-slate-500 mt-2">
              Candidate: {application.seekerName} ({application.seekerEmail})
            </p>
          </div>
        )}

        {canWithdraw && (
          <button
            type="button"
            onClick={() => void handleWithdraw()}
            disabled={isWithdrawing}
            className="mt-4 text-sm font-semibold text-danger hover:underline disabled:opacity-60">
            {isWithdrawing ? 'Withdrawing…' : 'Withdraw application'}
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="flex border-b border-slate-200 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-slate-500 font-medium mb-1">Cover letter</p>
                <p className="text-slate-700 whitespace-pre-wrap">
                  {application.coverLetter || 'No cover letter provided.'}
                </p>
              </div>
              {application.cvUrl && (
                <div>
                  <p className="text-slate-500 font-medium mb-1">CV</p>
                  <div className="flex items-center gap-3">
                    <a
                      href={application.cvUrl.startsWith('http') ? application.cvUrl : `${API_BASE_URL}${application.cvUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1">
                      <ExternalLink size={14} />
                      View CV
                    </a>
                    <a
                      href={application.cvUrl.startsWith('http') ? application.cvUrl : `${API_BASE_URL}${application.cvUrl}`}
                      download
                      className="text-primary hover:underline inline-flex items-center gap-1">
                      <Download size={14} />
                      Download
                    </a>
                  </div>
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-slate-500 font-medium">Applied</p>
                  <p className="text-slate-900">
                    {formatDate(application.appliedAt)}
                  </p>
                </div>
                <div>
                  <p className="text-slate-500 font-medium">Last updated</p>
                  <p className="text-slate-900">
                    {formatDate(application.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'messages' && id && (
            <ApplicationMessagesTab applicationId={id} />
          )}

          {activeTab === 'interviews' && id && (
            <ApplicationInterviewsTab
              applicationId={id}
              isEmployer={isEmployer}
            />
          )}

          {activeTab === 'offers' && id && (
            <ApplicationOffersTab applicationId={id} isEmployer={isEmployer} />
          )}
        </div>
      </div>
    </div>
  );
}
