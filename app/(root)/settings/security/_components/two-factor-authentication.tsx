'use client';

import { Button } from '@/components/ui/button';
import Icon from '@/lib/icon';
import { useState } from 'react';
import ChooseAuthenticationMethod from './choose-authentication-method';
import { timeAgoShort } from '@/lib/helper';

const TwoFactorAuthentication = () => {
  const [phoneVerification, setPhoneVerification] = useState<Date | null>(null);
  const [emailVerification, setEmailVerification] = useState<Date | null>(null);

  const [enableModal, setEnableModal] = useState(false);

  const [selectedOption, setSelectedOption] = useState<'MOBILE' | 'EMAIL'>(
    'MOBILE',
  );

  return (
    <>
      <section
        className={
          phoneVerification && emailVerification ? 'space-y-6' : 'space-y-4'
        }
      >
        <h2 className="text-black-10 text-[22px] font-semibold">
          Two factor authentication
        </h2>

        {phoneVerification || emailVerification ? (
          <div className="space-y-4">
            {/* Phone Number Verification */}
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h2 className="text-black-10 text-[22px] font-semibold">
                  Phone Number Verification
                </h2>
                <p className="text-sm text-[#737373]">
                  {phoneVerification
                    ? `Configured since ${timeAgoShort(phoneVerification)}`
                    : 'Not configured'}
                </p>
              </div>
              <Button
                onClick={() => {
                  if (phoneVerification) {
                    return;
                  }
                  setSelectedOption('MOBILE');
                  setEnableModal(true);
                }}
                variant="link"
                className="text-primary h-auto p-0! text-base font-semibold underline"
              >
                {phoneVerification ? 'Turn off' : 'Turn on'}
              </Button>
            </div>

            {/* Email Verification */}
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h2 className="text-black-10 text-[22px] font-semibold">
                  Email verification
                </h2>
                <p className="text-sm text-[#737373]">
                  {emailVerification
                    ? `Configured since ${timeAgoShort(emailVerification)}`
                    : 'Not configured'}
                </p>
              </div>

              <Button
                variant="link"
                onClick={() => {
                  if (emailVerification) {
                    return;
                  }
                  setSelectedOption('EMAIL');
                  setEnableModal(true);
                }}
                className="text-primary h-auto p-0! text-base font-semibold underline"
              >
                {emailVerification ? 'Turn off' : 'Turn on'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-between gap-5 rounded-4xl bg-[#FEF3C7] py-5 pr-6 pl-4 md:flex-row md:items-center md:rounded-full">
            <div className="flex flex-1 gap-4 md:items-center">
              <div className="bg-black-9 flex size-14 shrink-0 items-center justify-center rounded-full text-white">
                <Icon name="lock_password" height={32} width={32} />
              </div>
              <div className="space-y-1">
                <h4 className="font-medium text-[#404040]">
                  Secure Your Account
                </h4>
                <p className="text-sm text-[#737373]">
                  Two-factor authentication adds an extra layer of security to
                  your account. An additional 6 digit code is needed to be
                  logged in.
                </p>
              </div>
            </div>

            <Button
              onClick={() => setEnableModal(true)}
              className="hover:bg-black-12 bg-[#1F2937] px-6 text-sm"
            >
              Enable now
            </Button>
          </div>
        )}
      </section>

      <ChooseAuthenticationMethod
        setEnableModal={setEnableModal}
        enableModal={enableModal}
        selectedOption={selectedOption}
        setPhoneVerification={setPhoneVerification}
        setEmailVerification={setEmailVerification}
      />
    </>
  );
};

export default TwoFactorAuthentication;
