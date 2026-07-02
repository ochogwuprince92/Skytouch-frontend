import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { FormAlert } from '../../components/FormAlert';
import { useAuth } from '../../context/AuthContext';
import { ApiError } from '../../lib/api';
import {
  changePassword,
  deactivateAccount,
} from '../../services/accountService';

export function AccountSettingsPage() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [deactivatePassword, setDeactivatePassword] = useState('');
  const [showDeactivatePassword, setShowDeactivatePassword] = useState(false);
  const [deactivateError, setDeactivateError] = useState<string | null>(null);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);

    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    setIsChangingPassword(true);
    try {
      await changePassword({
        currentPassword,
        newPassword,
        confirmPassword,
      });
      await logout();
      navigate('/login', {
        replace: true,
        state: {
          message:
            'Password changed successfully. Please sign in with your new password.',
        },
      });
    } catch (err) {
      if (err instanceof ApiError) {
        setPasswordError(err.message);
      } else {
        setPasswordError('Unable to change password. Please try again.');
      }
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleDeactivate = async () => {
    setDeactivateError(null);
    setIsDeactivating(true);
    try {
      await deactivateAccount({ password: deactivatePassword });
      await logout();
      navigate('/login', {
        replace: true,
        state: {
          message: 'Your account has been deactivated.',
        },
      });
    } catch (err) {
      if (err instanceof ApiError) {
        setDeactivateError(err.message);
      } else {
        setDeactivateError('Unable to deactivate account. Please try again.');
      }
      setShowDeactivateConfirm(false);
    } finally {
      setIsDeactivating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Account security</h1>
        <p className="text-slate-500 mt-1">
          Change your password or deactivate your account. These actions revoke
          all active sessions.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-soft border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary flex items-center justify-center">
            <Lock size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Change password</h2>
            <p className="text-sm text-slate-500">
              You will be signed out on all devices after updating your password.
            </p>
          </div>
        </div>

        {passwordError && (
          <div className="mb-5">
            <FormAlert message={passwordError} />
          </div>
        )}

        <form className="space-y-4" onSubmit={handleChangePassword}>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Current password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600">
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              New password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                minLength={8}
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600">
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Confirm new password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              minLength={8}
              required
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isChangingPassword}
              className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold hover:bg-primary-600 disabled:opacity-60 transition-colors">
              {isChangingPassword ? 'Updating…' : 'Update password'}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-soft border border-danger-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-danger-50 text-danger flex items-center justify-center">
            <AlertTriangle size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-danger">Deactivate account</h2>
            <p className="text-sm text-slate-600">
              Permanently disable your account ({user?.email}). This cannot be
              undone without contacting support.
            </p>
          </div>
        </div>

        {deactivateError && (
          <div className="mb-4">
            <FormAlert message={deactivateError} />
          </div>
        )}

        {!showDeactivateConfirm ? (
          <button
            type="button"
            onClick={() => setShowDeactivateConfirm(true)}
            className="bg-danger-50 text-danger border border-danger-200 px-6 py-2.5 rounded-xl font-bold hover:bg-danger hover:text-white transition-colors">
            Deactivate my account
          </button>
        ) : (
          <div className="rounded-xl border border-danger-200 bg-danger-50/50 p-4 space-y-4">
            <p className="text-sm text-slate-700 font-medium">
              Enter your password to confirm deactivation.
            </p>
            <div className="relative max-w-md">
              <input
                type={showDeactivatePassword ? 'text' : 'password'}
                value={deactivatePassword}
                onChange={(e) => setDeactivatePassword(e.target.value)}
                placeholder="Your password"
                className="w-full px-4 py-2.5 pr-10 rounded-xl border border-slate-200 focus:outline-none focus:border-danger focus:ring-1 focus:ring-danger"
              />
              <button
                type="button"
                onClick={() => setShowDeactivatePassword(!showDeactivatePassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600">
                {showDeactivatePassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => void handleDeactivate()}
                disabled={isDeactivating || !deactivatePassword}
                className="bg-danger text-white px-5 py-2.5 rounded-xl font-bold hover:bg-red-700 disabled:opacity-60 transition-colors">
                {isDeactivating ? 'Deactivating…' : 'Confirm deactivation'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowDeactivateConfirm(false);
                  setDeactivatePassword('');
                  setDeactivateError(null);
                }}
                className="px-5 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-white border border-slate-200 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
