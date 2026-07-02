import type { UserRole } from '../types/auth';

export function dashboardPathForRole(role: UserRole): string {
  switch (role) {
    case 'JOB_SEEKER':
      return '/seeker/dashboard';
    case 'EMPLOYER':
      return '/employer/dashboard';
    case 'ADMIN':
      return '/admin/dashboard';
  }
}
