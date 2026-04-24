'use client';

import { CustomInputBox } from '@/components/shared/custom-input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/lib/icon';
import Link from 'next/link';
import { useState } from 'react';
import PreferenceModal from './preferences-modal';
import RedirectingModal from '@/components/shared/redirecting-modal';
import { setCredentials } from '@/redux/features/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { useSignupMutation } from '@/redux/api/authApi';
import { useSearchParams, useRouter } from 'next/navigation';

const SignUpForm = () => {
  const [openPreference, setOpenPreference] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'PLAYER';
  const referral_code = searchParams.get('ref') || '';

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [signup, { isLoading }] = useSignupMutation();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (password !== rePassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    // Proceed to preferences or verification
    if (role.trim().toUpperCase() === 'COACH') {
      try {
        const res = await signup({
          name: name,
          email: email,
          password: password,
          role: 'COACH',
          club_slug: 'pga-tour',
          sport_slug: 'basketball-men',
          playing_style_slug: 'goalkeeper',
          professional_level_slug: 'current-college',
          subscription_amount: '0',
          referral_code: referral_code || undefined,
        }).unwrap();

        // Signup successful, redirect to login page
        router.push('/login');
      } catch (err: any) {
        setErrorMessage(err?.data?.detail || err?.data?.email?.[0] || 'Signup failed');
      }
    } else {
      setOpenPreference(true);
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login initiated');
  };

  const handleFacebookLogin = () => {
    console.log('Facebook login initiated');
  };
  return (
    <>
      <div>
        {/* Social Login Buttons */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Button
            type="button"
            variant="outline"
            size={'lg'}
            className="border-black-5 w-full justify-center bg-transparent font-semibold"
            onClick={handleGoogleLogin}
          >
            <Icon height={24} width={24} name="google_logo" />
            Continue with Google
          </Button>

          <Button
            type="button"
            variant="outline"
            size={'lg'}
            className="border-black-5 w-full justify-center bg-transparent font-semibold"
            onClick={handleFacebookLogin}
          >
            <Icon height={24} width={24} name="facebook_logo" />
            Continue with Facebook
          </Button>
        </div>

        <div className="py-5 text-center">
          {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
          <span className="text-black-7 text-sm">Or Sign up with</span>
        </div>

        <div className="space-y-4">
          <CustomInputBox
            icon="user_2"
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <CustomInputBox
            icon="email"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <CustomInputBox
            icon="lock_password"
            label="Password"
            type="password"
            value={password}
            isPassword
            onChange={(e) => setPassword(e.target.value)}
          />
          <CustomInputBox
            icon="lock_password"
            label="Re-type Password"
            type="password"
            value={rePassword}
            isPassword
            onChange={(e) => setRePassword(e.target.value)}
          />
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="mt-3 flex items-center gap-2">
          <Checkbox
            id="remember"
            checked={rememberMe}
            className="data-checked:bg-black-10 data-checked:border-black-10"
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
          />
          <label htmlFor="remember" className="text-black-8 cursor-pointer text-sm">
            I agree to the{' '}
            <Link href={'/terms-and-conditions'} className="font-medium text-[#60A5FA] underline">
              terms and conditions.
            </Link>
          </label>
        </div>
      </div>

      <div className="space-y-8">
        <Button onClick={handleSubmit} size={'lg'} type="submit" className="w-full justify-between">
          Sign up
          <Icon name="chevron_arrow_right" height={24} width={24} />
        </Button>

        <p className="text-black-7 text-lg">
          Already have an account?{' '}
          <Link href="/login" className="text-primary font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>

      {role.trim().toUpperCase() !== 'COACH' && (
        <PreferenceModal
          setOpenPreference={setOpenPreference}
          openPreference={openPreference}
          userData={{ name, email, password }}
          role={role}
          referral_code={referral_code}
          onCoachSignup={() => {
            // No need to show local verification modal, 
            // the global VerificationGuard will handle it 
            // as soon as the user is logged in.
            setOpenPreference(false);
          }}
        />
      )}

      {showVerification && (
        <RedirectingModal
          initialOpen={true}
          initialStep="VERIFY"
          isDismissible={true}
          initialUserData={{ name, email, password }}
          initialAccountType="coach"
        />
      )}
    </>
  );
};

export default SignUpForm;
