import { Metadata } from 'next';
import AuthHeader from '../_components/auth-header';
import LoginForm from './_components/login-form';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <div className="space-y-8 md:space-y-10 lg:space-y-12">
      <AuthHeader
        title="Welcome back!"
        subTitle="Log in to continue where you left off only with one click"
      />
      <LoginForm />
    </div>
  );
}
