/* eslint-disable @next/next/no-img-element */
'use client';

import {
  useCreateSubscriptionCheckoutMutation,
  useCreateWishlistMutation,
  useDeleteMeContentMutation,
  useDeleteWishlistMutation,
} from '@/redux/api/authApi';
import { useLazyGetCoachBySlugQuery } from '@/redux/api/globalApi';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { timeAgoShort } from '@/lib/helper';
import Icon from '@/lib/icon';
import { PostCardProp } from '@/lib/types';
import { cn } from '@/lib/utils';
import { addWishlistItem, removeWishlistItem } from '@/redux/features/authSlice';
import { RootState } from '@/redux/store';
import Link from 'next/link';
import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomImage from './custom-image';

import { usePostDialog } from '@/contexts/post-dialog-context';
import { usePathname, useRouter } from 'next/navigation';
import 'swiper/css';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';

export default function PostCard({
  post,
  layout = 'auto',
}: {
  post: PostCardProp;
  layout?: 'fixed' | 'auto';
}) {
  const pathname = usePathname();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [curActiveImg, setCurActiveImg] = useState(1);

  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  const handleMouseEnter = () => {
    const video = videoRef.current;
    if (!video || post.is_lock) return;
    video.muted = muted;
    video.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  const initials = post.profile.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  const isCreator = pathname.startsWith('/creator');

  const router = useRouter();

  const handleCardClick = () => {
    const url = isCreator ? `/creator/profile/post/${post.id}` : `/post-details/${post.id}`;
    router.push(url);
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative z-1 block cursor-pointer overflow-hidden rounded-2xl border text-white transition-all duration-300 after:absolute after:inset-0 after:-z-1 after:bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_40%,rgba(0,0,0,0.60)_80%)] md:rounded-3xl lg:rounded-4xl break-inside-avoid',
        layout && pathname !== '/' && 'mb-4'
      )}
    >
      {post.media.type === 'image' ? (
        <>
          {layout == 'auto' ? (
            <>
              {post.media.images.length > 0 ? (
                <img
                  src={post.media.images[0]}
                  alt={post.title}
                  className="relative -z-1 h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="relative -z-1 w-full bg-white pb-[75%]"></div>
              )}
            </>
          ) : (
            <div className="relative -z-1 aspect-432/320">
              <ImageCard images={post.media.images} setCurActiveImg={setCurActiveImg} />
            </div>
          )}
        </>
      ) : (
        <div className={cn('relative -z-1', layout == 'fixed' && 'aspect-432/320')}>
          <VideoCard layout={layout} src={post.media.src} videoRef={videoRef} muted={muted} />
        </div>
      )}

      <div className="absolute inset-0 flex flex-col justify-between p-4">
        <div className="flex items-center justify-between">
          <Link
            href={post.profile.slug ? `/instructor/${post.profile.slug}` : '#'}
            onClick={(e) => {
              e.stopPropagation();
              console.log('Navigating to instructor:', post.profile);
            }}
            className="flex items-center gap-2 rounded-full bg-[#A3A3A33D] p-1.5 pr-3 backdrop-blur-[20px]"
          >
            <Avatar className="size-10">
              <AvatarImage src={post.profile.image} className="bg-cover" />
              <AvatarFallback className="bg-primary text-xs">{initials}</AvatarFallback>
            </Avatar>
            <div className="grid gap-0.5">
              <span className="text-base font-medium">{post.profile.name}</span>
              <span className="text-black-4 text-xs" suppressHydrationWarning>
                {timeAgoShort(post.profile.last_active)}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-1">
            {post.has_subscribe && (
              <Button
                variant="secondary"
                onClick={(e) => e.stopPropagation()}
                className="text-black-4 border-0 bg-[#A3A3A33D] text-base backdrop-blur-[20px] hover:bg-[#A3A3A3]/35 hover:text-white"
              >
                Subscribe
              </Button>
            )}
            <div onClick={(e) => e.stopPropagation()}>
              <OptionButton post={post} isCreator={isCreator} />
            </div>
          </div>
        </div>

        <div className="flex items-end gap-6">
          <div className="flex-1">
            <div className="mb-3 flex items-center gap-4 text-base">
              <div className="flex items-center gap-1.5">
                <Icon name="view" height={20} width={20} />
                <span>{post.views}</span>
              </div>

              {post.media.type === 'video' && (
                <div className="flex items-center gap-1.5">
                  <Icon name="time" height={20} width={20} />
                  <span>{post.media.duration}</span>
                </div>
              )}
            </div>
            <p className="text-black-4 text-sm leading-[160%]">
              {post.description.length > 80 ? (
                <>
                  {post.description.slice(0, 80) + '...'}
                  <span className="ml-1 font-semibold">See More</span>
                </>
              ) : (
                post.description
              )}
            </p>

            {post.tags && post.tags.length > 0 && (
              <p className="text-black-4 line-clamp-1 text-sm">
                {post.tags.map((tag) => `#${tag}`).join(', ')}
              </p>
            )}
          </div>

          <div className="shrink-0">
            {post.media.type === 'image' ? (
              <div className="text-black-4 h-7 rounded-full bg-[#A3A3A3]/25 px-3 py-1 text-sm backdrop-blur-[20px]">
                {curActiveImg}/{post.media.images.length}
              </div>
            ) : (
              <Button
                size={'icon-sm'}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleMute();
                }}
                variant={'outline'}
                className="border-0 bg-[#A3A3A3]/25 backdrop-blur-2xl hover:bg-[#A3A3A3]/35 hover:text-white"
              >
                <Icon name={!muted ? 'volume_high' : 'volume_off'} height={16} width={16} />
              </Button>
            )}
          </div>
        </div>
      </div>

      {post.is_lock && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#A3A3A3]/25 backdrop-blur-[1px]">
          <div
            className={cn(
              buttonVariants({ size: 'icon', variant: 'secondary' }),
              'size-20 rounded-full'
            )}
          >
            <Icon name="lock" height={32} width={32} />
          </div>
        </div>
      )}
    </div>
  );
}

