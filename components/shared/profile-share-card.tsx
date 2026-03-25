'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Icon, { IconName } from '@/lib/icon';
import { QrcodeCanvas } from 'react-qrcode-pretty';

interface QRCardProps {
  name: string;
  handle: string;
  avatarUrl?: string;
  value?: string;
  onReady?: (element: HTMLCanvasElement) => void;
}

const DEFAULT_IMAGE = '/images/profile.png';

/**
 * Robust QR Download Helper
 */
export const handleQRDownload = async (canvas: HTMLCanvasElement | null, handle: string) => {
  if (!canvas) {
    alert('QR code is not ready yet. Please wait a moment.');
    return;
  }

  try {
    // We use a tiny delay to ensure the centerpiece is fully painted, 
    // but we keep it short to avoid browser "non-user-interaction" blocks.
    await new Promise((resolve) => setTimeout(resolve, 100));
    
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${handle.replace(/[^a-z0-9]/gi, '_')}_qr.png`;
    link.target = '_blank';
    
    document.body.appendChild(link);
    link.click();
    
    setTimeout(() => {
      document.body.removeChild(link);
    }, 5000);
  } catch (err) {
    console.error('QR Download Error:', err);
    try {
      const dataUrl = canvas.toDataURL('image/png');
      window.open(dataUrl, '_blank');
      alert('If the download did not start automatically, please long-press the QR code in the new tab to save it.');
    } catch (finalErr) {
      alert('Unable to save image. Please take a screenshot of the QR code.');
    }
  }
};

/**
 * QR Image Card Component
 */
const QRCard = ({
  name,
  handle,
  avatarUrl,
  value = 'https://prepbypros.com',
  onReady,
}: QRCardProps) => {
  const [processedAvatar, setProcessedAvatar] = React.useState(DEFAULT_IMAGE);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * Safe Avatar Loader (CORS and Taint Prevention)
   */
  React.useEffect(() => {
    if (!avatarUrl) {
      setProcessedAvatar(DEFAULT_IMAGE);
      return;
    }

    if (avatarUrl.startsWith('data:') || avatarUrl.startsWith('blob:') || avatarUrl.startsWith('/')) {
      setProcessedAvatar(avatarUrl);
      return;
    }

    const convertToDataUrl = async () => {
      try {
        const res = await fetch(avatarUrl, { mode: 'cors', credentials: 'omit', cache: 'no-store' });
        if (!res.ok) throw new Error('Image fetch failed');
        const blob = await res.blob();
        const reader = new FileReader();
        reader.onloadend = () => setProcessedAvatar(reader.result as string);
        reader.readAsDataURL(blob);
      } catch (err) {
        console.log('Avatar fallback used due to CORS error');
        setProcessedAvatar(DEFAULT_IMAGE);
      }
    };

    convertToDataUrl();
  }, [avatarUrl]);

  return (
    <div className="flex flex-col items-center">
      {/* Main QR Card - NON-TILTED (Reverted as requested) */}
      <div className="bg-white rounded-[40px] p-6 shadow-2xl relative border border-gray-100">
        <div className="w-[360px] aspect-square flex items-center justify-center rounded-3xl overflow-hidden relative">
          {mounted && (
            <QrcodeCanvas
              value={value}
              size={340}
              level="H"
              padding={10}
              bgColor="#FFFFFF"
              color="#000000"
              variant="dots"
              image={{
                src: processedAvatar,
                width: 80,
                height: 80,
                positionX: 145,
                positionY: 140,
                overlap: false,
              }}
              onReady={onReady}
            />
          )}
        </div>
      </div>

      {/* Profile Info - Name Segment (Tilted) */}
      <div className="relative mt-8">
        <div className="absolute inset-0 bg-white shadow-lg transform -skew-x-6 translate-y-1 rounded-xl" />
        <div className="flex items-center justify-center bg-white px-10 py-3 border border-gray-100 relative transform -skew-x-6 rounded-xl">
          <span 
            className="font-black text-black leading-none transform skew-x-6 block"
            style={{ fontSize: '30.34px' }}
          >
            {name.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Profile Info - Handle Segment (Tilted) */}
      <div className="relative mt-[-4px]">
        <div className="absolute inset-0 bg-white shadow-md transform -skew-x-6 translate-y-1 rounded-xl" />
        <div className="flex items-center justify-center bg-white px-8 py-2 border border-gray-100 relative transform -skew-x-6 rounded-xl">
          <span 
            className="font-bold text-gray-400 transform skew-x-6 block"
            style={{ fontSize: '21.24px' }}
          >
            @{handle}
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * Social Share Helper
 */
export const handleSocialShare = async (title: string, text: string, url: string) => {
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({ title, text, url });
    } catch (err) {
      console.log('Share interaction ended:', err);
    }
  } else {
    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(url);
      alert('Share link copied to clipboard! Social sharing is not natively supported in this browser.');
    } catch (err) {
      alert('Unable to share. Please copy the link manually.');
    }
  }
};

/**
 * Reusable Action Button
 */
export const ActionButton = ({
  icon,
  label,
  onClick,
  iconClassName = "w-10 h-10", // Default to the larger 40x40 size for share/download/copy
}: {
  icon: IconName;
  label: string;
  onClick: () => void;
  iconClassName?: string;
}) => {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="bg-white hover:bg-gray-50 border-none rounded-[20px] p-4 flex flex-col items-center justify-center gap-2 h-[116px] w-[260px] shadow-sm transition-all text-black border-transparent"
    >
      <Icon name={icon} className={iconClassName} />
      <span 
        className="font-bold tracking-tight"
        style={{ fontSize: '24px' }}
      >
        {label}
      </span>
    </Button>
  );
};

export default QRCard;
