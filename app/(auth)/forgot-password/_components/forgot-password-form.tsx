'use client';

import Link from 'next/link';
import Icon from '@/lib/icon';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { CustomInputBox } from '@/components/shared/custom-input';
import { Button, buttonVariants } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('andrewhierholze@gmail.com');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempted:', { email });
    router.push('/otp-verification');
  };

  return (
    <>
      <CustomInputBox
        icon="email"
        label="Email Address"
        placeholder="Email Address"
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
        >
          Get OTP
          <Icon name="chevron_arrow_right" height={24} width={24} />
        </Button>

        <Link
          href={'/login'}
          className={cn(
            buttonVariants({
              variant: 'secondary',
              size: 'lg',
            }),
            'text-primary hover:text-primary w-full gap-3 bg-transparent font-semibold',
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
