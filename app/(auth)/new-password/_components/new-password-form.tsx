'use client';

import Icon from '@/lib/icon';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CustomInputBox } from '@/components/shared/custom-input';

const NewPasswordForm = () => {
  const router = useRouter();
  const [password, setPassword] = useState('************');
  const [confirmPassword, setConfirmPassword] = useState('************');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New Password attempted:');
    router.push('/');
  };

  return (
    <>
      <div className="space-y-4">
        <CustomInputBox
          icon="email"
          label="New Password"
          placeholder="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isPassword
        />
        <CustomInputBox
          icon="lock_password"
          label="Re-type New Password"
          placeholder="Re-type your new password"
          type="password"
          value={confirmPassword}
          isPassword
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <Button
        onClick={handleSubmit}
        size={'lg'}
        type="submit"
        className="w-full justify-between"
      >
        Update password
        <Icon name="chevron_arrow_right" height={24} width={24} />
      </Button>
    </>
  );
};

export default NewPasswordForm;
