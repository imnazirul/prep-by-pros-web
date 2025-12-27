import React from 'react';
import { Header } from '@/components/layouts/header';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
