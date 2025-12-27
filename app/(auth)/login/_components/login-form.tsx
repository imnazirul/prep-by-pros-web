'use client';

import Link from 'next/link';
import Icon from '@/lib/icon';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CustomInputBox } from '@/components/shared/custom-input';

const LoginForm = () => {
  const [email, setEmail] = useState('andrewhierholze@gmail.com');
  const [password, setPassword] = useState('************');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempted:', { email, rememberMe });
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
          <span className="text-black-7 text-sm">Or Sign in with</span>
        </div>

        <div className="space-y-4">
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
            placeholder="***********"
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
            <label
              htmlFor="remember"
              className="text-black-8 cursor-pointer text-sm"
            >
              Remember me
            </label>
          </div>
          <Link
            href="/forgot-password"
            className="text-black-8 text-sm hover:text-gray-900"
          >
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
          className="w-full justify-between"
        >
          Log in
          <Icon name="chevron_arrow_right" height={24} width={24} />
        </Button>

        {/* Sign Up Link */}
        <p className="text-black-7 text-lg">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="text-primary font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
