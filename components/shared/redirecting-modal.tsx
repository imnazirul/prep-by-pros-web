/* eslint-disable @next/next/no-img-element */
'use client';

import Icon from '@/lib/icon';
import { Button } from '../ui/button';
import ConfirmModal from './confirm-modal';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CustomInputBox, CustomSelectBox } from './custom-input';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog';

type StepProp = 'LOADING' | 'ACCOUNT_TYPE' | 'VERIFY';

const RedirectingModal = () => {
  const [step, setStep] = useState<StepProp>('LOADING');
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const [confirmModal, setConfirmModal] = useState(false);

  const router = useRouter();

  const [email, setEmail] = useState('andrewhierholze@gmail.com');
  const [name, setName] = useState('andrewhierholze');
  const [sport, setSport] = useState('');
  const [club, setClub] = useState('');
  const [playingStyle, setPlayingStyle] = useState('');

  const redirecting = searchParams.get('redirecting');

  useEffect(() => {
    setTimeout(() => {
      if (step == 'LOADING') {
        setStep('ACCOUNT_TYPE');
      }
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setOpen(redirecting === 'true');
  }, [redirecting]);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent showCloseButton={false} className="w-full gap-0 sm:max-w-170">
          {step === 'LOADING' ? (
            <div className="flex flex-col items-center justify-center lg:py-6">
              <Icon name={'logo'} height={88} width={155} />
              <div className="mx-auto mt-8 max-w-120.5 space-y-3 text-center">
                <DialogTitle>One more step</DialogTitle>
                <DialogDescription>
                  Just a minute! We are redirecting you to our webapp...
                </DialogDescription>
              </div>

              <div className="w-62.5 mx-auto">
                <img src={'/images/loader.gif'} alt="Loader" className="w-full h-auto" />
              </div>
            </div>
          ) : step === 'ACCOUNT_TYPE' ? (
            <div className="flex flex-col gap-15">
              <Icon name={'logo'} height={88} width={155} />
              <div className="space-y-8">
                <div className="space-y-2">
                  <DialogTitle>Choose your account type</DialogTitle>
                  <DialogDescription>
                    Are you the player in action or the coach in charge?
                  </DialogDescription>
                </div>
                <div className="grid grid-cols-2 items-center gap-4 lg:h-90">
                  <label
                    style={{
                      backgroundImage: `url('/images/player.png')`,
                    }}
                    className="relative z-1 flex aspect-280/300 cursor-pointer flex-col justify-end gap-3 overflow-hidden rounded-4xl bg-cover p-5 transition-all duration-300 after:absolute after:inset-0 after:-z-1 after:bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_45.54%,rgba(0,0,0,0.60)_84.6%)] has-[input:checked]:aspect-304/360"
                  >
                    <h3 className="text-[28px] font-semibold text-white">Player</h3>
                    <p className="text-black-5">
                      Sharpen your skills, track your progress & rise through the ranks
                    </p>
                    <input type="radio" hidden defaultChecked={true} name="type" />
                  </label>

                  <label
                    style={{
                      backgroundImage: `url('/images/coach.png')`,
                    }}
                    className="relative z-1 flex aspect-280/300 cursor-pointer flex-col justify-end gap-3 overflow-hidden rounded-4xl bg-cover p-5 transition-all duration-300 after:absolute after:inset-0 after:-z-1 after:bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_45.54%,rgba(0,0,0,0.60)_84.6%)] has-[input:checked]:aspect-304/360"
                  >
                    <h3 className="text-[28px] font-semibold text-white">Coach</h3>
                    <p className="text-black-5">
                      Show your game, build legacy & lead next generation of champions
                    </p>
                    <input type="radio" hidden name="type" />
                  </label>
                </div>
              </div>

              <Button
                onClick={() => setStep('VERIFY')}
                size={'lg'}
                type="submit"
                className="w-full justify-between"
              >
                Continue as player
                <Icon name="chevron_arrow_right" height={24} width={24} />
              </Button>
            </div>
          ) : step === 'VERIFY' ? (
            <div className="flex flex-col gap-15">
              <Icon name={'logo'} height={88} width={155} />
              <div className="space-y-8">
                <div className="space-y-2">
                  <DialogTitle>Verify before you sign up</DialogTitle>
                  <DialogDescription>
                    Fill the form with required information to continue
                  </DialogDescription>
                </div>
                <div className="grid gap-4">
                  <CustomInputBox
                    icon="user_2"
                    label="Name"
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <CustomInputBox
                    icon="email"
                    label="Email Address"
                    placeholder="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <CustomSelectBox
                    icon="honour_star"
                    label="Club"
                    placeholder="Select here"
                    options={[
                      { label: 'Programming Club', value: 'programming_club' },
                      { label: 'Robotics Club', value: 'robotics_club' },
                      { label: 'Science Club', value: 'science_club' },
                      { label: 'Math Club', value: 'math_club' },
                      { label: 'Debate Club', value: 'debate_club' },
                      {
                        label: 'English Language Club',
                        value: 'english_language_club',
                      },
                      { label: 'Business Club', value: 'business_club' },
                      { label: 'Photography Club', value: 'photography_club' },
                      { label: 'Art Club', value: 'art_club' },
                      { label: 'Music Club', value: 'music_club' },
                    ]}
                    value={club}
                    setValue={setClub}
                  />

                  <CustomSelectBox
                    icon="busketball"
                    label="Sport"
                    placeholder="Select here"
                    options={[
                      { label: 'Football', value: 'Football' },
                      { label: 'Cricket', value: 'Cricket' },
                      { label: 'Badminton', value: 'Badminton' },
                      { label: 'Basketball', value: 'Basketball' },
                      { label: 'Volleyball', value: 'Volleyball' },
                      { label: 'Tennis', value: 'Tennis' },
                    ]}
                    value={sport}
                    setValue={setSport}
                  />

                  <CustomSelectBox
                    icon="football_pitch"
                    label="Playing Style"
                    placeholder="Select here"
                    options={[
                      { label: 'Offensive', value: 'Offensive' },
                      { label: 'Defensive', value: 'Defensive' },
                      { label: 'All-Rounder', value: 'All-Rounder' },
                      { label: 'Aggressive', value: 'Aggressive' },
                      { label: 'Balanced', value: 'Balanced' },
                    ]}
                    value={playingStyle}
                    setValue={setPlayingStyle}
                  />
                </div>
                <div>
                  <div className="mb-4 flex items-center gap-4">
                    <div className="bg-black-6 flex size-10 items-center justify-center rounded-full text-white">
                      <Icon name="upload" height={24} width={24} />
                    </div>
                    <ul className="text-black-7 list-inside list-disc text-sm">
                      <li>Upload only 3 images that can confirm your identity</li>
                      <li>Only JPG, JPEG & PNG formats are supported</li>
                    </ul>
                  </div>

                  <div className="bg-background border-black-5 flex flex-col items-center justify-center space-y-3 rounded-3xl border border-dashed p-8">
                    <div className="bg-primary flex size-10.5 items-center justify-center rounded-full text-white">
                      <Icon name="upload" height={24} width={24} />
                    </div>
                    <div className="space-y-1 text-center">
                      <h4 className="text-black-10 max-w-58 text-base font-medium">
                        Choose image from device or drag them here
                      </h4>
                      <p className="text-black-7 text-xs">Maximum file size: 10 MB</p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {['/images/upload-file-1.png', '/images/upload-file-2.png'].map(
                      (file, index) => (
                        <div key={index} className="relative h-35">
                          <img src={file} className="h-full w-auto rounded-3xl" alt="" />
                          <div className="bg-black-5 hover:bg-black-6 hover:text-red outline-background text-black-9 absolute top-1 right-1 flex size-6 translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full outline-2">
                            <Icon name="close" height={13} width={13} />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              <Button
                onClick={() => {
                  setOpen(false);
                  setConfirmModal(true);
                }}
                size={'lg'}
                type="submit"
                className="w-full justify-between"
              >
                Request for verification
                <Icon name="chevron_arrow_right" height={24} width={24} />
              </Button>
            </div>
          ) : (
            ''
          )}
        </DialogContent>
      </Dialog>

      {/* Email Sent Modal */}
      {/* <ConfirmModal
        icon="happy_image"
        iconWidth={398}
        iconHeight={340}
        open={confirmModal}
        setOpen={setConfirmModal}
        title="Request successful!"
        buttonLabel="Go to mail"
        buttonAction={() => {
          router.push('/');
          setConfirmModal(false);
        }}
        subTitle={
          <>
            Thank you for your request we’ve sent a mail to{' '}
            <span className="text-[#38BDF8]">andrewhierholze@gmail.com</span>
          </>
        }
      /> */}

      {/* Email Wating Modal */}

      {/* <ConfirmModal
        icon="waiting_image"
        iconWidth={477}
        iconHeight={343}
        open={confirmModal}
        setOpen={setConfirmModal}
        title="We’re confirming your details!"
        buttonLabel="Go to mail"
        buttonAction={() => {
          router.push('/');
          setConfirmModal(false);
        }}
        subTitle="It usually takes between 5 minutes to 24 hours we’ll send confirmation a mail after verification"
      /> */}

      {/* Confirmed Modal */}
      <ConfirmModal
        icon="confirm_image"
        iconWidth={480}
        iconHeight={320}
        open={confirmModal}
        setOpen={setConfirmModal}
        title="Your details have confirmed!"
        buttonLabel="Go to mail"
        buttonAction={() => {
          router.push('/signup');
          setConfirmModal(false);
        }}
        subTitle={
          <>
            Congratulations <span className="text-black-10 font-medium">Andrerw</span>, we’ve
            confirmed your details. Now you can go further to sign up
          </>
        }
      />
    </>
  );
};

export default RedirectingModal;
