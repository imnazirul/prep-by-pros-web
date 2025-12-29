'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';

const slides = [
  {
    image: '/images/auth-bg.png',
    title: 'Unlock your pro potential',
    description: 'Train smarter with exclusive pro videos tailored',
  },
  {
    image: '/images/auth-bg-2.jpg',
    title: 'Train Like a Champion',
    description: 'Access elite-level training programs',
  },
  {
    image: '/images/auth-bg-3.jpg',
    title: 'Train Like a Champion',
    description: 'Access elite-level training programs',
  },
];

const AuthRightSlider = () => {
  return (
    <div className="z-1 hidden items-center justify-center p-12 pl-0 lg:flex lg:w-1/2">
      <div className="relative h-full w-full overflow-hidden rounded-[2.5rem]">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop
          pagination={{
            el: '.custom-pagination',
            clickable: true,
            renderBullet: (_, className) =>
              `<span class="${className} custom-bullet w-9! h-3! bg-[#7B7B7B]! m-0! cursor-pointer! [&.swiper-pagination-bullet-active]:w-22! [&.swiper-pagination-bullet-active]:bg-[#FFFBEA]! opacity-100! rounded-full!"></span>`,
          }}
          className="h-full w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Dark overlay */}
        <div className="absolute inset-0 z-2 bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,rgba(0,0,0,0.48)_65%)]" />

        {/* Text Content */}
        <div className="absolute right-16 bottom-16 left-16 z-2 space-y-16 text-white">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold xl:text-[40px]">
              {'Unlock your pro potential'}
            </h2>
            <p className="text-2xl text-pretty text-[#D9E3DE] xl:text-3xl">
              {'Train smarter with exclusive pro videos tailored'}
            </p>
          </div>
          <div className="custom-pagination flex gap-3" />
        </div>
      </div>
    </div>
  );
};

export default AuthRightSlider;
