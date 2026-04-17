'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import Icon, { IconName } from '@/lib/icon';
import { API_BASE_URL } from '@/lib/mapper';
import { cn } from '@/lib/utils';
import {
  useCancelSubscriptionMutation,
  useCreateFollowMutation,
  useCreateSubscriptionCheckoutMutation,
  useRetrieveMeQuery,
} from '@/redux/api/authApi';
import { useGetCoachBySlugQuery, useGetCoachesQuery } from '@/redux/api/globalApi';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Circle3DLoader from './circle-loader';

export default function InstructorDetails({ slug }: { slug?: string }) {
  console.log('InstructorDetails received slug:', slug);
  const pathname = usePathname();
  const router = useRouter();
  const isCreator = pathname.startsWith('/creator');

  const [createCheckout, { isLoading: isCheckoutLoading }] =
    useCreateSubscriptionCheckoutMutation();
  const [cancelSubscription, { isLoading: isCancelLoading }] = useCancelSubscriptionMutation();
  const [toggleFollow, { isLoading: isFollowLoading }] = useCreateFollowMutation();

  // Check if snake_case or camelCase UUID (simple regex for standard UUID)
  const isUuid =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
      slug || ''
    );

  // Fetch using Slug (skip if UUID)
  const {
    data: coachBySlug,
    isLoading: isLoadingSlug,
    isError: isErrorSlug,
    refetch: refetchSlug,
  } = useGetCoachBySlugQuery(slug!, {
    skip: !slug || isUuid,
  });

  // Fetch using UID (skip if NOT UUID) - assuming getCoaches supports uid filter
  const {
    data: coachesByUid,
    isLoading: isLoadingUid,
    isError: isErrorUid,
    refetch: refetchUid,
  } = useGetCoachesQuery(
    { uid: slug },
    {
      skip: !slug || !isUuid,
    }
  );

  const {
    data: meCoach,
    isLoading: isLoadingMe,
    isError: isErrorMe,
    refetch: refetchMe,
  } = useRetrieveMeQuery();

  let coach = slug ? (isUuid ? coachesByUid?.results?.[0] : coachBySlug) : meCoach;

  if (!coach && meCoach) {
    const meSlugMatches =
      meCoach.slug === slug ||
      meCoach.uid === slug ||
      meCoach.username === slug ||
      meCoach.username?.replace(/^#/, '') === slug;

    if (meSlugMatches) {
      coach = meCoach;
    }
  }
  const isPrimaryLoading = slug ? (isUuid ? isLoadingUid : isLoadingSlug) : false;
  const isPrimaryError = slug ? (isUuid ? isErrorUid : isErrorSlug) : false;

  const isLoading = isPrimaryLoading || (!coach && isPrimaryError && isLoadingMe);
  const isError = isPrimaryError && !coach;

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Circle3DLoader />
      </div>
    );
  }

  if (isError || !coach) {
    return <div className="py-10 text-center text-red-500">Failed to load instructor details.</div>;
  }

  const getFullUrl = (url: string | undefined | null) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${API_BASE_URL}${url}`;
  };

  const fullName = [coach.first_name, coach.last_name].filter(Boolean).join(' ');
  const imageUrl = getFullUrl(coach.image);

  const handleSubscribe = async () => {
    if (!meCoach) {
      alert('Please login to subscribe');
      return;
    }
    if (!coach?.uid) return;

    try {
      const res = await createCheckout({ coach_uid: coach.uid }).unwrap();
      if (res.checkout_url) {
        router.push(res.checkout_url);
      }
    } catch (err: any) {
      console.error('Failed to create checkout session', err);
      if (err.status === 401) {
        alert('Please login to subscribe');
        router.push('/login');
      } else if (err.data?.coach_uid?.[0]) {
        alert(err.data.coach_uid[0]);
      } else if (err.data?.non_field_errors?.[0]) {
        alert(err.data.non_field_errors[0]);
      } else if (err.data?.detail) {
        alert(err.data.detail);
      } else if (err.data) {
        alert(typeof err.data === 'string' ? err.data : JSON.stringify(err.data));
      } else {
        alert('Failed to initiate subscription. Please try again.');
      }
    }
  };

  const refetchCoachData = () => {
    if (slug) {
      if (isUuid) refetchUid();
      else refetchSlug();
    } else {
      refetchMe();
    }
  };

  const handleUnsubscribe = async () => {
    if (!coach?.user_subscription?.uid) {
      alert('Subscription details not found.');
      return;
    }

    try {
      await cancelSubscription(coach.user_subscription.uid).unwrap();
      refetchCoachData();
      alert('Successfully unsubscribed.');
    } catch (error) {
      console.error('Failed to cancel subscription', error);
      alert('Failed to unsubscribe. Please try again.');
    }
  };

  const handleToggleFollow = async () => {
    if (!meCoach) {
      alert('Please login to follow');
      return;
    }
    if (!coach?.slug && !coach?.uid) return;

    try {
      await toggleFollow({
        coach_slug: coach.slug || coach.uid,
        kind: 'FOLLOW_UNFOLLOW',
      }).unwrap();
      refetchCoachData();
    } catch (error) {
      console.error('Failed to toggle follow', error);
      alert('Failed to follow/unfollow. Please try again.');
    }
  };

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
              'size-13'
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
            <h3 className="text-2xl font-semibold text-white md:text-[32px]">{fullName}</h3>
            <span className="text-black-4 text-sm">
              {coach.username ? `${coach.username}` : ''}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-medium text-white">{coach.total_subscriber || 0}</span>
              <span className="text-black-5 text-sm">Subscribers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-medium text-white">{coach.total_post || 0}</span>
              <span className="text-black-5 text-sm">Posts</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-medium text-white">{coach.total_vedios || 0}</span>
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
              'bg-primary-200 text-primary hover:bg-primary-300 font-semibold'
            )}
          >
            Edit profile
          </Link>
        ) : (
          <Button
            className={cn(
              'font-semibold text-white',
              coach.is_followed
                ? 'bg-black-8 hover:bg-black-10'
                : 'bg-primary-200 text-primary hover:bg-primary-300'
            )}
            variant={coach.is_followed ? 'secondary' : 'default'}
            size={'lg'}
            onClick={handleToggleFollow}
            disabled={isFollowLoading}
          >
            {isFollowLoading ? 'Processing...' : coach.is_followed ? 'Unfollow' : 'Follow'}
          </Button>
        )}

        {isCreator ? (
          <Link
            href={'/creator/dashboard'}
            className={cn(
              buttonVariants({
                variant: 'default',
                size: 'lg',
              })
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
                onClick={handleUnsubscribe}
                disabled={isCancelLoading}
              >
                {isCancelLoading ? 'Unsubscribing...' : 'Unsubscribe now'}
              </Button>
            ) : (
              <Button
                variant={'default'}
                size={'lg'}
                onClick={handleSubscribe}
                disabled={isCheckoutLoading}
              >
                {isCheckoutLoading ? 'Processing...' : 'Subscribe only for $9.9/month'}
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
                <Icon name={icon} height={16} width={16} className="text-black-7" />
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
