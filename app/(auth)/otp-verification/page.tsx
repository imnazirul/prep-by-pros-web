import { Metadata } from 'next';
import AuthHeader from '../_components/auth-header';
import OTPVerificationForm from './_components/otp-verification-form';

export const metadata: Metadata = {
  title: 'OTP Verification',
};

export default function OTPVerificationPage() {
  return (
    <div className="space-y-8 md:space-y-10 lg:space-y-12">
      <AuthHeader
        title="Enter the OTP"
        subTitle="Verify your identity to  reset  your password"
      />
      <OTPVerificationForm />
    </div>
  );
}
