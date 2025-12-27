/* eslint-disable @next/next/no-img-element */
'use client';

import { cn } from '@/lib/utils';
import { useHeaderHeight } from '@/hooks/use-header-height';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';

const HelpCenterCard = () => {
  const headerHeight = useHeaderHeight();

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12',
        `min-h-[calc(100vh-${headerHeight}px)]`,
      )}
    >
      <div className="relative max-w-108.75 after:absolute after:inset-x-0 after:bottom-0 after:h-28 after:bg-linear-to-t after:from-white after:to-transparent">
        <img
          src="/images/customer-care-agent.png"
          alt="Customer Care Agent"
          className="h-auto w-full"
        />
      </div>
      <h2 className="text-black-10 mb-3 text-2xl font-semibold md:text-3xl lg:text-4xl">
        How can we help you today?
      </h2>
      <p className="text-black-7 text-xl md:text-2xl">
        You can live chat with us or give us a call
      </p>

      <div className="mt-15 grid w-full max-w-152 grid-cols-2 items-center justify-center gap-5">
        <Link
          href={'/chat'}
          className={cn(
            buttonVariants({ variant: 'default', size: 'lg' }),
            'w-full',
          )}
        >
          Start live chat
        </Link>
        <Button
          variant={'secondary'}
          size={'lg'}
          className="bg-primary-200 hover:bg-primary-300 text-primary hover:text-primary w-full"
        >
          Give us a call
        </Button>
      </div>
    </div>
  );
};

export default HelpCenterCard;
