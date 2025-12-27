'use client';

import Link from 'next/link';
import Icon from '@/lib/icon';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { useHeaderHeight } from '@/hooks/use-header-height';

const TrackingEmpty = () => {
  const headerHeight = useHeaderHeight();

  return (
    <div className="container">
      <div
        style={{
          minHeight: `calc(100vh - ${headerHeight}px)`,
        }}
        className="flex flex-col items-center justify-center text-center"
      >
        <Icon
          name="empty_order_tracking_image"
          height={340}
          width={521}
          className="mb-6 max-sm:h-36 max-sm:w-40"
        />
        <h2 className="text-black-10 mb-3 text-2xl font-semibold md:text-3xl lg:text-4xl">
          No payment method added yet
        </h2>
        <p className="text-black-7 max-w-170 text-xl md:text-2xl">
          Start adding payment method for future purchase. You can add multiple
          and switch between anytime you want.
        </p>
        <Link
          href="/shop"
          className={cn(
            buttonVariants({
              variant: 'default',
              size: 'lg',
            }),
            'mt-10 md:mt-13 md:px-28 lg:mt-15',
          )}
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default TrackingEmpty;
