'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import Icon, { IconName } from '@/lib/icon';
import { usePathname } from 'next/navigation';
import { Button, buttonVariants } from '@/components/ui/button';

export default function InstructorDetails({
  isSubscribe = false,
}: {
  isSubscribe?: boolean;
}) {
  const pathname = usePathname();
  const isCreator = pathname.startsWith('/creator');

  return (
    <div>
      {!isCreator && (
        <div className="mb-5.5">
          <Link
            href={'/explore'}
            className={cn(
              buttonVariants({
                variant: 'default',
                size: 'icon',
              }),
              'size-13',
            )}
          >
            <Icon height={24} width={24} name="arrow_left" />
          </Link>
        </div>
      )}

      <div
        style={{
          backgroundImage: 'url("/images/instructor/1.png")',
        }}
        className="group bg-card relative z-1 mb-6 flex aspect-558/420 items-end overflow-hidden rounded-2xl bg-cover p-4 transition-all duration-300 after:absolute after:inset-0 after:-z-1 after:bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_30%,rgba(0,0,0,0.50)_80.16%)] md:rounded-3xl md:p-6"
      >
        <div className="grid w-full gap-2.5">
          <div className="space-y-1">
            <h3 className="text-2xl font-semibold text-white md:text-[32px]">
              Jerome Parker
            </h3>
            <span className="text-black-4 text-sm">@jerome.hampshire</span>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-medium text-white">12.5k</span>
              <span className="text-black-5 text-sm">Subscribers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-medium text-white">87</span>
              <span className="text-black-5 text-sm">Posts</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-medium text-white">24</span>
              <span className="text-black-5 text-sm">Videos</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[4.5fr_7.5fr] items-center gap-4 text-center">
        {isCreator ? (
          <Link
            href={'/creator/profile'}
            className={cn(
              buttonVariants({
                variant: 'secondary',
                size: 'lg',
              }),
              'bg-primary-200 text-primary hover:bg-primary-300 font-semibold',
            )}
          >
            Edit profile
          </Link>
        ) : (
          <Button
            className="bg-primary-200 text-primary hover:bg-primary-300 font-semibold"
            variant={'secondary'}
            size={'lg'}
          >
            Follow
          </Button>
        )}

        {isCreator ? (
          <Link
            href={'/creator/dashboard'}
            className={cn(
              buttonVariants({
                variant: 'default',
                size: 'lg',
              }),
            )}
          >
            Go to dashboard
          </Link>
        ) : (
          <>
            {isSubscribe ? (
              <Button
                className="bg-black-8 hover:bg-black-10 font-semibold text-white"
                variant={'secondary'}
                size={'lg'}
              >
                Unsubscribe now
              </Button>
            ) : (
              <Button variant={'default'} size={'lg'}>
                Subscribe only for $9.9/month
              </Button>
            )}
          </>
        )}
      </div>

      <div className="mt-10 space-y-5">
        <p className="text-black-10 text-xl">
          From game highlights and training tips, I share my journey to inspire,
          entertain, and connect with fans ⚽️
        </p>

        <div className="grid grid-cols-2 gap-5">
          {[
            {
              label: 'Sport',
              value: 'Football / Soccer',
              icon: 'busketball' as IconName,
            },
            {
              label: 'Club',
              value: 'New York Football Club',
              icon: 'honour_star' as IconName,
            },
            {
              label: 'Playing Style',
              value: 'Forward',
              icon: 'football_pitch' as IconName,
            },
            {
              label: 'Playing in',
              value: 'Professional Level',
              icon: 'award' as IconName,
            },
          ].map(({ label, value, icon }, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center gap-1">
                <Icon
                  name={icon}
                  height={16}
                  width={16}
                  className="text-black-7"
                />
                <span className="text-black-7 text-base">{label}</span>
              </div>
              <span className="text-black-10 text-xl">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
