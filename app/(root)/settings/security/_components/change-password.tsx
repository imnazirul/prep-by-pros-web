'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import Icon from '@/lib/icon';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { CustomInputBox } from '@/components/shared/custom-input';

const INITIAL_TIME = 60;

const ChangePassword = () => {
  const [open, setOpen] = useState(false);
  const [isPasswordForm, setIsPasswordForm] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const isExpired = timeLeft === 0;

  return (
    <>
      <div>
        <section className="flex items-start justify-between">
          <div className="space-y-2">
            <h2 className="text-black-10 text-[22px] font-semibold">
              Change Password
            </h2>
            {!isPasswordForm && (
              <p className="text-sm text-[#737373]">Updated 28 minutes ago</p>
            )}
          </div>

          <Button
            variant="link"
            className="text-primary h-auto p-0! text-base font-semibold underline"
            onClick={() => {
              if (isPasswordForm) {
                setIsPasswordForm(false);
              } else {
                setOpen(true);
              }
            }}
          >
            {isPasswordForm ? 'Cancel' : 'Update'}
          </Button>
        </section>

        {isPasswordForm && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <CustomInputBox
              icon="lock_password"
              label="New Password"
              placeholder="New Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              <Button
                size={'lg'}
                onClick={() => {
                  alert(
                    `Password: ${password}; Confirmed Password: ${confirmPassword}`,
                  );
                  setIsPasswordForm(false);
                }}
              >
                Update Password
              </Button>
            </div>
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-170" showCloseButton={false}>
          <div className="flex flex-col gap-8">
            <DialogHeader>
              <DialogTitle>Enter the OTP</DialogTitle>
              <DialogDescription>
                Verify your identity to reset your password
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-12">
              <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                <InputOTPGroup className="grid w-full grid-cols-6">
                  <InputOTPSlot className="w-full" index={0} />
                  <InputOTPSlot className="w-full" index={1} />
                  <InputOTPSlot className="w-full" index={2} />
                  <InputOTPSlot className="w-full" index={3} />
                  <InputOTPSlot className="w-full" index={4} />
                  <InputOTPSlot className="w-full" index={5} />
                </InputOTPGroup>
              </InputOTP>

              <Button
                size={'lg'}
                disabled={isExpired}
                className="w-full justify-between"
                onClick={() => {
                  setOpen(false);
                  setIsPasswordForm(true);
                }}
              >
                Verify OTP
                <Icon
                  name="chevron_arrow_right"
                  height={24}
                  width={24}
                  className="text-white"
                />
              </Button>
            </div>

            <p className="text-black-7 text-lg">
              Didn’t get a code? Resend in{' '}
              <span className="text-primary font-semibold">
                {minutes}:{seconds}
              </span>
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChangePassword;
