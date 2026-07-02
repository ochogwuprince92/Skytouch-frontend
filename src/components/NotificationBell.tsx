import { useEffect, useState } from 'react';
import { Bell, Check, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ApiError } from '../lib/api';
import { formatRelativeTime } from '../lib/format';
import {
  getUnreadCount,
  listMyNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from '../services/notificationService';
import type { NotificationResponse } from '../types/notification';

interface NotificationBellProps {
  resolveApplicationHref?: (applicationId: string) => string;
}

export function NotificationBell({
  resolveApplicationHref,
}: NotificationBellProps) {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [items, setItems] = useState<NotificationResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const load = async () => {
    try {
      const [countRes, listRes] = await Promise.all([
        getUnreadCount(),
        listMyNotifications(0, 10),
      ]);
      setUnread(countRes.unreadCount);
      setItems(listRes.content);
    } catch {
      setUnread(0);
      setItems([]);
    }
  };

  useEffect(() => {
    void load();
    const interval = setInterval(() => void load(), 60_000);
    return () => clearInterval(interval);
  }, []);

  const handleOpen = () => {
    const next = !open;
    setOpen(next);
    if (next) {
      setIsLoading(true);
      void load().finally(() => setIsLoading(false));
    }
  };

  const handleMarkRead = async (n: NotificationResponse) => {
    if (n.read) return;
    try {
      await markNotificationRead(n.id);
      void load();
    } catch {
      /* ignore */
    }
  };

  const handleMarkAll = async () => {
    try {
      await markAllNotificationsRead();
      void load();
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleOpen}
        className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
        aria-label="Notifications">
        <Bell size={20} />
        {unread > 0 && (
          <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-danger text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40"
            aria-label="Close notifications"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-slate-200 shadow-lg z-50 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <p className="font-bold text-slate-900">Notifications</p>
              {unread > 0 && (
                <button
                  type="button"
                  onClick={() => void handleMarkAll()}
                  className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                  <Check size={14} /> Mark all read
                </button>
              )}
            </div>
            <div className="max-h-80 overflow-y-auto">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : items.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-8">
                  No notifications yet.
                </p>
              ) : (
                items.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => void handleMarkRead(n)}
                    className={`w-full text-left px-4 py-3 border-b border-slate-50 hover:bg-slate-50 transition-colors ${
                      !n.read ? 'bg-primary-50/30' : ''
                    }`}>
                    <p className="text-sm font-semibold text-slate-900">
                      {n.title}
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">
                      {n.message}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] text-slate-400">
                        {formatRelativeTime(n.createdAt)}
                      </span>
                      {n.applicationId && resolveApplicationHref && (
                        <Link
                          to={resolveApplicationHref(n.applicationId)}
                          onClick={(e) => e.stopPropagation()}
                          className="text-[10px] font-semibold text-primary hover:underline">
                          View
                        </Link>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
