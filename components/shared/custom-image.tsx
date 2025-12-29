'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

export interface CustomImageProps extends ImageProps {
  fallbackSrc?: ImageProps['src'];
}

const CustomImage = ({
  src,
  fallbackSrc = '/images/fallback.jpeg',
  alt,
  onError,
  ...props
}: CustomImageProps) => {
  const [currentSrc, setCurrentSrc] = useState<ImageProps['src']>(src);

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      onError={(e) => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
        onError?.(e);
      }}
      loading="lazy"
    />
  );
};

export default CustomImage;
