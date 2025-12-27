import { Metadata } from 'next';
import NavbarHeight from '@/components/shared/navbar-height';
import HelpCenterCard from './_components/help-center-card';

export const metadata: Metadata = {
  title: 'Help Center',
};

const HelpCenterPage = () => {
  return (
    <div>
      <NavbarHeight />
      <HelpCenterCard />
    </div>
  );
};

export default HelpCenterPage;
