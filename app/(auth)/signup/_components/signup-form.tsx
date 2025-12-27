'use client';

import Link from 'next/link';
import Icon from '@/lib/icon';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CustomInputBox } from '@/components/shared/custom-input';
import PreferenceModal from './preferences-modal';

const SignUpForm = () => {
  const [openPreference, setOpenPreference] = useState(false);

  const [email, setEmail] = useState('andrewhierholze@gmail.com');
  const [name, setName] = useState('andrewhierholze');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup attempted:');

    setOpenPreference(true);
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
          <span className="text-black-7 text-sm">Or Sign up with</span>
        </div>

        <div className="space-y-4">
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
            placeholder="Re-type Password"
            type="password"
            value={password}
            isPassword
            onChange={(e) => setPassword(e.target.value)}
          />
          <CustomInputBox
            icon="lock_password"
            label="Re-type Password"
            placeholder="Re-type Password"
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
          <label
            htmlFor="remember"
            className="text-black-8 cursor-pointer text-sm"
          >
            I agree to the{' '}
            <Link
              href={'/terms-and-conditions'}
              className="font-medium text-[#60A5FA] underline"
            >
              terms and conditions.
            </Link>
          </label>
        </div>
      </div>

      <div className="space-y-8">
        <Button
          onClick={handleSubmit}
          size={'lg'}
          type="submit"
          className="w-full justify-between"
        >
          Sign up
          <Icon name="chevron_arrow_right" height={24} width={24} />
        </Button>

        <p className="text-black-7 text-lg">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-primary font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>

      <PreferenceModal
        setOpenPreference={setOpenPreference}
        openPreference={openPreference}
      />
    </>
  );
};

export default SignUpForm;
