/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/lib/icon';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Check, ShoppingBag, Infinity } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useState } from 'react';

export function NotificationDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu onOpenChange={setOpen} open={open}>
      <DropdownMenuTrigger asChild>
        <Button variant={'default'} size={'icon'} className={cn('size-13')}>
          <Icon name="notification" height={24} width={24} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        sideOffset={20}
        className="border-black-5 w-124.5 rounded-3xl p-6 shadow-[0_12px_8px_0_rgba(0,0,0,0.16)]"
        align="end"
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Notifications</h2>
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Icon
                name="close"
                height={20}
                width={20}
                className="text-black-10"
              />
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <Button variant={'default'} size={'sm'} className="text-base">
              <Infinity className="h-5 w-5 shrink-0" />
              All
            </Button>
            <Button variant="secondary" size={'sm'} className="text-base">
              <Check className="h-5 w-5 shrink-0" /> Subscription
            </Button>
            <Button variant="secondary" size={'sm'} className="text-base">
              <ShoppingBag className="h-5 w-5 shrink-0" /> E-commerce
            </Button>
          </div>

          {/* Recent Section */}
          <div className="space-y-3">
            <p className="text-black-9 font-medium">Recent</p>
            <div className="bg-black-4 space-y-3.5 rounded-2xl p-3">
              <NotificationItem
                image="https://github.com/shadcn.png"
                title="4 players have submitted their weekly fitness assessments. Tap to review their..."
                time="5 hours ago"
              />
              <NotificationItem
                image="https://github.com/shadcn.png"
                title="Our team's performance summary is ready. Visit the dashboard to explore detailed insights."
                time="5 hours ago"
              />
            </div>
          </div>

          {/* Read Section */}
          <div className="space-y-3">
            <p className="text-black-9 font-medium">Read</p>
            <div className="bg-black-4 space-y-3.5 rounded-2xl p-3">
              <NotificationItem
                image="https://images.unsplash.com/photo-1574629810360-7efbbe195018"
                title="Player feedback responses have been delivered to your inbox. Review and respond accordingly."
                time="5 hours ago"
              />
              <NotificationItem
                title="System update: Your coaching dashboard has been refreshed with the latest analytics."
                time="5 hours ago"
                isSystem
              />
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NotificationItem({ image, title, time, isSystem }: any) {
  return (
    <div className="flex cursor-pointer gap-3">
      <div className="relative shrink-0">
        {isSystem ? (
          <div className="bg-primary-300 flex size-16 items-center justify-center rounded-xl">
            <Icon
              name="settings_error"
              height={32}
              width={32}
              className="text-primary"
            />
          </div>
        ) : (
          <Avatar className="bg-primary-300 size-16 overflow-hidden rounded-xl">
            <AvatarImage src={image} className="rounded-none object-cover" />
            <AvatarFallback className="rounded-none">PL</AvatarFallback>
          </Avatar>
        )}
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-black-8 line-clamp-2 text-base leading-[140%]">
          {title}
        </p>
        <span className="text-black-7 text-sm">{time}</span>
      </div>
    </div>
  );
}
