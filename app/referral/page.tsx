'use client';

import QRCard, { ActionButton, handleQRDownload, handleSocialShare } from '@/components/shared/profile-share-card';
import Icon from '@/lib/icon';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import { useRetrieveMeQuery } from '@/redux/api/authApi';
import React from 'react';

export default function ReferralPage() {
  const router = useRouter();
  const token = useAppSelector((state) => state.auth.token);
  const { data: user } = useRetrieveMeQuery(undefined, { skip: !token });

  const qrRef = React.useRef<HTMLCanvasElement | null>(null);

  const userId = user?.referral_code || 'user';
  const referralUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/signup?ref=${userId}`
    : `https://prepbypros.com/signup?ref=${userId}`;

  return (
    <main 
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 md:p-10"
      style={{ background: 'linear-gradient(160.27deg, #F3FFB7 -60.02%, #245550 92.96%)' }}
    >
      {/* Close Button */}
      <button 
        onClick={() => router.back()}
        className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-50 border border-white/10"
      >
        <Icon name="close" className="w-6 h-6" />
      </button>

      <div className="max-w-6xl w-full flex flex-col xl:flex-row items-center justify-center gap-12 md:gap-24 animate-in fade-in zoom-in duration-500">
        
        {/* QR Card - Left Column */}
        <div className="w-full md:w-auto order-2 xl:order-1 flex justify-center">
          <QRCard 
            name={user?.first_name ? `${user.first_name}` : 'User'} 
            handle={user?.referral_code || 'user'} 
            avatarUrl={user?.image}
            value={referralUrl}
            onReady={(canvas) => {
              qrRef.current = canvas;
            }}
          />
        </div>

        {/* Text & Buttons - Right Column */}
        <div className="flex-1 text-white order-1 xl:order-2 max-w-[550px] text-center xl:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Athletx is better with friends! 🔥
          </h1>
          <p className="text-xl text-white/80 mb-12 leading-relaxed">
            Share Athletx with your friends and earn rewards. Refer your friends and earn together! People can scan your QR code with their smartphone&apos;s camera to see your profile. Download and print your QR code, then stick it on your products, posters and more.
          </p>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center justify-center xl:justify-start gap-4">
            <div className="w-[260px]">
              <ActionButton 
                icon="share_qr" 
                label="Share" 
                onClick={() => handleSocialShare('Join Prep by Pros!', 'Join Prep by Pros using my referral link and let\'s train together!', referralUrl)}
              />
            </div>
            <div className="w-[260px]">
              <ActionButton 
                icon="copy_link" 
                label="Copy link" 
                onClick={() => {
                  navigator.clipboard.writeText(referralUrl);
                  alert('Link copied to clipboard!');
                }} 
              />
            </div>
            <div className="w-[260px]">
              <ActionButton 
                icon="download_qr" 
                label="Download" 
                onClick={() => handleQRDownload(qrRef.current, user?.referral_code || 'referral')}
              />
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
