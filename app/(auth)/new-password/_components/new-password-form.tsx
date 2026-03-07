'use client';

import { CustomInputBox } from '@/components/shared/custom-input';
import { Button } from '@/components/ui/button';
import Icon from '@/lib/icon';
import { useResetPasswordMutation } from '@/redux/api/authApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const NewPasswordForm = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    try {
      await resetPassword({ new_password: password }).unwrap();
      // Password updated successfully
      router.push('/login');
    } catch (error: any) {
      console.error('Failed to reset password:', error);
      // Handle error
    }
  };

  return (
    <>
      <div className="space-y-4">
        <CustomInputBox
          icon="email"
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isPassword
        />
        <CustomInputBox
          icon="lock_password"
          label="Re-type New Password"
          type="password"
          value={confirmPassword}
          isPassword
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <Button onClick={handleSubmit} size={'lg'} type="submit" className="w-full justify-between">
        {isLoading ? 'Updating...' : 'Update password'}
        <Icon name="chevron_arrow_right" height={24} width={24} />
      </Button>
    </>
  );
};

export default NewPasswordForm;
