'use client';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import Icon from '@/lib/icon';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';

const OTPVerificationForm = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('OTP verification attempted:');
    router.push('/new-password');
  };

  return (
    <>
      <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
        <InputOTPGroup className="grid w-full grid-cols-6 gap-3">
          <InputOTPSlot className="w-full" index={0} />
          <InputOTPSlot className="w-full" index={1} />
          <InputOTPSlot className="w-full" index={2} />
          <InputOTPSlot className="w-full" index={3} />
          <InputOTPSlot className="w-full" index={4} />
          <InputOTPSlot className="w-full" index={5} />
        </InputOTPGroup>
      </InputOTP>

      <div className="space-y-8">
        <Button
          onClick={handleSubmit}
          size={'lg'}
          type="submit"
          className="w-full justify-between"
        >
          Verify OTP
          <Icon name="chevron_arrow_right" height={24} width={24} />
        </Button>

        <p className="text-black-7">
          Didn’t get a code? Resend in
          <span className="text-primary font-semibold">0:17</span>
        </p>
      </div>
    </>
  );
};

export default OTPVerificationForm;
