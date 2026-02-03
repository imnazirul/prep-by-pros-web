import NavbarHeight from '@/components/shared/navbar-height';
import { Metadata } from 'next';
import TrackingMain from './_components/tracking-main';

export const metadata: Metadata = {
  title: 'Order Tracking',
};

export default function TrackingPage() {
  return (
    <div>
      <NavbarHeight />
      <TrackingMain />
    </div>
  );
}
