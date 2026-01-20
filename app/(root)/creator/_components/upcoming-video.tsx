/* eslint-disable @next/next/no-img-element */
'use client';

import Icon from '@/lib/icon';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { usePostDialog } from '@/contexts/post-dialog-context';

const UpcomingVideo = ({ className }: { className?: string }) => {
  const { openPostDialog } = usePostDialog();

  return (
    <div className={cn('flex min-h-160 flex-col space-y-5', className)}>
      <div className="flex items-center justify-between">
        <h1 className="text-black-12 text-2xl font-medium md:text-[32px]">
          Upcoming Video
        </h1>
        <Button type="button" onClick={openPostDialog}>
          <Icon name="plus_sign" height={20} width={20} /> Add new
        </Button>
      </div>

      <div className="group relative flex-1 overflow-hidden rounded-2xl md:rounded-3xl lg:rounded-4xl xl:rounded-[40px]">
        <img
          src="/images/upcoming-video-bg.jpg"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          alt="Footballer"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_50.29%,rgba(0,0,0,0.60)_71%)]" />

        <div className="absolute inset-x-6 bottom-6 rounded-[28px] bg-[#9C9C9C66] p-6 text-white backdrop-blur-md">
          <p className="text-black-5 mb-2 text-base">Scheduled post on</p>
          <h3 className="line-clamp-2 text-xl">
            Turkish attacker steals the spotlight at the Club World Cup ⚽️🔥,
            emerging as the tournament&apos;s top goal sc...
          </h3>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div>
              <p className="text-black-5 mb-2 text-base">Scheduled post on</p>
              <p className="text-xl font-medium">Monday</p>
            </div>
            <div>
              <p className="text-black-5 mb-2 text-base">Approve status</p>
              <p className="text-xl font-medium">Pending</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingVideo;
