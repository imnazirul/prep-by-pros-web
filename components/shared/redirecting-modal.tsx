/* eslint-disable @next/next/no-img-element */
'use client';

import Icon from '@/lib/icon';
import { useSignupMutation } from '@/redux/api/authApi';
import {
  useGetClubsQuery,
  useGetPlayingStylesQuery,
  useGetProfessionalLevelsQuery,
  useGetSportsQuery,
} from '@/redux/api/globalApi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog';
import Circle3DLoader from './circle-loader';
import ConfirmModal from './confirm-modal';
import { CustomInputBox, CustomSelectBox } from './custom-input';

type StepProp = 'LOADING' | 'ACCOUNT_TYPE' | 'VERIFY';

import { selectIsAuthenticated } from '@/redux/features/authSlice';
import { useAppSelector } from '@/redux/hooks';

const RedirectingModal = () => {
  const [step, setStep] = useState<StepProp>('ACCOUNT_TYPE');
  const [open, setOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [accountType, setAccountType] = useState<'player' | 'coach'>('player');

  const router = useRouter();
  const [signup, { isLoading }] = useSignupMutation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  // Dynamic Data Fetching
  const { data: clubsData } = useGetClubsQuery();
  const { data: sportsData } = useGetSportsQuery();
  const { data: playingStylesData } = useGetPlayingStylesQuery();
  const { data: professionalLevelsData } = useGetProfessionalLevelsQuery();

  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [sport, setSport] = useState('');
  const [club, setClub] = useState('');
  const [playingStyle, setPlayingStyle] = useState('');
  const [professionalLevel, setProfessionalLevel] = useState('');
  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const validFiles = selectedFiles.filter(
        (file) =>
          ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type) &&
          file.size <= 10 * 1024 * 1024
      );

      setImages((prev) => {
        const newImages = [...prev, ...validFiles];
        return newImages.slice(0, 3);
      });
      e.target.value = '';
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // Helper to map API options to SelectBox options
  const mapOptions = (data: any) => {
    return (
      data?.results?.map((item: any) => ({
        label: item.title,
        value: item.slug,
      })) || []
    );
  };

  // Helper to extract error message
  const parseErrorMessage = (error: any) => {
    if (error?.data) {
      // If data is an object with field arrays, pick one
      const keys = Object.keys(error.data);
      if (keys.length > 0) {
        const firstKey = keys[0];
        const errorVal = error.data[firstKey];
        if (Array.isArray(errorVal) && errorVal.length > 0) {
          return `${firstKey}: ${errorVal[0]}`;
        }
        if (typeof errorVal === 'string') return errorVal;
      }
      if (error.data.message) return error.data.message;
    }
    return 'Something went wrong. Please try again.';
  };

  const handleSignUp = async () => {
    setErrorMessage('');
    try {
      const userData = {
        name,
        email,
        password,
        role: accountType.toUpperCase(),
        club_slug: club, // Assuming value matches backend requirement
        sport_slug: sport,
        playing_style_slug: playingStyle,
        professional_level_slug: professionalLevel,
      };

      const res = await signup(userData).unwrap();

      // Persist user data for UI if needed (though global state/cookie should handle auth)
      // For now relying on modal state variables for the success message

      setOpen(false);
      setConfirmModal(true);
    } catch (error) {
      console.error('Signup failed:', error);
      setErrorMessage(parseErrorMessage(error));
    }
  };

  useEffect(() => {
    // Open automaticallly on mount
    const authRoutes = [ '/signup', '/forgot-password', '/'];
    if (!isAuthenticated && !authRoutes.includes(window.location.pathname)) {
      setOpen(true);
    }

    // setTimeout(() => {
    //   if (step == 'LOADING') {
    //     setStep('ACCOUNT_TYPE');
    //   }
    // }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if (isAuthenticated) return null;

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

              <div className="w-62.5 mx-auto flex justify-center py-10">
                <Circle3DLoader />
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
                    <input
                      type="radio"
                      hidden
                      name="type"
                      checked={accountType === 'player'}
                      onChange={() => setAccountType('player')}
                    />
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
                    <input
                      type="radio"
                      hidden
                      name="type"
                      checked={accountType === 'coach'}
                      onChange={() => setAccountType('coach')}
                    />
                  </label>
                </div>
              </div>

              <Button
                onClick={() => {
                  if (accountType === 'player') {
                    setOpen(false);
                    router.push(`/signup?role=${accountType}`);
                  } else {
                    setStep('VERIFY');
                  }
                }}
                size={'lg'}
                type="submit"
                className="w-full justify-between"
              >
                Continue as {accountType}
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
                  <CustomInputBox
                    icon="lock_password"
                    label="Password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    isPassword
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <CustomSelectBox
                    icon="honour_star"
                    label="Club"
                    placeholder="Select here"
                    options={mapOptions(clubsData)}
                    value={club}
                    setValue={setClub}
                  />

                  <CustomSelectBox
                    icon="busketball"
                    label="Sport"
                    placeholder="Select here"
                    options={mapOptions(sportsData)}
                    value={sport}
                    setValue={setSport}
                  />

                  <CustomSelectBox
                    icon="football_pitch"
                    label="Playing Style"
                    placeholder="Select here"
                    options={mapOptions(playingStylesData)}
                    value={playingStyle}
                    setValue={setPlayingStyle}
                  />

                  <CustomSelectBox
                    icon="honour_star" // Reusing an icon or need a new one
                    label="Professional Level"
                    placeholder="Select here"
                    options={mapOptions(professionalLevelsData)}
                    value={professionalLevel}
                    setValue={setProfessionalLevel}
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

                  <label className="bg-background border-black-5 flex flex-col items-center justify-center space-y-3 rounded-3xl border border-dashed p-8 cursor-pointer hover:bg-black-4 transition-colors">
                    <input
                      type="file"
                      hidden
                      multiple
                      accept="image/jpeg, image/jpg, image/png"
                      onChange={handleImageChange}
                      disabled={images.length >= 3}
                    />
                    <div className="bg-primary flex size-10.5 items-center justify-center rounded-full text-white">
                      <Icon name="upload" height={24} width={24} />
                    </div>
                    <div className="space-y-1 text-center">
                      <h4 className="text-black-10 max-w-58 text-base font-medium">
                        Choose image from device or drag them here
                      </h4>
                      <p className="text-black-7 text-xs">Maximum file size: 10 MB</p>
                    </div>
                  </label>

                  {images.length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-3">
                      {images.map((file, index) => (
                        <div key={index} className="relative h-35">
                          <img
                            src={URL.createObjectURL(file)}
                            className="h-full w-auto rounded-3xl object-cover"
                            alt=""
                          />
                          <div
                            onClick={() => removeImage(index)}
                            className="bg-black-5 hover:bg-black-6 hover:text-red outline-background text-black-9 absolute top-1 right-1 flex size-6 translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full outline-2"
                          >
                            <Icon name="close" height={13} width={13} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {errorMessage && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-500">{errorMessage}</div>
              )}
              <Button
                onClick={handleSignUp}
                size={'lg'}
                type="submit"
                className="w-full justify-between"
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Request for verification'}
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
            Congratulations <span className="text-black-10 font-medium">{name}</span>, we’ve
            confirmed your details. Now you can go further to sign up
          </>
        }
      />
    </>
  );
};

export default RedirectingModal;
