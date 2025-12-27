import { ReactNode } from 'react';
import PolicyButtons from './_components/policy-buttons';
import NavbarHeight from '@/components/shared/navbar-height';

const PolicyLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <NavbarHeight />
      <div className="container">
        <div className="mx-auto max-w-255 py-8 md:py-10 lg:py-12">
          <PolicyButtons />
          {children}
        </div>
      </div>
    </div>
  );
};

export default PolicyLayout;
