import { Button } from '../ui/button';
import { Swiper } from 'swiper/types';
import React, { useState } from 'react';
import { useSwiper } from 'swiper/react';

type Props = {
  handlePress?: (swiper: Swiper) => void;
  shouldHide?: (swiper: Swiper) => boolean;
  getStyle?: (swiper: Swiper) => React.CSSProperties | undefined;
} & React.ComponentProps<typeof Button>;

function SwiperButton({
  handlePress,
  shouldHide,
  getStyle,
  ...rest
}: React.PropsWithChildren<Props>) {
  const swiper = useSwiper();
  const [hidden, setHidden] = useState(false);

  React.useEffect(() => {
    const syncShouldHide = () => {
      if (shouldHide) {
        setHidden(shouldHide(swiper));
      }
    };

    swiper.on('slideChange', syncShouldHide);

    return () => {
      swiper.off('slideChange', syncShouldHide);
    };
  }, [shouldHide, swiper]);

  return (
    <Button
      hidden={hidden}
      style={getStyle?.(swiper)}
      {...rest}
      onPointerDown={(e) => {
        handlePress?.(swiper);
        rest.onPointerDown?.(e);
      }}
    />
  );
}

export default SwiperButton;
