'use client';

import Icon from '@/lib/icon';
import { Button } from '@/components/ui/button';
import { useHeaderHeight } from '@/hooks/use-header-height';

export function HeroSection() {
  const headerHeight = useHeaderHeight();
  return (
    <section
      className="relative z-1 overflow-hidden bg-cover bg-position-[center_27%]"
      style={{
        backgroundImage: "url('/images/hero-bg.png')",
      }}
    >
      <div
        className="absolute inset-0 -z-1"
        style={{
          background: `linear-gradient(88deg, rgba(254, 253, 244, 0.00) 70.95%, rgba(254, 253, 244, 0.40) 82.93%, rgba(254, 253, 244, 0.72) 99.61%), linear-gradient(265deg, rgba(254, 253, 244, 0.00) 43.97%, rgba(254, 253, 244, 0.32) 60.03%, rgba(254, 253, 244, 0.60) 71.86%, rgba(254, 253, 244, 0.80) 88.81%), radial-gradient(150.5% 78.98% at 50% 21.02%, rgba(254, 253, 244, 0.00) 36.65%, rgba(254, 253, 244, 0.70) 66.99%, #FEFDF4 94.01%)`,
        }}
      ></div>
      <div
        className="container pb-16 md:pb-20 lg:pb-27"
        style={{
          paddingTop: `calc(${headerHeight + 96}px)`,
        }}
      >
        <div className="max-w-220">
          <span className="text-black-12 inline-flex h-9 items-center gap-2 rounded-full border-0 bg-[#F8F7B6] px-4 py-2 text-base font-medium">
            <Icon height={20} width={20} name="fire" className="shrink-0" />
            Trending now
          </span>

          <h1 className="text-foreground mt-3 mb-5 text-4xl font-semibold md:text-5xl lg:text-[64px] lg:leading-[120%]">
            Flow, focus, and form — explosive footwork mastery
          </h1>

          <p className="text-black-8 text-xl text-pretty">
            The newest drill comes from{' '}
            <span className="text-black-12 font-semibold">
              Coach Esan Parker
            </span>
            . This nimble mobility sequence blends breath with rhythm. Designed
            to help your body move with intention, seeking balance and calm
            before competition.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button size="lg" className="">
              <Icon
                name="video_replay"
                height={24}
                width={24}
                className="size-6"
              />
              Play now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-primary hover:text-primary hover:bg-black-4 border-black-5 bg-white"
            >
              Subscribe to view all
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
