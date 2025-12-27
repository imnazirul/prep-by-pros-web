'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { feedPost } from '@/data';
import { buttonVariants } from '@/components/ui/button';
import PostCard from '@/components/shared/post-card';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

export function TrendingSessions() {
  return (
    <section>
      <div className="container">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-black-12 text-2xl font-medium md:text-[32px]">
            Trending sessions shaping the game
          </h2>
          <Link
            href={'/feed'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            Go to feed
          </Link>
        </div>
      </div>

      <div>
        <Swiper
          spaceBetween={10}
          slidesPerView={1.15}
          // wrapperClass="relative [@media(min-width:1860px)]:pl-[70px] [@media(min-width:1820px)]:pl-10 [@media(min-width:1920px)]:pl-20 [@media(min-width:2133px)]:pl-[96px] container mx-auto"
          wrapperClass="relative max-w-[1744px]! container"
          breakpoints={{
            400: {
              slidesPerView: 1.3,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4.3,
            },
          }}
        >
          {feedPost.map((post) => (
            <SwiperSlide key={post.id}>
              <PostCard layout="fixed" post={post} />
            </SwiperSlide>
          ))}
          <SwiperSlide>
            <div className="aspect-432/320"></div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
