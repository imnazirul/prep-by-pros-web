/* eslint-disable @next/next/no-img-element */
'use client';

import Icon, { IconName } from '@/lib/icon';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import CustomImage from './custom-image';
import { PostCardProp } from '@/lib/types';
import { timeAgoShort } from '@/lib/helper';
import { Button, buttonVariants } from '@/components/ui/button';
import { Dispatch, RefObject, SetStateAction, useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { usePathname } from 'next/navigation';

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

  return (
    <Link
      href={`/post-details/${post.id}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative z-1 block overflow-hidden rounded-2xl border text-white transition-all duration-300 after:absolute after:inset-0 after:-z-1 after:bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_40%,rgba(0,0,0,0.60)_80%)] md:rounded-3xl lg:rounded-4xl',
        layout && pathname !== '/' && 'mb-4',
      )}
    >
      {post.media.type === 'image' ? (
        <>
          {layout == 'auto' ? (
            <img
              src={post.media.images[0]}
              alt={post.title}
              className="relative -z-1 h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="relative -z-1 aspect-432/320">
              <ImageCard
                images={post.media.images}
                setCurActiveImg={setCurActiveImg}
              />
            </div>
          )}
        </>
      ) : (
        <div
          className={cn('relative -z-1', layout == 'fixed' && 'aspect-432/320')}
        >
          <VideoCard
            layout={layout}
            src={post.media.src}
            videoRef={videoRef}
            muted={muted}
          />
        </div>
      )}

      <div className="absolute inset-0 flex flex-col justify-between p-4">
        <div className="flex items-center justify-between">
          <Link
            href={`/instructor/${post.id}`}
            className="flex items-center gap-2 rounded-full bg-[#A3A3A33D] p-1.5 pr-3 backdrop-blur-[20px]"
          >
            <Avatar className="size-10">
              <AvatarImage src={post.profile.image} className="bg-cover" />
              <AvatarFallback className="bg-primary text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-0.5">
              <span className="text-base font-medium">{post.profile.name}</span>
              <span className="text-black-4 text-xs">
                {timeAgoShort(post.profile.last_active)}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-1">
            {post.has_subscribe && (
              <Button
                variant="secondary"
                className="text-black-4 border-0 bg-[#A3A3A33D] text-base backdrop-blur-[20px] hover:bg-[#A3A3A3]/35 hover:text-white"
              >
                Subscribe
              </Button>
            )}
            <OptionButton />
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
            <p className="text-black-4 text-sm">
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
                <Icon
                  name={!muted ? 'volume_high' : 'volume_off'}
                  height={16}
                  width={16}
                />
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
              'size-20 rounded-full',
            )}
          >
            <Icon name="lock" height={32} width={32} />
          </div>
        </div>
      )}
    </Link>
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
          : 'min-h-52 w-full object-cover',
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

const OptionButton = () => {
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
          <div className="bg-black-4 group flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl px-4 py-5">
            <Icon
              name="bookmark"
              height={24}
              width={24}
              className="text-black-10 group-hover:hidden"
            />
            <Icon
              name="bookmark_fill"
              height={24}
              width={24}
              className="text-black-10 hidden group-hover:block"
            />
            <span className="text-black-10 text-base">Save</span>
          </div>
          <div className="bg-black-4 flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl px-4 py-5">
            <Icon
              name="share"
              height={24}
              width={24}
              className="text-black-10"
            />
            <span className="text-black-10 text-base">Share</span>
          </div>
          <div className="bg-black-4 col-span-2 rounded-2xl p-4">
            {[
              {
                icon: 'user' as IconName,
                label: 'About this account',
              },
              {
                icon: 'user_add' as IconName,
                label: 'Subscribe',
              },
              {
                icon: 'download' as IconName,
                label: 'Download offline',
              },
            ].map(({ icon, label }, index) => (
              <button
                key={index}
                className="hover:text-primary text-black-10 flex w-full cursor-pointer items-center gap-2 border-b border-[#FCFCFC] py-3.5 first:pt-0 last:border-b-0 last:pb-0"
              >
                <Icon name={icon} height={20} width={20} />
                <span className="text-base">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