const VideoCard = ({
  videoRef,
  src,
  muted,
  layout,
}: {
  videoRef: RefObject<HTMLVideoElement | null>;
  src: string;
  muted: boolean;
  layout: 'fixed' | 'auto';
}) => {
  if (!src) return null;

  return (
    <video
      ref={videoRef}
      src={src}
      playsInline
      muted={muted}
      loop
      className={cn(
        '-z-1',
        layout == 'fixed'
          ? 'absolute top-0 left-0 h-full w-full object-cover'
          : 'min-h-52 w-full object-cover'
      )}
    />
  );
};

const ImageCard = ({
  images,
  setCurActiveImg,
}: {
  images: string[];
  setCurActiveImg: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      slidesPerView={1}
      effect="fade"
      loop
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      onSlideChange={(swiper) => setCurActiveImg(swiper.activeIndex + 1)}
    >
      {images.map((img, idx) => (
        <SwiperSlide key={idx}>
          <div className="relative aspect-432/320">
            <CustomImage
              src={img}
              alt={`Slide ${idx + 1}`}
              fill
              className="h-full w-full object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const OptionButton = ({ post, isCreator }: { post: PostCardProp; isCreator: boolean }) => {
  const dispatch = useDispatch();
  const globalWishlistUid = useSelector(
    (state: RootState) => state.auth.wishlistMap?.[post.id.toString()]
  );

  const [createWishlist] = useCreateWishlistMutation();
  const [deleteWishlist] = useDeleteWishlistMutation();
  const [deleteMeContent] = useDeleteMeContentMutation();
  const [createCheckout, { isLoading: isCheckoutLoading }] =
    useCreateSubscriptionCheckoutMutation();
  const [getCoachBySlug] = useLazyGetCoachBySlugQuery();
  const { openPostDialog } = usePostDialog();
  const router = useRouter();

  const [isSubscribing, setIsSubscribing] = useState(false);

  // Fallback to prop if not yet in map, but prefer map
  const [isSaved, setIsSaved] = useState(!!globalWishlistUid || post.is_saved);
  const [localWishlistUid, setLocalWishlistUid] = useState(globalWishlistUid || post.wishlist_uid);

  // Sync with global state whenever it changes (eg. saved from another identical card)
  useEffect(() => {
    if (globalWishlistUid) {
      setIsSaved(true);
      setLocalWishlistUid(globalWishlistUid);
    } else {
      setIsSaved(false);
      setLocalWishlistUid(undefined);
    }
  }, [globalWishlistUid]);

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const previousState = isSaved;
    const previousUid = localWishlistUid;

    setIsSaved(!isSaved); // Optimistic UI

    try {
      if (previousState && localWishlistUid) {
        await deleteWishlist(localWishlistUid).unwrap();
        setLocalWishlistUid(undefined);
        dispatch(removeWishlistItem(post.id.toString()));
        alert('Removed from saved.');
      } else {
        const res = await createWishlist({
          kind: 'CONTENT',
          content_slug: post.id.toString(),
        }).unwrap();
        setLocalWishlistUid(res.uid);
        dispatch(addWishlistItem({ slug: post.id.toString(), uid: res.uid }));
        alert('Saved successfully.');
      }
    } catch (error) {
      setIsSaved(previousState); // Revert on error
      setLocalWishlistUid(previousUid);
      console.error('Failed to update wishlist', error);
      alert('Failed to update wishlist');
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!post.uid) {
      alert('Unable to delete: Missing ID');
      return;
    }
    if (confirm('Are you sure you want to delete this content?')) {
      try {
        await deleteMeContent(post.uid).unwrap();
      } catch (error) {
        console.error('Failed to delete content', error);
        alert('Failed to delete content');
      }
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Need full content object correctly. But openPostDialog might fetch it or take partial.
    // The current PostCardProp has limited fields.
    // However, PostDialog mainly needs partial data to init or can fetch if needed.
    // Wait, openPostDialog expects MeContent. PostCardProp is not MeContent.
    // We might need to fetch full content or just pass what we have casted, but editing with partial data is risky.
    // Ideally, we fetch single content details before editing if data is missing.
    // For now, let's try passing what matches or handle it in PostDialog.
    // actually openPostDialog prop is `data?: MeContent`.
    // PostCardProp fields: title, description, id (slug), etc.
    // It lacks file_items structure which PostDialog uses.
    // So filtering for Edit might require fetching "MeContent" first.

    // Simpler approach: Navigate to "Edit Page"?
    // Or, since we are in `MyContentList`, we fetched `MeContent` originally.
    // But `PostCard` receives `PostCardProp`.

    // Let's pass a simplified object and let PostDialog handle it or (better)
    // fetch raw content for editing.
    // But for now, alert user or minimal implementation.
    // Actually, standard pattern: click edit -> open dialog -> dialog fetches data or uses passed data.
    // The `UpcomingVideo` passed `latestContent` which was `MeContent`.
    // `MyContentList` maps `MeContent` to `PostCardProp`.
    // We lost the full `MeContent` object.

    // Alternative: Pass `rawContent` to `PostCard`?
    // Too much refactoring.

    // I will disable Edit here for now or implement Delete only first?
    // User asked for Edit/Delete actions in `upcoming-video.tsx` which I did.
    // For `My Contents`, Delete is easy. Edit requires data.
    // I will implement Delete. Edit can be "coming soon" or I need to fetch data.

    alert('Edit functionality coming soon inside Card view. Use Dashboard for now.');
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/post-details/${post.id}`);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link', err);
      alert('Failed to copy link');
    }
  };

  const handleSubscribe = async (e: React.MouseEvent) => {
    e.stopPropagation();

    // Check if the current uid is actually a real UUID
    const isUuid =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        post.profile.uid || ''
      );

    const slug = post.profile.slug || post.profile.uid;

    if (!slug) {
      alert('Cannot subscribe right now. Missing instructor information.');
      return;
    }

    try {
      setIsSubscribing(true);
      let targetUid = post.profile.uid;

      // If missing or it's just a slug, fetch the real UUID first
      if (!isUuid) {
        const coachInfo = await getCoachBySlug(slug).unwrap();
        if (coachInfo && coachInfo.uid) {
          targetUid = coachInfo.uid;
        } else {
          setIsSubscribing(false);
          alert('Could not retrieve instructor data to subscribe.');
          return;
        }
      }

      if (!targetUid) {
        setIsSubscribing(false);
        alert('Missing instructor UUID.');
        return;
      }

      const res = await createCheckout({ coach_uid: targetUid }).unwrap();
      if (res.checkout_url) {
        router.push(res.checkout_url);
      }
    } catch (err: any) {
      if (err.status === 401) {
        alert('Please login to subscribe.');
        router.push('/login');
      } else if (err.data?.coach_uid?.[0]) {
        alert(err.data.coach_uid[0]);
      } else if (err.data?.detail) {
        alert(err.data.detail);
      } else {
        alert('Failed to initiate subscription.');
      }
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleAbout = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (post.profile.slug) {
      router.push(`/instructor/${post.profile.slug}`);
    } else {
      alert('Instructor profile not available.');
    }
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    let src = '';
    if (post.media.type === 'video') {
      src = post.media.src;
    } else if (post.media.type === 'image' && post.media.images.length > 0) {
      src = post.media.images[0];
    }

    if (!src) {
      alert('No media available to download.');
      return;
    }

    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const extension =
        src.split('.').pop()?.split('?')[0] || (post.media.type === 'video' ? 'mp4' : 'jpg');
      a.download = `prep-by-pros-post-${post.id}.${extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed natively, opening in new tab', err);
      // Fallback if fetch fails due to CORS or other reasons
      window.open(src, '_blank');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={'icon'}
          variant={'outline'}
          className="border-0 bg-[#A3A3A33D] backdrop-blur-[20px] hover:bg-[#A3A3A3]/35 hover:text-white"
        >
          <Icon name="more_vertical" height={24} width={24} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 max-w-full bg-white p-4 shadow-[0_12px_8px_0_rgba(0,0,0,0.18)] md:w-95 md:rounded-3xl"
        align="end"
      >
        <div className="grid grid-cols-2 gap-4">
          {!isCreator ? (
            <>
              <div
                onClick={handleSave}
                className="bg-black-4 group flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl px-4 py-5"
              >
                <Icon
                  name={isSaved ? 'bookmark_fill' : 'bookmark'}
                  height={24}
                  width={24}
                  className={cn('text-black-10 ')}
                />
                <span className="text-black-10 text-base">{isSaved ? 'Saved' : 'Save'}</span>
              </div>
              <div
                onClick={handleShare}
                className="bg-black-4 flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl px-4 py-5"
              >
                <Icon name="share" height={24} width={24} className="text-black-10" />
                <span className="text-black-10 text-base">Share</span>
              </div>
            </>
          ) : (
            <>
              <div
                onClick={handleDelete}
                className="bg-red-50 group flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl px-4 py-5 hover:bg-red-100"
              >
                <Icon name="trash" height={24} width={24} className={cn('text-red-500')} />
                <span className="text-red-500 text-base">Delete</span>
              </div>
              <div
                className="bg-black-4 flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl px-4 py-5 opacity-50"
                onClick={handleEdit}
              >
                <Icon name="edit" height={24} width={24} className="text-black-10" />
                <span className="text-black-10 text-base">Edit</span>
              </div>
            </>
          )}

          {!isCreator && (
            <div className="bg-black-4 col-span-2 flex flex-col rounded-2xl p-4">
              <button
                onClick={handleAbout}
                className="hover:text-primary text-black-10 flex w-full cursor-pointer items-center gap-2 border-b border-[#FCFCFC] py-3.5 first:pt-0"
              >
                <Icon name="user" height={20} width={20} />
                <span className="text-base">About this account</span>
              </button>
              <button
                onClick={handleSubscribe}
                disabled={isCheckoutLoading || isSubscribing}
                className="hover:text-primary text-black-10 flex w-full cursor-pointer items-center gap-2 border-b border-[#FCFCFC] py-3.5"
              >
                <Icon name="user_add" height={20} width={20} />
                <span className="text-base">
                  {isCheckoutLoading || isSubscribing ? 'Processing...' : 'Subscribe'}
                </span>
              </button>
              <button
                onClick={handleDownload}
                className="hover:text-primary text-black-10 flex w-full cursor-pointer items-center gap-2 py-3.5 last:pb-0"
              >
                <Icon name="download" height={20} width={20} />
                <span className="text-base">Download offline</span>
              </button>
            </div>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
