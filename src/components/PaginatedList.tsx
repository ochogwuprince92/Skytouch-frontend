import React, { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { FormAlert } from './FormAlert';
import type { PaginatedResponse } from '../types/api';

interface PaginatedListProps<T> {
  fetchPage: (page: number, size: number) => Promise<PaginatedResponse<T>>;
  renderItem: (item: T) => React.ReactNode;
  emptyMessage?: string;
  pageSize?: number;
  className?: string;
  listClassName?: string;
  getItemKey?: (item: T, index: number) => string | number;
  refreshKey?: number | string;
}

export function PaginatedList<T>({
  fetchPage,
  renderItem,
  emptyMessage = 'No results found.',
  pageSize = 20,
  className = '',
  listClassName = 'space-y-3',
  getItemKey,
  refreshKey,
}: PaginatedListProps<T>) {
  const [page, setPage] = useState(0);
  const [data, setData] = useState<PaginatedResponse<T> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPage = useCallback(
    async (targetPage: number) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await fetchPage(targetPage, pageSize);
        setData(result);
        setPage(result.page);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load results.',
        );
        setData(null);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchPage, pageSize],
  );

  useEffect(() => {
    void loadPage(0);
  }, [loadPage, refreshKey]);

  const totalPages = data?.totalPages ?? 0;
  const totalElements = data?.totalElements ?? 0;
  const canGoPrev = page > 0;
  const canGoNext = data ? page < totalPages - 1 : false;

  if (isLoading && !data) {
    return (
      <div className={`flex items-center justify-center py-16 ${className}`}>
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <FormAlert message={error} />
        <button
          type="button"
          onClick={() => void loadPage(page)}
          className="mt-4 text-sm font-semibold text-primary hover:text-primary-600">
          Try again
        </button>
      </div>
    );
  }

  if (!data || data.content.length === 0) {
    return (
      <div
        className={`rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500 ${className}`}>
        {emptyMessage}
      </div>
    );
  }

  const rangeStart = page * pageSize + 1;
  const rangeEnd = Math.min((page + 1) * pageSize, totalElements);

  return (
    <div className={className}>
      <div className={listClassName}>
        {data.content.map((item, index) => (
          <React.Fragment key={getItemKey?.(item, index) ?? index}>
            {renderItem(item)}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          Showing {rangeStart}–{rangeEnd} of {totalElements}
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => void loadPage(page - 1)}
            disabled={!canGoPrev || isLoading}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50">
            <ChevronLeft size={16} />
            Previous
          </button>
          <span className="px-2 text-sm font-medium text-slate-600">
            Page {page + 1} of {Math.max(totalPages, 1)}
          </span>
          <button
            type="button"
            onClick={() => void loadPage(page + 1)}
            disabled={!canGoNext || isLoading}
            className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50">
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
