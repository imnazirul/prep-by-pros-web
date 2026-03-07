'use client';

import { useAppSelector } from '@/redux/hooks';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Circle3DLoader from '../shared/circle-loader';

const protectedRoutes = [
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
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

    if (isProtected && !isAuthenticated && !token) {
      router.push('/login');
    }

    if (isAuthRoute && isAuthenticated && token) {
      router.push('/');
    }
  }, [pathname, isAuthenticated, token, router, mounted]);

  // ... (imports remain the same)

  // ... (imports remain the same)

  // ...

  // Prevent flashing of protected content
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  if (mounted && isProtected && !isAuthenticated && !token) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Circle3DLoader />
      </div>
    );
  }

  return <>{children}</>;
}
