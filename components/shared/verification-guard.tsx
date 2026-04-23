'use client';

import { useAppSelector } from '@/redux/hooks';
import { selectCurrentUser } from '@/redux/features/authSlice';
import RedirectingModal from '../shared/redirecting-modal';
import { useEffect, useState } from 'react';

const VerificationGuard = () => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isAuthenticated || !user) return null;

  const roleTitle = typeof user.role === 'object' ? user.role?.title : user.role;
  const isCoach = roleTitle?.toString().toUpperCase() === 'COACH';
  const isUnverified = user.is_email_verified === false;

  if (isCoach && isUnverified) {
    return (
      <RedirectingModal 
        key="global-verification-modal"
        initialOpen={true} 
        initialStep="VERIFY" 
        isDismissible={false} 
      />
    );
  }

  return null;
};

export default VerificationGuard;
