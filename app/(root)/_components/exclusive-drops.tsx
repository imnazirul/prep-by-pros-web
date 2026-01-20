'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { feedPost } from '@/data';
import PostCard from '@/components/shared/post-card';
import { buttonVariants } from '@/components/ui/button';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

export function ExclusiveDrops() {
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    const el = swiper.el as HTMLElement;

    // Tune these:
    const STEP = 80; // smaller = more sensitive (trackpad), larger = less sensitive (mouse wheel)
    const RESET_AFTER_MS = 140; // reset accumulation after user stops scrolling
    const MAX_PER_FRAME = 2; // prevents jumping too many slides in one burst

    let acc = 0; // accumulated delta
    let rafId: number | null = null;
    let resetTimer: number | null = null;

    const normalizeDelta = (e: WheelEvent) => {
      // Some browsers use deltaX on shift+wheel
      let d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      // Normalize delta based on deltaMode:
      // 0 = pixels, 1 = lines, 2 = pages
      if (e.deltaMode === 1) d *= 16; // approx px/line
      if (e.deltaMode === 2) d *= window.innerHeight; // approx px/page

      return d;
    };

    const process = () => {
      rafId = null;

      if (!swiperRef.current) return;

      let moved = 0;

      // Trigger slides while we have enough accumulated delta
      while (Math.abs(acc) >= STEP && moved < MAX_PER_FRAME) {
        // If Swiper is animating, wait for next frame (prevents jitter)
        if (swiper.animating) break;

        if (acc > 0) swiper.slideNext();
        else swiper.slidePrev();

        acc -= Math.sign(acc) * STEP;
        moved += 1;
      }

      // If still enough delta left, continue next frame
      if (Math.abs(acc) >= STEP && rafId === null) {
        rafId = window.requestAnimationFrame(process);
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (!e.shiftKey) return;

      // Only block scroll when shift is held
      e.preventDefault();

      const d = normalizeDelta(e);
      acc += d;

      // reset accumulation after a short pause
      if (resetTimer) window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        acc = 0;
      }, RESET_AFTER_MS);

      if (rafId === null) {
        rafId = window.requestAnimationFrame(process);
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      el.removeEventListener('wheel', onWheel);
      if (rafId) window.cancelAnimationFrame(rafId);
      if (resetTimer) window.clearTimeout(resetTimer);
    };
  }, []);

  const filteredData = feedPost.filter((post) => !post.is_lock);
  return (
    <section>
      <div className="container">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-black-12 text-2xl font-medium md:text-[32px]">
            Exclusive drops from your pros
          </h2>
          <Link href={'/feed'} className={cn(buttonVariants({ variant: 'default' }))}>
            Go to feed
          </Link>
        </div>
      </div>

      <div>
        <Swiper
          spaceBetween={10}
          slidesPerView="auto"
          wrapperClass="relative max-w-[1744px]! container"
          mousewheel={true}
          keyboard={{ enabled: true, onlyInViewport: true }}
          onSwiper={(s) => {
            swiperRef.current = s;
          }}
          loop={true}
          breakpoints={{
            400: {
              spaceBetween: 16,
            },
          }}
        >
          {filteredData.map((post) => (
            <SwiperSlide key={post.id} className="w-108!">
              <PostCard layout="fixed" post={post} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
