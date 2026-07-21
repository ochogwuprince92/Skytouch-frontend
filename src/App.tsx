import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { prefetchCountries } from './services/locationService';
import { GuestRoute, ProtectedRoute } from './components/ProtectedRoute';
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
import { OtpVerificationPage } from './pages/auth/OtpVerificationPage';
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
import { AdminCompaniesPage } from './pages/admin/AdminCompaniesPage';
import { AdminJobsModerationPage } from './pages/admin/AdminJobsModerationPage';
import { AdminATSPage } from './pages/admin/AdminATSPage';
import { AdminSubscriptionsPage } from './pages/admin/AdminSubscriptionsPage';
import { AdminAuditLogsPage } from './pages/admin/AdminAuditLogsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { SettingsLayout } from './layouts/SettingsLayout';
import { AccountSettingsPage } from './pages/settings/AccountSettingsPage';
import { SeekerOnboardingGuard } from './components/SeekerOnboardingGuard';
import { SeekerOnboardingPage } from './pages/seeker/SeekerOnboardingPage';
import { SeekerSavedJobsPage } from './pages/seeker/SeekerSavedJobsPage';
import { SeekerJobAlertsPage } from './pages/seeker/SeekerJobAlertsPage';
import { EmployerOnboardingGuard } from './components/EmployerOnboardingGuard';
import { EmployerOnboardingPage } from './pages/employer/EmployerOnboardingPage';
import { ApplicationDetailPage } from './pages/applications/ApplicationDetailPage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { HelpPage } from './pages/HelpPage';
import { PaymentCallbackPage } from './pages/PaymentCallbackPage';
import { PaystackTestPage } from './pages/PaystackTestPage';

export function App() {
  useEffect(() => {
    prefetchCountries();
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/jobs" element={<JobsListingPage />} />
            <Route path="/jobs/:id" element={<JobDetailsPage />} />
            <Route path="/companies" element={<CompaniesListingPage />} />
            <Route path="/companies/:id" element={<CompanyDetailsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/payment/callback" element={<PaymentCallbackPage />} />
            <Route path="/payment/test" element={<PaystackTestPage />} />
          </Route>

          <Route
            element={
              <GuestRoute>
                <AuthLayout />
              </GuestRoute>
            }>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/verify-otp" element={<OtpVerificationPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>

          {/* Legacy auth paths */}
          <Route path="/auth/login" element={<Navigate to="/login" replace />} />
          <Route
            path="/auth/register"
            element={<Navigate to="/register" replace />}
          />
          <Route
            path="/auth/verify"
            element={<Navigate to="/verify-email" replace />}
          />
          <Route
            path="/auth/forgot-password"
            element={<Navigate to="/forgot-password" replace />}
          />
          <Route
            path="/auth/reset-password"
            element={<Navigate to="/reset-password" replace />}
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute allowedRoles={['JOB_SEEKER', 'EMPLOYER', 'ADMIN']}>
                <SettingsLayout />
              </ProtectedRoute>
            }>
            <Route index element={<Navigate to="account" replace />} />
            <Route path="account" element={<AccountSettingsPage />} />
          </Route>

          <Route
            path="/seeker"
            element={
              <ProtectedRoute allowedRoles={['JOB_SEEKER']}>
                <SeekerOnboardingGuard />
              </ProtectedRoute>
            }>
            <Route path="onboarding" element={<SeekerOnboardingPage />} />
            <Route element={<SeekerLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<SeekerDashboardPage />} />
              <Route path="jobs" element={<JobsListingPage />} />
              <Route path="jobs/:id" element={<JobDetailsPage />} />
              <Route path="profile" element={<SeekerProfilePage />} />
              <Route path="applications" element={<SeekerApplicationsPage />} />
              <Route
                path="applications/:id"
                element={<ApplicationDetailPage role="JOB_SEEKER" />}
              />
              <Route path="saved" element={<SeekerSavedJobsPage />} />
              <Route path="alerts" element={<SeekerJobAlertsPage />} />
              <Route path="messages" element={<SeekerMessagesPage />} />
              <Route path="settings" element={<SeekerSettingsPage />} />
            </Route>
          </Route>

          <Route
            path="/employer"
            element={
              <ProtectedRoute allowedRoles={['EMPLOYER']}>
                <EmployerOnboardingGuard />
              </ProtectedRoute>
            }>
            <Route path="onboarding" element={<EmployerOnboardingPage />} />
            <Route element={<EmployerLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<EmployerDashboardPage />} />
              <Route path="jobs" element={<EmployerJobsPage />} />
              <Route path="ats" element={<EmployerATSPage />} />
              <Route
                path="jobs/:jobId/applications/:id"
                element={<ApplicationDetailPage role="EMPLOYER" />}
              />
              <Route path="company" element={<EmployerCompanyPage />} />
              <Route path="messages" element={<EmployerMessagesPage />} />
              <Route path="analytics" element={<EmployerAnalyticsPage />} />
              <Route path="settings" element={<EmployerSettingsPage />} />
            </Route>
          </Route>

          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminLayout />
              </ProtectedRoute>
            }>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="employers" element={<AdminEmployersPage />} />
            <Route path="companies" element={<AdminCompaniesPage />} />
            <Route path="jobs" element={<AdminJobsModerationPage />} />
            <Route path="jobs/:id/applications" element={<AdminATSPage />} />
            <Route path="jobs/:id/applications/:applicationId" element={<ApplicationDetailPage role="ADMIN" />} />
            <Route path="jobs/:id" element={<JobDetailsPage />} />
            <Route path="ats" element={<AdminATSPage />} />
            <Route path="subscriptions" element={<AdminSubscriptionsPage />} />
            <Route path="audit" element={<AdminAuditLogsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
