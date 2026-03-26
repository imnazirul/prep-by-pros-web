'use client';

import React from 'react';
import { QrcodeCanvas } from 'react-qrcode-pretty';
import { cn } from '@/lib/utils';

interface QRCodeBrandedProps {
  value: string;
  size?: number;
  logo?: string;
  className?: string;
  onReady?: (element: HTMLCanvasElement) => void;
}

const CornerGuard = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) => {
  const positionClasses = {
    tl: 'top-0 left-0 border-t-[3.5px] border-l-[3.5px] rounded-tl-2xl',
    tr: 'top-0 right-0 border-t-[3.5px] border-r-[3.5px] rounded-tr-2xl',
    bl: 'bottom-0 left-0 border-b-[3.5px] border-l-[3.5px] rounded-bl-2xl',
    br: 'bottom-0 right-0 border-b-[3.5px] border-r-[3.5px] rounded-br-2xl',
  };

  return (
    <div 
      className={cn(
        "absolute w-12 h-12 border-[#7F56D9]", 
        positionClasses[position]
      )} 
    />
  );
};

/**
 * Helper to process an image into a rounded rectangle (squircle) with a white border.
 * This ensures the logo looks premium and is preserved in downloads.
 */
const getRoundedImage = (src: string, size: number, radius: number = 24): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(src);
        return;
      }

      // Helper for rounded rectangle path
      const drawRoundedRect = (x: number, y: number, w: number, h: number, r: number) => {
        if (ctx.roundRect) {
          ctx.roundRect(x, y, w, h, r);
        } else {
          ctx.moveTo(x + r, y);
          ctx.lineTo(x + w - r, y);
          ctx.quadraticCurveTo(x + w, y, x + w, y + r);
          ctx.lineTo(x + w, y + h - r);
          ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
          ctx.lineTo(x + r, y + h);
          ctx.quadraticCurveTo(x, y + h, x, y + h - r);
          ctx.lineTo(x, y + r);
          ctx.quadraticCurveTo(x, y, x + r, y);
        }
      };

      // 1. Draw white background rounded rect (the border)
      ctx.beginPath();
      drawRoundedRect(0, 0, size, size, radius);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();

      // 2. Clip for the actual image
      ctx.save();
      ctx.beginPath();
      const innerMargin = 5;
      const innerRadius = Math.max(0, radius - innerMargin);
      drawRoundedRect(innerMargin, innerMargin, size - innerMargin * 2, size - innerMargin * 2, innerRadius);
      ctx.clip();
      
      // Maintain aspect ratio while drawing
      const aspect = img.width / img.height;
      let drawW = size;
      let drawH = size;
      let x = 0;
      let y = 0;
      
      if (aspect > 1) {
        drawW = size * aspect;
        x = (size - drawW) / 2;
      } else {
        drawH = size / aspect;
        y = (size - drawH) / 2;
      }
      
      ctx.drawImage(img, x, y, drawW, drawH);
      ctx.restore();

      resolve(canvas.toDataURL());
    };
    img.onerror = () => resolve(src);
    img.src = src;
  });
};

/**
 * QRCodeBranded - A premium QR code component inspired by Untitled UI.
 * Features signature L-shaped corners and modern dot-based styling.
 */
export const QRCodeBranded = ({
  value,
  size = 320,
  logo,
  className,
  onReady,
}: QRCodeBrandedProps) => {
  const [mounted, setMounted] = React.useState(false);
  const [processedLogo, setProcessedLogo] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (logo) {
      getRoundedImage(logo, 120).then(setProcessedLogo);
    } else {
      setProcessedLogo(undefined);
    }
  }, [logo]);

  return (
    <div className={cn("relative p-10 bg-white inline-block select-none", className)}>
      {/* L-shaped Corners (Untitled UI Signature) */}
      <CornerGuard position="tl" />
      <CornerGuard position="tr" />
      <CornerGuard position="bl" />
      <CornerGuard position="br" />

      {/* QR Code Canvas */}
      <div className="flex items-center justify-center">
        {mounted && (
          <QrcodeCanvas
            value={value}
            size={size}
            level="H"
            padding={0}
            bgColor="#FFFFFF"
            color="#000000"
            variant="dots"
            image={processedLogo ? {
              src: processedLogo,
              width: 90,
              height: 90,
              positionX: (size - 110) / 2,
              positionY: (size - 95) / 2,
              overlap: true, // Set to true to allow our custom circular white border to act as the mask
            } : undefined}
            onReady={onReady}
          />
        )}
      </div>

      {/* Subtle Scan Glow (Optional Design Polish) */}
      <div className="absolute inset-x-10 top-10 h-1 bg-[#7F56D9]/5 blur-sm animate-[pulse_2s_infinite]" />
    </div>
  );
};

export default QRCodeBranded;
