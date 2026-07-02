import { useCallback, useEffect, useState } from 'react';
import { Loader2, Send } from 'lucide-react';
import { FormAlert } from '../FormAlert';
import { PaginatedList } from '../PaginatedList';
import { ApiError } from '../../lib/api';
import { formatRelativeTime } from '../../lib/format';
import {
  listApplicationMessages,
  markApplicationMessagesRead,
  sendApplicationMessage,
} from '../../services/workflowService';
import type { ApplicationMessageResponse } from '../../types/message';

interface ApplicationMessagesTabProps {
  applicationId: string;
}

export function ApplicationMessagesTab({
  applicationId,
}: ApplicationMessagesTabProps) {
  const [body, setBody] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    void markApplicationMessagesRead(applicationId).catch(() => undefined);
  }, [applicationId, refreshKey]);

  const fetchPage = useCallback(
    (page: number, size: number) =>
      listApplicationMessages(applicationId, page, size),
    [applicationId],
  );

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = body.trim();
    if (!text) return;

    setError(null);
    setIsSending(true);
    try {
      await sendApplicationMessage(applicationId, { body: text });
      setBody('');
      setRefreshKey((k) => k + 1);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Unable to send message.',
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && <FormAlert message={error} />}

      <PaginatedList
        refreshKey={refreshKey}
        fetchPage={fetchPage}
        emptyMessage="No messages yet. Start the conversation below."
        listClassName="space-y-3 max-h-96 overflow-y-auto"
        renderItem={(msg: ApplicationMessageResponse) => (
          <div
            className={`rounded-xl border px-4 py-3 ${
              msg.read
                ? 'border-slate-200 bg-white'
                : 'border-primary/20 bg-primary-50/30'
            }`}>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-sm font-semibold text-slate-900">
                {msg.senderEmail}
              </span>
              <span className="text-xs text-slate-400">
                {formatRelativeTime(msg.sentAt)}
              </span>
            </div>
            <p className="text-sm text-slate-600 whitespace-pre-wrap">
              {msg.body}
            </p>
          </div>
        )}
        getItemKey={(msg) => msg.id}
      />

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write a message…"
          className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm"
        />
        <button
          type="submit"
          disabled={isSending || !body.trim()}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold disabled:opacity-60">
          {isSending ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Send size={16} />
          )}
          Send
        </button>
      </form>
    </div>
  );
}
