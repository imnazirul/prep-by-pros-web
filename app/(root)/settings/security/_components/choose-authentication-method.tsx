import { Button } from '@/components/ui/button';
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
import { Switch } from '@/components/ui/switch';
import Icon, { IconName } from '@/lib/icon';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type StepProp = 'CHOOSE' | 'VERIFICATION' | 'OTP';

const ChooseAuthenticationMethod = ({
  enableModal,
  setEnableModal,
  selectedOption = 'MOBILE',
  setPhoneVerification,
  setEmailVerification,
}: {
  enableModal: boolean;
  setEnableModal: Dispatch<SetStateAction<boolean>>;
  selectedOption: 'MOBILE' | 'EMAIL';
  setPhoneVerification: Dispatch<SetStateAction<Date | null>>;
  setEmailVerification: Dispatch<SetStateAction<Date | null>>;
}) => {
  const [selected, setSelected] = useState<'MOBILE' | 'EMAIL'>(selectedOption);
  const [step, setStep] = useState<StepProp>('CHOOSE');

  useEffect(() => {
    setSelected(selectedOption);
  }, [selectedOption]);

  return (
    <Dialog open={enableModal} onOpenChange={setEnableModal}>
      <DialogContent className="sm:max-w-170" showCloseButton={false}>
        <DialogHeader className="mb-10">
          <DialogTitle>
            {step === 'CHOOSE'
              ? 'Choose authentication method'
              : step === 'VERIFICATION'
                ? 'Phone verification'
                : 'Enter the OTP'}
          </DialogTitle>
          <DialogDescription>
            {step === 'CHOOSE'
              ? "In addition to your username and password, you'll have to enter a code to log into your account"
              : step === 'VERIFICATION'
                ? "In addition to your username and password, you'll have to enter a code sent to your phone"
                : 'Verify your identity to  reset  your password'}
          </DialogDescription>
        </DialogHeader>

        {step === 'CHOOSE' ? (
          <div className="space-y-10 rounded-3xl border border-[#BBCAC9] p-6">
            {[
              {
                label: 'Mobile',
                value: 'MOBILE',
                icon: 'call' as IconName,
              },
              {
                label: 'Email',
                value: 'EMAIL',
                icon: 'email' as IconName,
              },
            ].map(({ label, value, icon }) => (
              <button
                key={value}
                onClick={() => setSelected(value as 'MOBILE' | 'EMAIL')}
                className="border-primary-200/60 flex w-full cursor-pointer items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <Icon
                    name={icon}
                    height={28}
                    width={28}
                    className="text-black-8"
                  />
                  <span className={`text-black-8 text-2xl`}>{label}</span>
                </div>

                <Icon
                  name={
                    selected == value
                      ? 'checkmark_circle_fill'
                      : 'checkmark_circle'
                  }
                  height={28}
                  width={28}
                  className={
                    selected == value ? 'text-primary' : 'text-[#BFBFBF]'
                  }
                />
              </button>
            ))}
          </div>
        ) : step === 'VERIFICATION' ? (
          <div className="space-y-8">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="grid gap-2.5">
                  <span className="text-[#525252]">
                    {selected === 'EMAIL' ? 'Email' : 'Phone number'}
                  </span>
                  <span className="text-xl text-[#404040]">
                    {selected === 'MOBILE'
                      ? '************90'
                      : 'and*********.com'}
                  </span>
                </div>
                <Switch size="sm" />
              </div>

              <Button
                variant="link"
                className="text-primary h-auto p-0! text-base font-medium underline"
              >
                Use different email
              </Button>
            </div>

            <div className="bg-primary-200 flex items-start gap-3 rounded-full px-5 py-4">
              <Icon
                name="alert"
                height={18}
                width={18}
                className="text-primary mt-0.5"
              />
              <p className="max-w-94.75 text-sm text-[#404040]">
                Use the same{' '}
                {selected === 'MOBILE'
                  ? 'phone number for'
                  : 'mail for two factor'}{' '}
                authentication or use a different one.
              </p>
            </div>
          </div>
        ) : step === 'OTP' ? (
          <div>
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
          </div>
        ) : (
          <div></div>
        )}

        <div className="mt-10 grid grid-cols-2 gap-3">
          <Button
            size={'lg'}
            onClick={() => {
              if (step === 'CHOOSE') setEnableModal(false);
              else if (step === 'VERIFICATION') setStep('CHOOSE');
              else if (step === 'OTP') setStep('VERIFICATION');
            }}
            className="bg-primary-200 hover:bg-primary-300 text-primary hover:text-primary"
          >
            Cancel
          </Button>
          <Button
            size={'lg'}
            onClick={() => {
              if (step === 'CHOOSE') setStep('VERIFICATION');
              else if (step === 'VERIFICATION') setStep('OTP');
              else if (step === 'OTP') {
                if (selected === 'MOBILE') {
                  setPhoneVerification(new Date());
                } else {
                  setEmailVerification(new Date());
                }
                setStep('CHOOSE');
                setEnableModal(false);
              }
            }}
          >
            Next
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChooseAuthenticationMethod;
