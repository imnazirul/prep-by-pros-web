import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon, { IconName } from '@/lib/icon';
import Link from 'next/link';
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const settingsMenu = [
  {
    label: 'Account Setting',
    href: '/settings/account',
    icon: 'user_2' as IconName,
  },
  {
    label: 'Order History',
    href: '/order-history',
    icon: 'shopping_bag' as IconName,
  },
  {
    label: 'Order Tracking',
    href: '/order-tracking',
    icon: 'shipment_tracking' as IconName,
  },
  {
    label: 'Payment History',
    href: '/payment-history',
    icon: 'invoice' as IconName,
  },
  {
    label: 'Subscription',
    href: '/my-subscriptions',
    icon: 'medal' as IconName,
    showSeparator: true,
  },
  {
    label: 'My Saves',
    href: '/saved',
    icon: 'bookmark' as IconName,
  },
  {
    label: 'My Activity',
    href: '/my-activity',
    icon: 'clock' as IconName,
  },
  {
    label: 'Help Center',
    href: '/help-center',
    icon: 'customer_service' as IconName,
    showSeparator: true,
  },
  {
    label: 'My QR',
    href: '/share-profile',
    icon: 'my_qr' as IconName,
  },
  {
    label: 'Refer a Friend',
    href: '/referral',
    icon: 'refer_friend' as IconName,
    showSeparator: true,
  },
  {
    label: 'About Us',
    href: '/about-us',
    icon: 'help_circle' as IconName,
  },
  {
    label: 'Terms and Policies',
    href: '/terms-and-conditions',
    icon: 'document_validation' as IconName,
    showSeparator: true,
  },
];

import { useRetrieveMeQuery, useLogoutMutation } from '@/redux/api/authApi';
import { logout, selectCurrentUser } from '@/redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

export default function HeaderProfile() {
  const [open, setOpen] = useState(false);
  const token = useAppSelector((state) => state.auth.token);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logoutApi] = useLogoutMutation();

  const { data: userData } = useRetrieveMeQuery(undefined, { skip: !token });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // console.log('me in header', userData);

  const currentUser = useAppSelector(selectCurrentUser);
  const user = mounted ? userData || currentUser : null;

  const fullName = user?.first_name
    ? `${user.first_name} ${user.last_name || ''}`
    : user?.name || 'User';

  const userName = user?.username ? `@${user.username}` : '';
  const initial = user?.first_name ? user.first_name.charAt(0).toUpperCase() : 'U';

  return (
    <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2.5">
          <Avatar className="size-13 after:hidden">
            <AvatarImage src={user?.image || '/images/profile.png'} className="rounded-[14px]" />
            <AvatarFallback className="text-black-8 size-13 rounded-[14px] border-0 text-lg font-medium">
              {initial}
            </AvatarFallback>
          </Avatar>
          <div className="hidden space-x-1 text-sm sm:block">
            <div className="text-base font-medium text-black">{fullName}</div>
            {userName && <div className="text-black-8 text-xs">{userName}</div>}
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="border-black-5 w-80 p-8 shadow-[0_12px_8px_0_rgba(0,0,0,0.16)] sm:w-95"
        align="end"
        sideOffset={20}
      >
        <div className="space-y-6">
          {settingsMenu.map((menu, index) => (
            <React.Fragment key={index}>
              <Link
                href={menu.href}
                onClick={() => setOpen(false)}
                className="group flex w-full cursor-pointer items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Icon
                    name={menu.icon}
                    height={24}
                    width={24}
                    className="text-black-10 group-hover:text-primary size-6"
                  />
                  <span className="group-hover:text-primary text-base text-black">
                    {menu.label}
                  </span>
                </div>
                <Icon
                  name="chevron_right"
                  height={24}
                  width={24}
                  className="text-black-10 group-hover:text-primary size-6"
                />
              </Link>
              {menu.showSeparator && <hr className="border-black-4" />}
            </React.Fragment>
          ))}

          <div
            onClick={() => {
              logoutApi(undefined);
              dispatch(logout());
              router.push('/login');
            }}
            className="group flex w-full cursor-pointer items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Icon
                name={'logout'}
                height={24}
                width={24}
                className="text-black-10 group-hover:text-primary size-6"
              />
              <span className="group-hover:text-primary text-base text-black">Logout</span>
            </div>
            <Icon
              name="chevron_right"
              height={24}
              width={24}
              className="text-black-10 group-hover:text-primary size-6"
            />
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
