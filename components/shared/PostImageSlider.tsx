/* eslint-disable @next/next/no-img-element */
'use client';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

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

  const canLoop = images.length > 1;

  return (
    <>
      <div className="group relative grid aspect-708/611 overflow-hidden rounded-2xl md:rounded-3xl">
        <Swiper
          modules={[Pagination, EffectFade, Autoplay]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          slidesPerView={1}
          loop={canLoop}
          autoplay={
            canLoop ? { delay: 3000, disableOnInteraction: false } : false
          }
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          pagination={{
            el: '.custom-pagination',
            clickable: true,
            renderBullet: (_, className) =>
              `<span class="${className} custom-bullet size-3! bg-white! opacity-50! cursor-pointer! [&.swiper-pagination-bullet-active]:opacity-100! rounded-full"></span>`,
          }}
          className="h-full w-full"
        >
          {images.map((img, index) => (
            <SwiperSlide
              key={index}
              onClick={() => setOpen(true)}
              className="relative"
            >
              <img
                src={img}
                alt={`Post image ${index + 1}`}
                className="absolute size-full h-full w-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Prev */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
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
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            swiperRef.current?.slideNext();
          }}
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

      {/* your modal stays same */}
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
          className="relative mx-auto grid aspect-1039/1200 max-lg:w-[70vw] lg:h-[85vh]"
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
                className="mx-auto cursor-pointer rounded-2xl object-cover max-lg:h-auto max-lg:w-full md:rounded-3xl lg:h-full lg:w-auto"
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
