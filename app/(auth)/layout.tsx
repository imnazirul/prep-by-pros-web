import { ReactNode } from 'react';
import AuthRightSlider from './_components/auth-right-slider';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen lg:flex">
      <div className="lg:w-1/2">
        <div className="flex min-h-screen w-full items-center justify-center px-8 py-12">
          <div className="w-full lg:max-w-150">{children}</div>
        </div>
      </div>

      <AuthRightSlider />
    </div>
  );
};

export default AuthLayout;
