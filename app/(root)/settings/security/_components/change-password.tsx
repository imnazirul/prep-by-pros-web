'use client';

import { CustomInputBox } from '@/components/shared/custom-input';
import { Button } from '@/components/ui/button';
import { useChangePasswordMutation } from '@/redux/api/authApi';
import { useState } from 'react';

const ChangePassword = () => {
  const [isPasswordForm, setIsPasswordForm] = useState(false);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleSubmit = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!oldPassword || !newPassword || !confirmPassword) {
      setErrorMessage('All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('New passwords do not match.');
      return;
    }

    try {
      await changePassword({
        old_password: oldPassword,
        new_password: newPassword,
      }).unwrap();

      setSuccessMessage('Password updated successfully.');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsPasswordForm(false);
    } catch (err: any) {
      setErrorMessage(err?.data?.message || 'Failed to update password. Please try again.');
    }
  };

  return (
    <div>
      <section className="flex items-start justify-between">
        <div className="space-y-2">
          <h2 className="text-black-10 text-[22px] font-semibold">Change Password</h2>
          {!isPasswordForm && (
            <p className="text-sm text-[#737373]">
              Update your password to keep your account secure.
            </p>
          )}
        </div>

        <Button
          variant="link"
          className="text-primary h-auto p-0! text-base font-semibold underline"
          onClick={() => {
            setIsPasswordForm(!isPasswordForm);
            setErrorMessage('');
            setSuccessMessage('');
          }}
        >
          {isPasswordForm ? 'Cancel' : 'Update'}
        </Button>
      </section>

      {isPasswordForm && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            {errorMessage && (
              <div className="mb-4 rounded bg-red-100 p-3 text-sm text-red-600">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="mb-4 rounded bg-green-100 p-3 text-sm text-green-600">
                {successMessage}
              </div>
            )}
          </div>

          <div className="sm:col-span-2">
            <CustomInputBox
              icon="lock_password"
              label="Old Password"
              placeholder="Old Password"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              isPassword
            />
          </div>

          <CustomInputBox
            icon="lock_password"
            label="New Password"
            placeholder="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            isPassword
          />
          <CustomInputBox
            icon="lock_password"
            label="Re-type your new password"
            placeholder="Re-type your new password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            isPassword
          />
          <div className="flex justify-end sm:col-span-2">
            <Button size={'lg'} onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Password'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
