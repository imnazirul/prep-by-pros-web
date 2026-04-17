'use client';

import { useLazyRetrieveMeQuery } from '@/redux/api/authApi';
import { useAppSelector } from '@/redux/hooks';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Circle3DLoader from '../shared/circle-loader';

const protectedRoutes = [
  '/',
  '/settings',
  '/order-history',
  '/order-tracking',
  '/payment-history',
  '/my-subscriptions',
  '/saved',
  '/my-activity',
  '/chat',
  '/creator',
  '/checkout',
];

const authRoutes = ['/login', '/signup', '/forgot-password'];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, token, user } = useAppSelector((state) => state.auth);
  const [triggerMe, { isLoading: isFetchingUser }] = useLazyRetrieveMeQuery();
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch user profile if authenticated but user data missing (e.g. on refresh)
  useEffect(() => {
    if (mounted && isAuthenticated && token && !user && !isFetchingUser) {
      triggerMe();
    }
  }, [mounted, isAuthenticated, token, user, triggerMe, isFetchingUser]);

  useEffect(() => {
    if (!mounted) return;

    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
    const isProtected =
      !isAuthRoute &&
      (pathname === '/' || protectedRoutes.some((route) => route !== '/' && pathname.startsWith(route)));

    if (isProtected && !isAuthenticated && !token) {
      router.push('/login');
      return;
    }

    if (isAuthRoute && isAuthenticated && token) {
      if (user) {
        const role = user.role?.title || 'PLAYER';
        if (role.toUpperCase() === 'COACH') {
          router.push('/creator');
        } else {
          router.push('/');
        }
      } else {
        router.push('/');
      }
      return;
    }

    // Role-based route protection
    if (isAuthenticated && user) {
      const role = user.role?.title || 'PLAYER';
      const isCoach = role.toUpperCase() === 'COACH';
      const isPlayer = role.toUpperCase() === 'PLAYER';

      // Player trying to access creator pages
      if (isPlayer && pathname.startsWith('/creator')) {
        router.push('/');
        return;
      }

      // Coach trying to access player specific pages (like root feed)
      if (isCoach && pathname === '/') {
        router.push('/creator');
        return;
      }
    }
  }, [pathname, isAuthenticated, token, user, router, mounted]);

  // Prevent flashing of protected content
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isProtected =
    !isAuthRoute &&
    (pathname === '/' || protectedRoutes.some((route) => route !== '/' && pathname.startsWith(route)));

  // Show loader while checking auth or fetching user profile
  if (mounted && ((isProtected && !isAuthenticated && !token) || (isAuthenticated && !user))) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Circle3DLoader />
      </div>
    );
  }

  return <>{children}</>;
}
