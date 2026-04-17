'use client';

import { CustomInputBox } from '@/components/shared/custom-input';
import RedirectingModal from '@/components/shared/redirecting-modal';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/lib/icon';
import {
  useFacebookLoginMutation,
  useGoogleLoginMutation,
  useLoginMutation,
} from '@/redux/api/authApi';
import { setCredentials } from '@/redux/features/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const userData = await login({ email, password }).unwrap();
      console.log('user', userData);
      dispatch(setCredentials({ ...userData }));

      const role =
        (typeof userData.role === 'object' && userData.role !== null
          ? userData.role.title
          : userData.role) || 'PLAYER';
      if (typeof role === 'string' && role.toUpperCase() === 'COACH') {
        router.push('/creator');
      } else {
        router.push('/');
      }
    } catch (err) {
      console.error('Login failed', err);
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };

  const [googleLogin, { isLoading: isGoogleLoading }] = useGoogleLoginMutation();
  const [facebookLogin, { isLoading: isFacebookLoading }] = useFacebookLoginMutation();

  interface LoginResponse {
    access: string;
    refresh: string;
    uid: string;
    role?: string | { title: string; [key: string]: unknown };
    [key: string]: unknown;
  }

  const handleSocialLoginSuccess = (userData: LoginResponse) => {
    console.log('social user', userData);
    // @ts-expect-error - The auth slice types are a bit loose with any, but we are passing correct shape
    dispatch(setCredentials({ ...userData }));
    const role =
      (typeof userData.role === 'object' && userData.role !== null
        ? userData.role.title
        : userData.role) || 'PLAYER';
    if (role && typeof role === 'string' && role.toUpperCase() === 'COACH') {
      router.push('/creator');
    } else {
      router.push('/');
    }
  };

  const handleGoogleLogin = async () => {
    console.log('Google login initiated');
    setErrorMessage('');
    try {
      // TODO: Integrate Google Button or Client SDK to get the actual token
      // For now, we are ready to accept the token
      const mockToken = 'PLACEHOLDER_GOOGLE_TOKEN_FROM_CLIENT_SDK';
      const userData = await googleLogin({ google_access_token: mockToken }).unwrap();
      handleSocialLoginSuccess(userData);
    } catch (err) {
      console.error('Google login failed', err);
      // setErrorMessage('Google login failed.'); // Uncomment when SDK is real
    }
  };

  const handleFacebookLogin = async () => {
    console.log('Facebook login initiated');
    setErrorMessage('');
    try {
      // TODO: Integrate Facebook Button or Client SDK to get the actual token
      // For now, we are ready to accept the token
      const mockToken = 'PLACEHOLDER_FACEBOOK_TOKEN_FROM_CLIENT_SDK';
      const userData = await facebookLogin({ facebook_access_token: mockToken }).unwrap();
      handleSocialLoginSuccess(userData);
    } catch (err) {
      console.error('Facebook login failed', err);
      // setErrorMessage('Facebook login failed.'); // Uncomment when SDK is real
    }
  };

  const [modalVisible, setModalVisible] = useState(false);

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
            disabled={isGoogleLoading || isFacebookLoading || isLoading}
          >
            <Icon height={24} width={24} name="google_logo" />
            {isGoogleLoading ? 'Loading...' : 'Continue with Google'}
          </Button>

          <Button
            type="button"
            variant="outline"
            size={'lg'}
            className="border-black-5 w-full justify-center bg-transparent font-semibold"
            onClick={handleFacebookLogin}
            disabled={isGoogleLoading || isFacebookLoading || isLoading}
          >
            <Icon height={24} width={24} name="facebook_logo" />
            {isFacebookLoading ? 'Loading...' : 'Continue with Facebook'}
          </Button>
        </div>

        <div className="py-5 text-center">
          {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
          <span className="text-black-7 text-sm">Or Sign in with</span>
        </div>

        <div className="space-y-4">
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
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              className="data-checked:bg-black-10 data-checked:border-black-10"
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <label htmlFor="remember" className="text-black-8 cursor-pointer text-sm">
              Remember me
            </label>
          </div>
          <Link href="/forgot-password" className="text-black-8 text-sm hover:text-gray-900">
            Forgot Password?
          </Link>
        </div>
      </div>

      <div className="space-y-8">
        {/* Login Button */}
        <Button
          onClick={handleSubmit}
          size={'lg'}
          type="submit"
          disabled={isLoading || isGoogleLoading || isFacebookLoading}
          className="w-full justify-between"
        >
          {isLoading ? 'Logging in...' : 'Log in'}
          <Icon name="chevron_arrow_right" height={24} width={24} />
        </Button>

        {/* Sign Up Link */}
        <p className="text-black-7 text-lg">
          Don&apos;t have an account?{' '}
          <Link href="#" onClick={() => setModalVisible(!modalVisible)} className="text-primary font-semibold hover:underline">
            Sign up
          </Link>
        </p>
       {modalVisible && <RedirectingModal />}
      </div>
    </>
  );
};

export default LoginForm;
