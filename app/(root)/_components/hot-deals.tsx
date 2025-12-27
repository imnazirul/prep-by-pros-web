'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { products } from '@/data';
import { buttonVariants } from '@/components/ui/button';
import { ProductCard } from '@/components/shared/product-card';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

export function HotDeals() {
  return (
    <section className="mb-11">
      <div className="container">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-black-12 text-2xl font-medium md:text-[32px]">
            Hot deals right now
          </h2>
          <Link
            href={'/shop'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            Shop
          </Link>
        </div>
      </div>

      <div>
        <Swiper
          spaceBetween={10}
          slidesPerView={1.3}
          // wrapperClass="relative [@media(min-width:1860px)]:pl-[70px] [@media(min-width:1820px)]:pl-10 [@media(min-width:1920px)]:pl-20 [@media(min-width:2133px)]:pl-[96px] container mx-auto pb-1"
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
              slidesPerView: 7.3,
            },
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard key={product.id} product={product} />
            </SwiperSlide>
          ))}
          <SwiperSlide>
            <div className="aspect-240/320"></div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
