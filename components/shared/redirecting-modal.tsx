/* eslint-disable @next/next/no-img-element */
'use client';

import Icon from '@/lib/icon';
import { useSignupMutation, usePatchMeMutation, useGetMeMutation, useSendOtpMutation, useVerifyOtpMutation } from '@/redux/api/authApi';
import {
  useGetClubsQuery,
  useGetPlayingStylesQuery,
  useGetProfessionalLevelsQuery,
  useGetSportsQuery,
  useUploadFileMutation,
} from '@/redux/api/globalApi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog';
import Circle3DLoader from './circle-loader';
import ConfirmModal from './confirm-modal';
import { CustomInputBox, CustomSelectBox } from './custom-input';

type StepProp = 'LOADING' | 'ACCOUNT_TYPE' | 'VERIFY' | 'OTP';

import { selectCurrentUser, selectIsAuthenticated, selectIsVerificationRequested, setVerificationRequested } from '@/redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

const RedirectingModal = ({
  initialStep,
  initialOpen = false,
  isDismissible = true,
}: {
  initialStep?: StepProp;
  initialOpen?: boolean;
  isDismissible?: boolean;
}) => {
  const [step, setStep] = useState<StepProp>(initialStep || 'ACCOUNT_TYPE');
  const [open, setOpen] = useState(initialOpen);
  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmType, setConfirmType] = useState<'REQUEST_SUCCESS' | 'WAITING' | 'CONFIRMED' | null>(null);
  const [accountType, setAccountType] = useState<'player' | 'coach'>('player');

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [signup, { isLoading: isSigningUp }] = useSignupMutation();
  const [patchMe, { isLoading: isPatching }] = usePatchMeMutation();
  const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();
  const [getMe, { isLoading: isFetchingMe }] = useGetMeMutation();
  const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();
  const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();
  const isLoading = isSigningUp || isPatching || isUploading || isFetchingMe || isSendingOtp || isVerifyingOtp;
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const currentUser = useAppSelector(selectCurrentUser);
  const isVerificationRequested = useAppSelector(selectIsVerificationRequested);

  // Dynamic Data Fetching
  const { data: clubsData } = useGetClubsQuery();
  const { data: sportsData } = useGetSportsQuery();
  const { data: playingStylesData } = useGetPlayingStylesQuery();
  const { data: professionalLevelsData } = useGetProfessionalLevelsQuery();

  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');
  const [password] = useState('');
  const [sport, setSport] = useState('');
  const [club, setClub] = useState('');
  const [playingStyle, setPlayingStyle] = useState('');
  const [professionalLevel, setProfessionalLevel] = useState('');
  const [subscriptionAmount, setSubscriptionAmount] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [otp, setOtp] = useState('');

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.first_name || '');
      setEmail(currentUser.email || '');
    }
  }, [currentUser]);

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
        club_slug: club, 
        sport_slug: sport,
        playing_style_slug: playingStyle,
        professional_level_slug: professionalLevel,
        subscription_amount: subscriptionAmount,
      };

      if (step === 'VERIFY') {
        let userUid = currentUser?.uid;

        // Fetch user data if UID is missing
        if (!userUid) {
          const userRes = await getMe({}).unwrap();
          userUid = userRes.uid;
        }

        const updateData = {
          first_name: name,
          email: email,
          club_slug: club,
          sport_slug: sport,
          playing_style_slug: playingStyle,
          professional_level_slug: professionalLevel,
          subscription_amount: subscriptionAmount,
        };
        await patchMe(updateData).unwrap();

        // Handle Image Uploads
        if (images.length > 0) {
          for (const image of images) {
            const formData = new FormData();
            formData.append('file', image);
            if (userUid) {
              formData.append('user_uid', userUid);
            }
            await uploadFile(formData).unwrap();
          }
        }
        dispatch(setVerificationRequested(true));
        // Show initial success modal before OTP
        setConfirmType('REQUEST_SUCCESS');
        setConfirmModal(true);
        setOpen(false);
      } else {
        const res = (await signup(userData).unwrap()) as any;
        if (res.requires_otp) {
          setStep('OTP');
        } else {
          setConfirmType('CONFIRMED');
          setConfirmModal(true);
          setOpen(false);
        }
      }
    } catch (error) {
      console.error('Signup/Verification failed:', error);
      setErrorMessage(parseErrorMessage(error));
    }
  };
 
  const handleVerifyOtp = async () => {
    setErrorMessage('');
    try {
      await verifyOtp({
        email,
        otp,
        location: 'unknown', // Web fallback
      }).unwrap();
 
      // Refresh user data after verification
      await getMe({}).unwrap();
 
      setConfirmType('WAITING');
      setConfirmModal(true);
      setOpen(false);
    } catch (error) {
      console.error('OTP verification failed:', error);
      setErrorMessage(parseErrorMessage(error));
    }
  };
 
  const handleProceedToOtp = async () => {
    try {
      await sendOtp({ email }).unwrap();
      setConfirmModal(false);
      setStep('OTP');
      setOpen(true);
    } catch {
      setErrorMessage('Failed to send OTP. Please try again.');
    }
  };

  useEffect(() => {
    // Auto-open for unverified coaches
    if (isAuthenticated && currentUser) {
      const roleTitle = typeof currentUser.role === 'object' ? currentUser.role?.title : currentUser.role;
      const isCoach = roleTitle?.toString().toUpperCase() === 'COACH';
      const isUnverified = !currentUser.is_email_verified;

      if (isCoach && isUnverified && window.location.pathname !== '/select-role') {
        setOpen(true);
        if (isVerificationRequested) {
          setStep('OTP');
        } else {
          setStep('VERIFY');
        }
        return; // Don't run other open logic
      }
    }

    if (initialOpen) {
      setOpen(true);
    } else if (!isAuthenticated) {
      const authRoutes = ['/login', '/signup', '/forgot-password', '/', '/select-role'];
      if (!authRoutes.includes(window.location.pathname)) {
        setOpen(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, currentUser]);


  const roleTitle = typeof currentUser?.role === 'object' ? currentUser?.role?.title : currentUser?.role;
  const isEnforced = 
    isAuthenticated && 
    roleTitle?.toString().toUpperCase() === 'COACH' && 
    !currentUser?.is_email_verified;

  useEffect(() => {
    if (currentUser?.is_email_verified && isVerificationRequested) {
      dispatch(setVerificationRequested(false));
    }
  }, [currentUser, isVerificationRequested, dispatch]);

  const finalDismissible = isDismissible && !isEnforced;

  return (
    <>
      <Dialog open={open} onOpenChange={(val) => finalDismissible && setOpen(val)}>
        <DialogContent 
          showCloseButton={false} 
          className="w-full gap-0 sm:max-w-170"
          onPointerDownOutside={(e) => !finalDismissible && e.preventDefault()}
          onEscapeKeyDown={(e) => !finalDismissible && e.preventDefault()}
        >
          <DialogTitle className="hidden">Verification</DialogTitle>
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
                  if (accountType === 'player' || accountType === 'coach') {
                    setOpen(false);
                    router.push(`/signup?role=${accountType}`);
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
                  {/* <CustomInputBox
                    icon="lock_password"
                    label="Password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    isPassword
                    onChange={(e) => setPassword(e.target.value)}
                  /> */}
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
                    icon="honour_star"
                    label="Professional Level"
                    placeholder="Select here"
                    options={mapOptions(professionalLevelsData)}
                    value={professionalLevel}
                    setValue={setProfessionalLevel}
                  />

                  <CustomInputBox
                    icon="dollar_circle"
                    label="Subscription Amount (Monthly)"
                    placeholder="0 USD"
                    type="text"
                    value={subscriptionAmount}
                    onChange={(e) => setSubscriptionAmount(e.target.value)}
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
          ) : step === 'OTP' ? (
            <div className="flex flex-col gap-10">
              <Icon name={'logo'} height={88} width={155} />
              <div className="space-y-6">
                <div className="space-y-2">
                  <DialogTitle>Verify your email</DialogTitle>
                  <DialogDescription>
                    Enter the 6-digit code we sent to{' '}
                    <span className="text-black-10 font-medium">{email}</span>
                  </DialogDescription>
                </div>
 
                <div className="flex flex-col gap-4">
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="000000"
                      className="text-black-10 placeholder:text-black-5 h-15 w-full rounded-2xl border border-black-2 bg-transparent px-5 text-center text-2xl font-semibold tracking-widest outline-none focus:border-primary"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </div>
 
                  <div className="flex justify-between text-sm">
                    <p className="text-black-7">Didn&apos;t get it?</p>
                    <button
                      onClick={() => sendOtp({ email })}
                      className="text-primary font-medium hover:underline"
                      disabled={isSendingOtp}
                    >
                      {isSendingOtp ? 'Sending...' : 'Resend OTP'}
                    </button>
                  </div>
                </div>
              </div>
 
              {errorMessage && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-500">{errorMessage}</div>
              )}
 
              <Button
                onClick={handleVerifyOtp}
                size={'lg'}
                className="w-full justify-between"
                disabled={otp.length !== 6 || isLoading}
              >
                {isLoading ? 'Verifying...' : 'Verify Code'}
                <Icon name="chevron_arrow_right" height={24} width={24} />
              </Button>
            </div>
          ) : (
            ''
          )}
        </DialogContent>
      </Dialog>
 
      <ConfirmModal
        open={confirmModal}
        setOpen={setConfirmModal}
        isDismissible={finalDismissible}
        icon={
          confirmType === 'REQUEST_SUCCESS'
            ? 'happy_image'
            : confirmType === 'WAITING'
              ? 'waiting_image'
              : 'confirm_image'
        }
        iconWidth={
          confirmType === 'REQUEST_SUCCESS' ? 398 : confirmType === 'WAITING' ? 477 : 480
        }
        iconHeight={
          confirmType === 'REQUEST_SUCCESS' ? 340 : confirmType === 'WAITING' ? 343 : 320
        }
        title={
          confirmType === 'REQUEST_SUCCESS'
            ? 'Request successful!'
            : confirmType === 'WAITING'
              ? 'We’re confirming your details!'
              : 'Your details have confirmed!'
        }
        buttonLabel={confirmType === 'REQUEST_SUCCESS' ? 'Continue to verify' : 'Back to home'}
        buttonAction={
          confirmType === 'REQUEST_SUCCESS'
            ? handleProceedToOtp
            : () => {
                router.push('/');
                setConfirmModal(false);
              }
        }
        subTitle={
          confirmType === 'REQUEST_SUCCESS' ? (
            <>
              Thank you for your request we’ve sent a mail to{' '}
              <span className="text-[#38BDF8]">{email}</span>
            </>
          ) : confirmType === 'WAITING' ? (
            'It usually takes between 5 minutes to 24 hours we’ll send confirmation a mail after verification'
          ) : (
            <>
              Congratulations <span className="text-black-10 font-medium">{name}</span>, we’ve
              confirmed your details. Now you can go further to sign up
            </>
          )
        }
      />
    </>
  );
};
 
export default RedirectingModal;
