'use client';

import { buttonVariants } from '@/components/ui/button';
import Icon, { IconName } from '@/lib/icon';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    label: 'Profile Information',
    href: '/settings/account',
    icon: 'shopping_bag' as IconName,
    active_icon: 'shopping_bag_fill' as IconName,
  },
  {
    label: 'Payment Settings',
    href: '/settings/payment',
    icon: 'credit_card_add' as IconName,
    active_icon: 'credit_card_add' as IconName,
  },
  {
    label: 'Passwords and Others',
    href: '/settings/security',
    icon: 'security_lock' as IconName,
    active_icon: 'security_lock_fill' as IconName,
  },
  {
    label: 'Notification Center',
    href: '/settings/notification-center',
    icon: 'notification' as IconName,
    active_icon: 'notification_fill' as IconName,
  },
  {
    label: 'Language ',
    href: '/settings/language',
    icon: 'language_square' as IconName,
    active_icon: 'language_square_fill' as IconName,
  },
];

const SettingsSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="space-y-4">
      {navItems.map(({ label, href, icon, active_icon }) => {
        const isActive =
          href === '/' ? pathname === '/' : pathname.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              buttonVariants({
                variant: isActive ? 'secondary' : 'ghost',
              }),
              'hover:bg-primary/10 group hover:text-primary h-14 w-full justify-start text-lg font-normal',
              isActive ? 'bg-primary/10 text-primary' : 'text-black',
            )}
          >
            <Icon
              name={icon}
              className={cn('group-hover:hidden', isActive && 'hidden')}
              height={24}
              width={24}
            />
            <Icon
              name={active_icon}
              className={cn('hidden group-hover:block', isActive && 'block')}
              height={24}
              width={24}
            />
            {label}
          </Link>
        );
      })}
    </aside>
  );
};

export default SettingsSidebar;
