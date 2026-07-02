import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { getMyEmployerProfile } from '../services/employerService';

/**
 * Employers must create a company before accessing the portal. We treat a
 * missing `companyId` on the employer profile as "not yet onboarded" and send
 * them to the company creation screen.
 */
export function EmployerOnboardingGuard() {
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  const isOnboardingRoute = location.pathname.startsWith(
    '/employer/onboarding',
  );

  useEffect(() => {
    if (isOnboardingRoute) {
      setIsChecking(false);
      return;
    }

    let cancelled = false;

    async function checkOnboarding() {
      try {
        const profile = await getMyEmployerProfile();
        if (!cancelled) {
          setNeedsOnboarding(!profile.companyId);
        }
      } catch {
        if (!cancelled) setNeedsOnboarding(false);
      } finally {
        if (!cancelled) setIsChecking(false);
      }
    }

    void checkOnboarding();
    return () => {
      cancelled = true;
    };
  }, [isOnboardingRoute, location.pathname]);

  if (isOnboardingRoute) return <Outlet />;

  if (isChecking) {
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
