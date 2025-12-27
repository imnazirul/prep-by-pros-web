import { Metadata } from 'next';
import SignUpForm from './_components/signup-form';
import AuthHeader from '../_components/auth-header';

export const metadata: Metadata = {
  title: 'Signup',
};

export default function SignUpPage() {
  return (
    <div className="space-y-8 md:space-y-10 lg:space-y-12">
      <AuthHeader
        title="Create your account now"
        subTitle="Sign up to unlock personalized features & better experience"
      />
      <SignUpForm />
    </div>
  );
}
