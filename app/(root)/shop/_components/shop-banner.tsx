'use client';

import 'swiper/css';
import { Button } from '@/components/ui/button';
import { Swiper, SwiperSlide } from 'swiper/react';

const ShopBanner = () => {
  return (
    <div className="pb-8 md:pb-10 lg:pb-12">
      <Swiper
        slidesPerView={1.13}
        centeredSlides
        spaceBetween={16}
        className="overflow-visible"
        wrapperClass="py-4"
        loop
      >
        {[1, 2, 3, 4].map((item) => (
          <SwiperSlide
            key={item}
            className="[&.swiper-slide-active_.shop-banner-card]:rounded-[58px]!"
          >
            {({ isActive }) => (
              <div
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1619166719123-471cee9ce91e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                }}
                className={`shop-banner-card flex h-96 items-end justify-center rounded-4xl bg-cover p-10 transition-all duration-300 ease-out sm:h-120 md:h-132 lg:h-140 ${isActive ? 'scale-105' : 'scale-95 opacity-70'} `}
              >
                <Button
                  size={'lg'}
                  className="hover:bg-black-4 text-black-10 hover:text-black-10 bg-white font-semibold"
                >
                  Shop Now
                </Button>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ShopBanner;
