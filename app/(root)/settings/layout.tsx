import NavbarHeight from '@/components/shared/navbar-height';
import React, { ReactNode } from 'react';
import SettingsSidebar from './_components/settings-sidebar';

const SettingsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <NavbarHeight />

      <div className="container py-10 md:py-12 lg:py-20">
        <div className="grid gap-10 md:gap-20 lg:grid-cols-[320px_1fr] lg:gap-32 xl:gap-40">
          <SettingsSidebar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
