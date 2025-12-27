import { Metadata } from 'next';
import AuthHeader from '../_components/auth-header';
import ForgotPasswordForm from './_components/forgot-password-form';

export const metadata: Metadata = {
  title: 'Forgot Password',
};

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-8 md:space-y-10 lg:space-y-12">
      <AuthHeader
        title="Forgot your password?"
        subTitle="Nothing to worry! Follow instructions to reset your password"
      />
      <ForgotPasswordForm />
    </div>
  );
}
