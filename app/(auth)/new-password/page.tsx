import { Metadata } from 'next';
import AuthHeader from '../_components/auth-header';
import NewPasswordForm from './_components/new-password-form';

export const metadata: Metadata = {
  title: 'New Password',
};

export default function NewPasswordPage() {
  return (
    <div className="space-y-8 md:space-y-10 lg:space-y-12">
      <AuthHeader
        title="Create new password"
        subTitle="This password should be different from the previous one!"
      />
      <NewPasswordForm />
    </div>
  );
}
