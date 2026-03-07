'use client';

import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import Icon from '@/lib/icon';
import { useVerifyOtpMutation } from '@/redux/api/authApi';
import { setCredentials } from '@/redux/features/authSlice';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const OTPVerificationForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [otp, setOtp] = useState('');

  const dispatch = useDispatch();
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      console.error('Email not found. Please try again.');
      return;
    }
    try {
      const response = await verifyOtp({ email, otp }).unwrap();
      // Assuming response contains access and refresh tokens, adapting to setCredentials payload
      // If the API returns exactly what setCredentials expects:
      dispatch(
        setCredentials({
          access: response.access,
          refresh: response.refresh,
          uid: response.uid || 'unknown', // Adjust based on actual API response
          message: response.message || 'Login successful',
        })
      );

      // OTP verified successfully
      router.push('/new-password');
    } catch (error: any) {
      console.error('OTP Verification failed', error);
      // Handle error
    }
  };

  return (
    <>
      <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} value={otp} onChange={setOtp}>
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
        <Button onClick={handleSubmit} size={'lg'} type="submit" className="w-full justify-between">
          {isLoading ? 'Verifying...' : 'Verify OTP'}
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
