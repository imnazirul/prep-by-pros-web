'use client';

import { useGetMeMutation } from '@/redux/api/authApi';
import { selectCurrentUser, selectIsAuthenticated } from '@/redux/features/authSlice';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { ExclusiveDrops } from './_components/exclusive-drops';
import { HeroSection } from './_components/hero-section';
import { HotDeals } from './_components/hot-deals';
import { TrendingSessions } from './_components/trending-sessions';

const HomePage = () => {
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectCurrentUser);
  const [getMe, { data: userData }] = useGetMeMutation();

  const [isCheckingRole, setIsCheckingRole] = React.useState(false);

  useEffect(() => {
    // We no longer redirect coaches to /creator automatically.
    // The user prefers they stay on the home page when they navigate to '/'.
  }, []);

  return (
    <>
      <HeroSection />
      <div className="grid gap-10 py-10 lg:py-18">
        <ExclusiveDrops />
        <TrendingSessions />
        <HotDeals />
      </div>
    </>
  );
};

export default HomePage;
