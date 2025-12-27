/* eslint-disable @next/next/no-img-element */
'use client';

import Icon from '@/lib/icon';
import { cn } from '@/lib/utils';
import { ActivityProp } from '@/lib/types';

export default function ActivityCard({
  acitivty,
  className,
}: {
  acitivty: ActivityProp;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'group bg-card relative z-1 overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 md:rounded-3xl',
        className,
      )}
    >
      <div className="relative z-1 after:absolute after:inset-0 after:z-1 after:bg-[linear-gradient(16deg,rgba(0,0,0,0.00)_59.35%,rgba(0,0,0,0.60)_93.77%)]">
        <img
          src={acitivty.image}
          alt={acitivty.category}
          className="-z-2 h-auto w-full"
        />
      </div>

      <div className="absolute top-4 right-4 z-2 flex items-center gap-2 md:top-6 md:right-6">
        <span className="text-black-10 flex h-8 shrink-0 items-center rounded-full bg-[#FEFBE6] px-4 text-sm hover:bg-white">
          {acitivty.category}
        </span>
        <span className="flex h-8 shrink-0 items-center gap-1.5 rounded-full bg-[#A3A3A3]/40 px-4 text-sm text-white backdrop-blur-[20px] duration-300 hover:bg-[#A3A3A3]/60">
          <Icon name="view" height={20} width={20} />
          {acitivty.views}
        </span>
      </div>
    </div>
  );
}
