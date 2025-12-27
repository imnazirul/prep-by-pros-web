/* eslint-disable @next/next/no-img-element */
'use client';

import 'swiper/css';
import 'swiper/css/pagination';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, EffectFade, Autoplay } from 'swiper/modules';

import Icon from '@/lib/icon';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent } from '../ui/dialog';

const PostImageSlider = ({ images }: { images: string[] }) => {
  const [open, setOpen] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <div className="group relative grid aspect-708/611 overflow-hidden rounded-2xl md:rounded-3xl">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          modules={[Pagination, EffectFade, Autoplay]}
          effect="fade"
          slidesPerView={1}
          pagination={{
            el: '.custom-pagination',
            clickable: true,
            renderBullet: (_, className) =>
              `<span class="${className} custom-bullet size-3! bg-white! opacity-50! cursor-pointer! [&.swiper-pagination-bullet-active]:opacity-100! rounded-full"></span>`,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="h-full w-full"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} onClick={() => setOpen(true)}>
              <img
                src={img}
                alt={`Post image ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation */}
        <button
          onClick={() => {
            swiperRef.current?.slidePrev();
          }}
          className="absolute top-1/2 left-4 z-10 -translate-y-1/2 cursor-pointer"
        >
          <Icon
            name="circle_arrow_left"
            width={44}
            height={44}
            className="text-white"
          />
        </button>

        {/* Next */}
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute top-1/2 right-4 z-10 -translate-y-1/2 cursor-pointer"
        >
          <Icon
            name="circle_arrow_right"
            width={44}
            height={44}
            className="text-white"
          />
        </button>

        <div className="custom-pagination absolute bottom-5! z-50 mx-auto flex w-full justify-center" />
      </div>

      <PostSliderModal
        activeIndex={activeIndex}
        images={images}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default PostImageSlider;

const PostSliderModal = ({
  open,
  setOpen,
  images,
  activeIndex,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  images: string[];
  activeIndex: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevBtnRef = useRef<HTMLDivElement>(null);
  const nextBtnRef = useRef<HTMLDivElement>(null);

  const [index, setIndex] = useState(activeIndex);

  useEffect(() => {
    setIndex(activeIndex);
  }, [activeIndex]);

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setIndex(index);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        prevBtnRef.current &&
        nextBtnRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        !prevBtnRef.current.contains(event.target as Node) &&
        !nextBtnRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="border-0 bg-transparent p-0 sm:max-w-full"
        showCloseButton={false}
      >
        <div
          ref={containerRef}
          className="relative mx-auto grid aspect-1039/1200 h-[85vh] overflow-hidden rounded-2xl md:rounded-3xl"
        >
          {/* Slides */}
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`absolute top-0 left-0 h-full w-full transition-opacity duration-500 ${
                idx === index ? 'z-10 opacity-100' : 'z-0 opacity-0'
              }`}
            >
              <img
                src={img}
                alt={`Slide ${idx + 1}`}
                className="h-full w-full cursor-pointer object-cover"
                onClick={() => console.log('Image clicked', idx)}
              />
            </div>
          ))}

          {/* Pagination */}
          <div className="absolute bottom-5 z-20 flex w-full justify-center gap-2">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`h-3 w-3 cursor-pointer rounded-full transition-all duration-300 ${
                  idx === index ? 'bg-white opacity-100' : 'bg-white opacity-50'
                }`}
                onClick={() => goToSlide(idx)}
              />
            ))}
          </div>
        </div>

        <div>
          {/* Prev Button */}
          <div
            ref={prevBtnRef}
            onClick={prevSlide}
            className="absolute top-1/2 left-4 z-20 -translate-y-1/2 cursor-pointer"
          >
            <Icon
              name="circle_arrow_left"
              width={72}
              height={72}
              className="text-white"
            />
          </div>

          {/* Next Button */}
          <div
            ref={nextBtnRef}
            onClick={nextSlide}
            className="absolute top-1/2 right-4 z-20 -translate-y-1/2 cursor-pointer"
          >
            <Icon
              name="circle_arrow_right"
              width={72}
              height={72}
              className="text-white"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
