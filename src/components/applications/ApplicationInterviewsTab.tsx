import { useEffect, useState } from 'react';
import { Calendar, Loader2, MapPin } from 'lucide-react';
import { FormAlert } from '../FormAlert';
import { ApiError } from '../../lib/api';
import { formatDate, formatRelativeTime } from '../../lib/format';
import {
  listApplicationInterviews,
  scheduleInterview,
  updateInterview,
} from '../../services/workflowService';
import type { InterviewMode, InterviewResponse } from '../../types/interview';

interface ApplicationInterviewsTabProps {
  applicationId: string;
  isEmployer: boolean;
}

const MODES: InterviewMode[] = ['VIDEO', 'IN_PERSON', 'PHONE'];

export function ApplicationInterviewsTab({
  applicationId,
  isEmployer,
}: ApplicationInterviewsTabProps) {
  const [interviews, setInterviews] = useState<InterviewResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [scheduledAt, setScheduledAt] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('60');
  const [mode, setMode] = useState<InterviewMode>('VIDEO');
  const [locationOrLink, setLocationOrLink] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const load = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await listApplicationInterviews(applicationId);
      setInterviews(data);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Failed to load interviews.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, [applicationId]);

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await scheduleInterview(applicationId, {
        scheduledAt,
        durationMinutes: Number(durationMinutes) || 60,
        mode,
        locationOrLink: locationOrLink.trim() || undefined,
        notes: notes.trim() || undefined,
      });
      setShowForm(false);
      setScheduledAt('');
      setLocationOrLink('');
      setNotes('');
      await load();
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Unable to schedule interview.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = async (id: string) => {
    try {
      await updateInterview(id, { status: 'CANCELLED' });
      await load();
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Unable to update interview.',
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && <FormAlert message={error} />}

      {isEmployer && (
        <div>
          {!showForm ? (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="text-sm font-semibold text-primary hover:underline">
              + Schedule interview
            </button>
          ) : (
            <form
              onSubmit={handleSchedule}
              className="rounded-xl border border-slate-200 p-4 space-y-3 bg-slate-50">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Date & time
                  </label>
                  <input
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    min={15}
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Mode
                </label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value as InterviewMode)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm">
                  {MODES.map((m) => (
                    <option key={m} value={m}>
                      {m.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                value={locationOrLink}
                onChange={(e) => setLocationOrLink(e.target.value)}
                placeholder="Location or meeting link"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm"
              />
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notes (optional)"
                rows={2}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm resize-none"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold disabled:opacity-60">
                  {isSubmitting ? 'Scheduling…' : 'Schedule'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-slate-600 text-sm">
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {interviews.length === 0 ? (
        <p className="text-sm text-slate-500 py-8 text-center">
          No interviews scheduled yet.
        </p>
      ) : (
        <div className="space-y-3">
          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="rounded-xl border border-slate-200 p-4 bg-white">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-900 flex items-center gap-2">
                    <Calendar size={16} className="text-primary" />
                    {formatDate(interview.scheduledAt)} ·{' '}
                    {interview.durationMinutes} min · {interview.mode}
                  </p>
                  {interview.locationOrLink && (
                    <p className="text-sm text-slate-600 mt-1 flex items-center gap-1">
                      <MapPin size={14} />
                      {interview.locationOrLink}
                    </p>
                  )}
                  {interview.notes && (
                    <p className="text-sm text-slate-500 mt-2">
                      {interview.notes}
                    </p>
                  )}
                  <p className="text-xs text-slate-400 mt-2">
                    Scheduled {formatRelativeTime(interview.createdAt)}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${
                      interview.status === 'SCHEDULED'
                        ? 'bg-purple-100 text-purple-700'
                        : interview.status === 'COMPLETED'
                          ? 'bg-success/10 text-success'
                          : 'bg-slate-100 text-slate-600'
                    }`}>
                    {interview.status}
                  </span>
                  {isEmployer && interview.status === 'SCHEDULED' && (
                    <button
                      type="button"
                      onClick={() => void handleCancel(interview.id)}
                      className="block mt-2 text-xs text-danger hover:underline">
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
