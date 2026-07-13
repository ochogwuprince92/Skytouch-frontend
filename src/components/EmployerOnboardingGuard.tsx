import React, { useEffect, useRef, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { getMyEmployerProfile } from '../services/employerService';

export function EmployerOnboardingGuard() {
  const location = useLocation();
  const isOnboardingRoute = location.pathname.startsWith(
    '/employer/onboarding',
  );

  // Which pathname the current `needsOnboarding` value was resolved for.
  // null means "nothing resolved yet".
  const [checkedFor, setCheckedFor] = useState<string | null>(null);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const fetchingRef = useRef(false);

  // Pure, synchronous, render-time comparison — no effect timing involved.
  const isStale = !isOnboardingRoute && checkedFor !== location.pathname;

  useEffect(() => {
    if (isOnboardingRoute) return;
    if (checkedFor === location.pathname) return; // already resolved for this exact path
    if (fetchingRef.current) return; // a check for this path is already in flight

    fetchingRef.current = true;
    let cancelled = false;

    getMyEmployerProfile()
      .then((profile) => {
        if (cancelled) return;
        setNeedsOnboarding(!(profile.companyId || profile.companyName));
        setCheckedFor(location.pathname);
      })
      .catch(() => {
        if (cancelled) return;
        // Fail open rather than trapping the user in a redirect loop on a
        // transient network error.
        setNeedsOnboarding(false);
        setCheckedFor(location.pathname);
      })
      .finally(() => {
        fetchingRef.current = false;
      });

    return () => {
      cancelled = true;
    };
  }, [isOnboardingRoute, location.pathname, checkedFor]);

  if (isOnboardingRoute) return <Outlet />;

  if (isStale) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (needsOnboarding) {
    return <Navigate to="/employer/onboarding" replace />;
  }

  return <Outlet />;
}