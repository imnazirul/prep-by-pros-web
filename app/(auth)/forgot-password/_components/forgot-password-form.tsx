'use client';

import { CustomInputBox } from '@/components/shared/custom-input';
import { Button, buttonVariants } from '@/components/ui/button';
import Icon from '@/lib/icon';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useSendOtpMutation } from '@/redux/api/authApi';

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [sendOtp, { isLoading }] = useSendOtpMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendOtp({ email }).unwrap();
      // OTP sent successfully
      router.push(`/otp-verification?email=${encodeURIComponent(email)}`);
    } catch (error: any) {
      console.error('Failed to send OTP:', error);
      // Handle error (e.g., show inline error)
    }
  };

  return (
    <>
      <CustomInputBox
        icon="email"
        label="Email Address"
        placeholder="Enter your email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="space-y-4">
        <Button
          onClick={handleSubmit}
          size={'lg'}
          type="submit"
          className="w-full justify-between"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Get OTP'}
          <Icon name="chevron_arrow_right" height={24} width={24} />
        </Button>

        <Link
          href={'/login'}
          className={cn(
            buttonVariants({
              variant: 'secondary',
              size: 'lg',
            }),
            'text-primary hover:text-primary w-full gap-3 bg-transparent font-semibold'
          )}
        >
          <Icon name="arrow_left" height={24} width={24} />
          Back to login 
        </Link>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
