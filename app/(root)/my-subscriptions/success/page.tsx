'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { useVerifySubscriptionMutation } from '@/redux/api/authApi';

function SubscriptionVerificationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [verifySubscription] = useVerifySubscriptionMutation();
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (sessionId) {
      verifySubscription({ session_id: sessionId })
        .unwrap()
        .then(() => {
          setStatus('success');
          if (typeof window !== 'undefined') {
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
              // Fallback for browsers that might block the immediate redirect
              setTimeout(() => {
                window.location.href = 'prepbypros://subscription/success';
              }, 100);
            }
          }
        })
        .catch((error) => {
          setStatus('error');
          setErrorMessage(error?.data?.message || 'Failed to verify subscription. It might take a moment to sync via webhooks.');
        });
    } else {
      setStatus('error');
      setErrorMessage('No session ID found.');
    }
  }, [sessionId, verifySubscription]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
      {status === 'verifying' && (
        <>
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-[#173633]">Verifying Subscription...</h1>
          <p className="mb-8 max-w-md text-gray-600">
            Please wait while we confirm your subscription with our payment provider.
          </p>
        </>
      )}

      {status === 'success' && (
        <>
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-[#173633]">Subscription Confirmed!</h1>
          <p className="mb-8 max-w-md text-gray-600">
            Thank you! Your subscription is now active. You have full access to the coach's content.
          </p>
          <div className="flex gap-4">
            <Button onClick={() => router.push('/my-subscriptions')} className="bg-[#173633] text-white hover:bg-[#245550]">
              View My Subscriptions
            </Button>
            <Button onClick={() => router.push('/explore')} variant="outline">
              Explore More
            </Button>
          </div>
        </>
      )}

      {status === 'error' && (
        <>
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-12 w-12 text-red-600" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-red-600">Verification Failed</h1>
          <p className="mb-8 max-w-md text-gray-600">
            {errorMessage}
          </p>
          <div className="flex gap-4">
            <Button onClick={() => router.push('/my-subscriptions')} className="bg-[#173633] text-white hover:bg-[#245550]">
              Go to My Subscriptions
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default function SubscriptionSuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    }>
      <SubscriptionVerificationContent />
    </Suspense>
  );
}
