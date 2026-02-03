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

  // State to track if we're waiting for potential redirect
  const [isCheckingRole, setIsCheckingRole] = React.useState(false);

  useEffect(() => {
    const checkRole = async () => {
      if (isAuthenticated) {
        setIsCheckingRole(true);
        try {
          const fetchedUser = userData || (await getMe({}).unwrap());
          const roleTitle =
            typeof fetchedUser.role === 'string' ? fetchedUser.role : fetchedUser.role?.title;

          if (roleTitle?.toUpperCase() === 'COACH') {
            router.push('/creator');
          } else {
            setIsCheckingRole(false);
          }
        } catch (err) {
          console.error('Failed to fetch user role', err);
          setIsCheckingRole(false);
        }
      }
    };
    checkRole();
  }, [isAuthenticated, router, getMe]); // Removing user dependency to rely on fresh fetch

  // If authenticated and checking role, show nothing (or loader) to prevent flash
  if (isAuthenticated && isCheckingRole) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-10 animate-spin rounded-full border-4 border-gray-300 border-t-primary"></div>
      </div>
    );
  }

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
