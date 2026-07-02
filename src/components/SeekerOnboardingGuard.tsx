import React from 'react';
import { Outlet } from 'react-router-dom';

/**
 * The backend contract does not force seeker onboarding before dashboard access.
 * A CV is only required at apply time (gated on the job detail page), so this
 * guard is a passthrough that simply renders the nested seeker routes.
 */
export function SeekerOnboardingGuard() {
  return <Outlet />;
}
