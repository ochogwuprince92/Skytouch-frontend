const BASE_URL = 'http://localhost:8083'

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
})

// ─── Auth API ────────────────────────────────────────────────────────────────

export const authApi = {

  // POST /api/auth/register
  register: async (data: {
    email: string
    password: string
    confirmPassword: string
    firstName: string
    middleName?: string
    lastName: string
    phone: string
  }) => {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error((await res.json()).message || 'Registration failed')
    return res.json()
  },

  // POST /api/auth/verify-email
  verifyEmail: async (data: { email: string; otp: string }) => {
    const res = await fetch(`${BASE_URL}/api/auth/verify-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error((await res.json()).message || 'Verification failed')
    return res.json()
  },

  // POST /api/auth/verify-email/resend
  resendVerification: async (email: string) => {
    const res = await fetch(`${BASE_URL}/api/auth/verify-email/resend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    if (!res.ok) throw new Error((await res.json()).message || 'Resend failed')
    return res.json()
  },

  // POST /api/auth/login — returns token directly (no OTP)
  login: async (data: { email: string; password: string }) => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error((await res.json()).message || 'Login failed')
    return res.json()
  },

  // POST /api/auth/forgot-password
  forgotPassword: async (data: { email: string }) => {
    const res = await fetch(`${BASE_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error((await res.json()).message || 'Failed to send reset code')
    return res.json()
  },

  // POST /api/auth/reset-password
  resetPassword: async (data: { email: string; otp: string; newPassword: string }) => {
    const res = await fetch(`${BASE_URL}/api/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error((await res.json()).message || 'Password reset failed')
    return res.json()
  },
}

// ─── Seeker API ──────────────────────────────────────────────────────────────

export const seekerApi = {

  // GET /api/job-seekers/me
  getProfile: async () => {
    const res = await fetch(`${BASE_URL}/api/job-seekers/me`, {
      headers: authHeaders(),
    })
    if (!res.ok) throw new Error((await res.json()).message || 'Failed to load profile')
    return res.json()
  },

  // PATCH /api/job-seekers/me/onboarding (multipart/form-data)
  updateOnboarding: async (formData: FormData) => {
    const res = await fetch(`${BASE_URL}/api/job-seekers/me/onboarding`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`,
        // NOTE: do NOT set Content-Type for FormData — browser sets it automatically
      },
      body: formData,
    })
    if (!res.ok) throw new Error((await res.json()).message || 'Update failed')
    return res.json()
  },

  // PATCH /api/job-seekers/me/kyc
  updateKyc: async (data: {
    nin?: string
    addressLine?: string
    addressNo?: string
    addressLga?: string
    addressState?: string
  }) => {
    const res = await fetch(`${BASE_URL}/api/job-seekers/me/kyc`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error((await res.json()).message || 'KYC update failed')
    return res.json()
  },
}

// ─── Token storage ───────────────────────────────────────────────────────────

export const tokenStorage = {
  save: (token: string, email: string, role: string) => {
    localStorage.setItem('token', token)
    localStorage.setItem('email', email)
    localStorage.setItem('role', role)
  },
  clear: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('role')
  },
  getToken: () => localStorage.getItem('token'),
  getEmail: () => localStorage.getItem('email'),
  getRole: () => localStorage.getItem('role'),
  isLoggedIn: () => !!localStorage.getItem('token'),
}
