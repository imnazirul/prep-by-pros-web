import { Metadata } from 'next';
import RedirectingModal from '@/components/shared/redirecting-modal';
import AuthHeader from '../_components/auth-header';

export const metadata: Metadata = {
  title: 'Select Role',
};

export default function RegisterPage() {
  return (
    <div className="space-y-8 md:space-y-10 lg:space-y-12">
      <AuthHeader
        title="Join Prep by Pros"
        subTitle="Select your role to get started with the best sports training platform"
      />
      <RedirectingModal />
    </div>
  );
}
