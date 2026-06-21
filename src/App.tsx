import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import { LandingPage } from './pages/LandingPage';
import { JobsListingPage } from './pages/JobsListingPage';
import { JobDetailsPage } from './pages/JobDetailsPage';
import { CompaniesListingPage } from './pages/CompaniesListingPage';
import { CompanyDetailsPage } from './pages/CompanyDetailsPage';
import { PricingPage } from './pages/PricingPage';
import { AuthLayout } from './layouts/AuthLayout';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { VerifyEmailPage } from './pages/auth/VerifyEmailPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/auth/ResetPasswordPage';
import { SeekerLayout } from './layouts/SeekerLayout';
import { SeekerDashboardPage } from './pages/seeker/SeekerDashboardPage';
import { SeekerProfilePage } from './pages/seeker/SeekerProfilePage';
import { SeekerApplicationsPage } from './pages/seeker/SeekerApplicationsPage';
import { SeekerMessagesPage } from './pages/seeker/SeekerMessagesPage';
import { SeekerSettingsPage } from './pages/seeker/SeekerSettingsPage';
import { EmployerLayout } from './layouts/EmployerLayout';
import { EmployerDashboardPage } from './pages/employer/EmployerDashboardPage';
import { EmployerJobsPage } from './pages/employer/EmployerJobsPage';
import { EmployerATSPage } from './pages/employer/EmployerATSPage';
import { EmployerCompanyPage } from './pages/employer/EmployerCompanyPage';
import { EmployerMessagesPage } from './pages/employer/EmployerMessagesPage';
import { EmployerAnalyticsPage } from './pages/employer/EmployerAnalyticsPage';
import { EmployerSettingsPage } from './pages/employer/EmployerSettingsPage';
import { AdminLayout } from './layouts/AdminLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminUsersPage } from './pages/admin/AdminUsersPage';
import { AdminEmployersPage } from './pages/admin/AdminEmployersPage';
import { AdminJobsModerationPage } from './pages/admin/AdminJobsModerationPage';
import { AdminSubscriptionsPage } from './pages/admin/AdminSubscriptionsPage';
import { AdminAuditLogsPage } from './pages/admin/AdminAuditLogsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/jobs" element={<JobsListingPage />} />
          <Route path="/jobs/:id" element={<JobDetailsPage />} />
          <Route path="/companies" element={<CompaniesListingPage />} />
          <Route path="/companies/:id" element={<CompanyDetailsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="verify" element={<VerifyEmailPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
        </Route>

        <Route path="/seeker" element={<SeekerLayout />}>
          <Route path="dashboard" element={<SeekerDashboardPage />} />
          <Route path="profile" element={<SeekerProfilePage />} />
          <Route path="applications" element={<SeekerApplicationsPage />} />
          <Route path="saved" element={<SeekerApplicationsPage />} />
          <Route path="messages" element={<SeekerMessagesPage />} />
          <Route path="settings" element={<SeekerSettingsPage />} />
        </Route>

        <Route path="/employer" element={<EmployerLayout />}>
          <Route path="dashboard" element={<EmployerDashboardPage />} />
          <Route path="jobs" element={<EmployerJobsPage />} />
          <Route path="ats" element={<EmployerATSPage />} />
          <Route path="company" element={<EmployerCompanyPage />} />
          <Route path="messages" element={<EmployerMessagesPage />} />
          <Route path="analytics" element={<EmployerAnalyticsPage />} />
          <Route path="settings" element={<EmployerSettingsPage />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="employers" element={<AdminEmployersPage />} />
          <Route path="jobs" element={<AdminJobsModerationPage />} />
          <Route path="subscriptions" element={<AdminSubscriptionsPage />} />
          <Route path="audit" element={<AdminAuditLogsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>);

}