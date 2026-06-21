
# Skytouch Jobs - Architecture & Handoff Documentation

## 1. Information Architecture & Sitemap

### Public Marketplace
- `/` - Landing Page
- `/jobs` - Jobs Listing (Search & Filter)
- `/jobs/:id` - Job Details
- `/companies` - Companies Listing
- `/companies/:id` - Company Details (Employer Branding)
- `/pricing` - Employer Pricing Plans

### Authentication
- `/auth/login` - Login
- `/auth/register` - Registration (Seeker / Employer)
- `/auth/verify` - Email OTP Verification
- `/auth/forgot-password` - Forgot Password
- `/auth/reset-password` - Reset Password

### Job Seeker Portal
- `/seeker/dashboard` - Overview & Recommended Jobs
- `/seeker/profile` - Profile Builder & Resume Management
- `/seeker/applications` - Track Applied & Saved Jobs
- `/seeker/messages` - Messaging
- `/seeker/settings` - Account Settings

### Employer Portal
- `/employer/dashboard` - Hiring Pipeline Overview
- `/employer/jobs` - Job Postings Management
- `/employer/ats` - Applicant Tracking System (Kanban)
- `/employer/company` - Company Profile Management
- `/employer/messages` - Candidate Messaging
- `/employer/analytics` - Hiring Analytics
- `/employer/settings` - Billing & Team Settings

### Admin Portal
- `/admin/dashboard` - Platform Health & Metrics
- `/admin/users` - User Management
- `/admin/employers` - Employer Approvals
- `/admin/jobs` - Job Moderation
- `/admin/subscriptions` - Billing Management
- `/admin/audit` - System Audit Logs
- `/admin/settings` - Platform Configuration

---

## 2. Database Entity Relationships (PostgreSQL)

### Core Entities
- **Users**: `id`, `email`, `password_hash`, `role` (SEEKER, EMPLOYER, ADMIN), `status`, `created_at`
- **AuthSessions**: `id`, `user_id`, `token`, `expires_at`
- **OtpCodes**: `id`, `user_id`, `code`, `type` (EMAIL_VERIFY, PWD_RESET), `expires_at`

### Job Seeker Domain
- **JobSeekers**: `id`, `user_id`, `first_name`, `last_name`, `headline`, `bio`, `location`, `resume_url`
- **Skills**: `id`, `seeker_id`, `name`
- **Experiences**: `id`, `seeker_id`, `company`, `title`, `start_date`, `end_date`, `description`
- **Education**: `id`, `seeker_id`, `institution`, `degree`, `field_of_study`, `graduation_year`

### Employer Domain
- **Companies**: `id`, `name`, `industry`, `size`, `location`, `website`, `logo_url`, `cover_url`, `description`
- **Employers**: `id`, `user_id`, `company_id`, `title`, `is_admin`
- **Subscriptions**: `id`, `company_id`, `plan_tier`, `status`, `current_period_end`

### Recruitment Domain
- **Jobs**: `id`, `company_id`, `title`, `description`, `location`, `work_type` (REMOTE, HYBRID, ONSITE), `employment_type`, `salary_min`, `salary_max`, `status` (DRAFT, ACTIVE, CLOSED), `posted_at`
- **Applications**: `id`, `job_id`, `seeker_id`, `stage` (APPLIED, SCREENING, INTERVIEW, OFFER, HIRED, REJECTED), `rating`, `applied_at`
- **Interviews**: `id`, `application_id`, `employer_id`, `scheduled_at`, `type` (VIDEO, ONSITE), `status`
- **SavedJobs**: `id`, `seeker_id`, `job_id`, `saved_at`

### Communication & System
- **Messages**: `id`, `sender_id`, `receiver_id`, `application_id`, `content`, `sent_at`, `read_at`
- **Notifications**: `id`, `user_id`, `type`, `content`, `is_read`, `created_at`
- **AuditLogs**: `id`, `admin_id`, `action`, `entity_type`, `entity_id`, `details`, `timestamp`

---

## 3. Spring Boot Domain Architecture (Java 21)

The backend follows Domain-Driven Design (DDD) principles.

```text
src/main/java/com/skytouch/jobs/
├── authentication/
│   ├── controller/AuthController.java
│   ├── service/AuthService.java, JwtService.java, OtpService.java
│   ├── repository/UserRepository.java, OtpRepository.java
│   ├── entity/User.java, OtpCode.java
│   └── dto/LoginRequest.java, RegisterRequest.java
├── jobseeker/
│   ├── controller/SeekerController.java
│   ├── service/SeekerProfileService.java, ResumeParserService.java
│   ├── repository/JobSeekerRepository.java, SkillRepository.java
│   └── entity/JobSeeker.java, Experience.java
├── employer/
│   ├── controller/EmployerController.java
│   ├── service/CompanyService.java, TeamManagementService.java
│   ├── repository/CompanyRepository.java, EmployerRepository.java
│   └── entity/Company.java, Employer.java
├── jobs/
│   ├── controller/JobController.java, SearchController.java
│   ├── service/JobPostingService.java, JobSearchService.java
│   ├── repository/JobRepository.java
│   └── entity/Job.java
├── applications/
│   ├── controller/ApplicationController.java, AtsController.java
│   ├── service/ApplicationWorkflowService.java
│   ├── repository/ApplicationRepository.java
│   └── entity/Application.java
├── common/
│   ├── exception/GlobalExceptionHandler.java
│   ├── config/SecurityConfig.java, SwaggerConfig.java
│   └── util/EmailSender.java, S3Uploader.java
```

---

## 4. API Recommendations

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/verify-otp` - Verify email
- `POST /api/v1/auth/login` - Authenticate & return JWT
- `POST /api/v1/auth/refresh` - Refresh JWT session

### Public Marketplace
- `GET /api/v1/jobs` - Search jobs (supports filters: keyword, location, type, salary)
- `GET /api/v1/jobs/{id}` - Get job details
- `GET /api/v1/companies` - List companies
- `GET /api/v1/companies/{id}` - Get company profile & open roles

### Job Seeker
- `GET /api/v1/seeker/profile` - Get current seeker profile
- `PUT /api/v1/seeker/profile` - Update profile
- `POST /api/v1/seeker/resume/upload` - Upload & parse resume (Multipart)
- `GET /api/v1/seeker/applications` - List user's applications
- `POST /api/v1/seeker/applications/{jobId}` - Apply to job

### Employer (ATS)
- `POST /api/v1/employer/jobs` - Create job posting
- `GET /api/v1/employer/jobs/{jobId}/candidates` - List applicants for job
- `PATCH /api/v1/employer/applications/{appId}/stage` - Move candidate in Kanban
- `POST /api/v1/employer/applications/{appId}/interviews` - Schedule interview
- `GET /api/v1/employer/analytics` - Get hiring metrics

### Admin
- `GET /api/v1/admin/users` - List all users (paginated)
- `PATCH /api/v1/admin/users/{id}/status` - Suspend/Activate user
- `GET /api/v1/admin/employers/pending` - List pending company approvals
- `POST /api/v1/admin/employers/{id}/approve` - Approve company
