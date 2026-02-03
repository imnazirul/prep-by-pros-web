/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/lib/icon';
import { cn } from '@/lib/utils';
import { Notification, useGetNotificationsQuery } from '@/redux/api/authApi';
import { Check, Infinity, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type FilterType = 'ALL' | 'SUBSCRIPTION' | 'ECOMMERCE';

export function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('ALL');

  // Fetch notifications
  const { data: notificationsData, isLoading } = useGetNotificationsQuery({
    ordering: '-created_at',
    page: 1,
    page_size: 50, // Fetch enough to filter locally
  });

  const notifications = notificationsData?.results || [];

  // Filter logic
  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'SUBSCRIPTION') {
      // Assuming subscription related notifications have specific model_kinds or fields
      // This might need adjustment based on actual backend values
      return (
        n.model_kind === 'SUBSCRIPTION' || n.model_kind === 'USER_FOLLOW' || n.kind === 'FOLLOW'
      );
    }
    if (activeFilter === 'ECOMMERCE') {
      return n.model_kind === 'ORDER' || n.model_kind === 'PRODUCT' || !!n.order_uid;
    }
    return true;
  });

  const unreadNotifications = filteredNotifications.filter((n) => !n.is_read);
  const readNotifications = filteredNotifications.filter((n) => n.is_read);

  // Limit display (optional, but good for UI)
  const recentDisplay = unreadNotifications.slice(0, 5);
  const readDisplay = readNotifications.slice(0, 5);

  return (
    <DropdownMenu onOpenChange={setOpen} open={open}>
      <DropdownMenuTrigger asChild>
        <Button variant={'default'} size={'icon'} className={cn('size-13 relative')}>
          <Icon name="notification" height={24} width={24} />
          {unreadNotifications.length > 0 && (
            <span className="absolute top-3 right-3 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        sideOffset={20}
        className="border-black-5 w-124.5 max-h-[80vh] overflow-y-auto rounded-3xl p-6 shadow-[0_12px_8px_0_rgba(0,0,0,0.16)]"
        align="end"
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Notifications</h2>
            <button type="button" className="cursor-pointer" onClick={() => setOpen(false)}>
              <Icon name="close" height={20} width={20} className="text-black-10" />
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <Button
              variant={activeFilter === 'ALL' ? 'default' : 'secondary'}
              size={'sm'}
              className="text-base"
              onClick={() => setActiveFilter('ALL')}
            >
              <Infinity className="h-5 w-5 shrink-0" />
              All
            </Button>
            <Button
              variant={activeFilter === 'SUBSCRIPTION' ? 'default' : 'secondary'}
              size={'sm'}
              className="text-base"
              onClick={() => setActiveFilter('SUBSCRIPTION')}
            >
              <Check className="h-5 w-5 shrink-0" /> Subscription
            </Button>
            <Button
              variant={activeFilter === 'ECOMMERCE' ? 'default' : 'secondary'}
              size={'sm'}
              className="text-base"
              onClick={() => setActiveFilter('ECOMMERCE')}
            >
              <ShoppingBag className="h-5 w-5 shrink-0" /> E-commerce
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-4 text-gray-500">Loading...</div>
          ) : (
            <>
              {recentDisplay.length === 0 && readDisplay.length === 0 && (
                <div className="text-center py-8 text-gray-500">No notifications found</div>
              )}

              {/* Recent Section */}
              {recentDisplay.length > 0 && (
                <div className="space-y-3">
                  <p className="text-black-9 font-medium">Recent</p>
                  <div className="bg-black-4 space-y-3.5 rounded-2xl p-3">
                    {recentDisplay.map((notification) => (
                      <NotificationItem key={notification.uid} notification={notification} />
                    ))}
                  </div>
                </div>
              )}

              {/* Read Section */}
              {readDisplay.length > 0 && (
                <div className="space-y-3">
                  <p className="text-black-9 font-medium">Read</p>
                  <div className="bg-black-4 space-y-3.5 rounded-2xl p-3">
                    {readDisplay.map((notification) => (
                      <NotificationItem key={notification.uid} notification={notification} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NotificationItem({ notification }: { notification: Notification }) {
  const isSystem = notification.kind === 'SYSTEM' || notification.model_kind === 'SYSTEM'; // Adjust based on actual data

  // Determine image to show
  let imageSrc =
    notification.user_image || notification.content_image || notification.product_image;
  if (notification.follower_user?.image) {
    imageSrc = notification.follower_user.image;
  }

  // Determine fallback initial
  const fallback = 'PL';

  // Determine link based on type (This is a simplified logic, refine as needed)
  let href = '#';
  if (notification.order_uid) href = `/orders/${notification.order_uid}`;
  else if (notification.content_uid) href = `/content/${notification.content_uid}`; // Adjust path

  return (
    <Link href={href}>
      <div className="flex cursor-pointer gap-3 hover:opacity-80 transition-opacity">
        <div className="relative shrink-0">
          {isSystem ? (
            <div className="bg-primary-300 flex size-16 items-center justify-center rounded-xl">
              <Icon name="settings_error" height={32} width={32} className="text-primary" />
            </div>
          ) : (
            <Avatar className="bg-primary-300 size-16 overflow-hidden rounded-xl">
              <AvatarImage src={imageSrc} className="rounded-none object-cover" />
              <AvatarFallback className="rounded-none text-primary font-bold">
                {fallback}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
        <div className="flex flex-col gap-0.5 justify-center">
          <p className="text-black-8 line-clamp-2 text-base leading-[140%]">
            {notification.title}{' '}
            {notification.description && (
              <span className="text-gray-500 text-sm"> - {notification.description}</span>
            )}
          </p>
          <span className="text-black-7 text-sm">
            {notification.created_relative ||
              new Date(notification.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
