'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import Icon, { IconName } from '@/lib/icon';
import { usePathname } from 'next/navigation';
import { Button, buttonVariants } from '@/components/ui/button';
import { useGetCoachBySlugQuery } from '@/redux/api/globalApi';
import Circle3DLoader from './circle-loader';
import { API_BASE_URL } from '@/lib/mapper';

export default function InstructorDetails({ slug }: { slug: string }) {
  const pathname = usePathname();
  const isCreator = pathname.startsWith('/creator');
  const { data: coach, isLoading, isError } = useGetCoachBySlugQuery(slug);

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Circle3DLoader />
      </div>
    );
  }

  if (isError || !coach) {
    return (
      <div className="py-10 text-center text-red-500">
        Failed to load instructor details.
      </div>
    );
  }

  const getFullUrl = (url: string | undefined | null) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${API_BASE_URL}${url}`;
  };

  const fullName = `${coach.first_name} ${coach.last_name}`.trim();
  const imageUrl = getFullUrl(coach.image);

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
          backgroundImage: `url("${imageUrl || '/images/instructor/1.png'}")`,
        }}
        className="group bg-card relative z-1 mb-6 flex aspect-558/420 items-end overflow-hidden rounded-2xl bg-cover p-4 transition-all duration-300 after:absolute after:inset-0 after:-z-1 after:bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_30%,rgba(0,0,0,0.50)_80.16%)] md:rounded-3xl md:p-6"
      >
        <div className="grid w-full gap-2.5">
          <div className="space-y-1">
            <h3 className="text-2xl font-semibold text-white md:text-[32px]">
              {fullName}
            </h3>
            <span className="text-black-4 text-sm">
              {coach.username ? `${coach.username}` : ''}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-medium text-white">
                {coach.total_subscriber || 0}
              </span>
              <span className="text-black-5 text-sm">Subscribers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-medium text-white">
                {coach.total_post || 0}
              </span>
              <span className="text-black-5 text-sm">Posts</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-medium text-white">
                {coach.total_vedios || 0}
              </span>
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
            {coach.is_subscribed ? (
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
        <p className="text-black-10 text-xl">{coach.description}</p>

        <div className="grid grid-cols-2 gap-5">
          {[
            {
              label: 'Sport',
              value: coach.sports?.[0]?.title || 'N/A',
              icon: 'busketball' as IconName,
            },
            {
              label: 'Club',
              value: coach.club?.[0]?.title || 'N/A',
              icon: 'honour_star' as IconName,
            },
            {
              label: 'Playing Style',
              value: coach.Playing_style?.[0]?.title || 'N/A',
              icon: 'football_pitch' as IconName,
            },
            {
              label: 'Playing in',
              value: coach.Playing_in?.[0]?.title || 'N/A',
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
