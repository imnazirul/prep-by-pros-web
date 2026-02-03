'use client';

import Link from 'next/link';
import Icon from '@/lib/icon';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import HeaderProfile from './header-profile';
import HeaderSearch from './header-search';
import { usePathname } from 'next/navigation';
import { useCart } from '@/contexts/cart-context';
import { usePostDialog } from '@/contexts/post-dialog-context';
import { NotificationDropdown } from './header-notification';

const playerNavItems = [
  { label: 'Home', href: '/' },
  { label: 'My feed', href: '/feed' },
  { label: 'Explore', href: '/explore' },
  { label: 'Shop', href: '/shop' },
];

const creatorNavItems = [
  { label: 'Home', href: '/creator' },
  { label: 'Dashboard', href: '/creator/dashboard' },
  { label: 'Subscribers', href: '/my-subscriptions' },
  { label: 'Shop', href: '/shop' },
];

export function Header() {
  const { items, openCart } = useCart();
  const { openPostDialog } = usePostDialog();
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Logic to check if the user is in the creator section
  const isCreatorSection = pathname.startsWith('/creator');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = isCreatorSection ? creatorNavItems : playerNavItems;

  return (
    <header
      id="header-id"
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? 'bg-background border-b py-3'
          : 'lg::pt-12 bg-transparent pt-6 md:pt-9'
      }`}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-16">
          <Link href={'/'}>
            <Icon name="logo" height={52} width={92} />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map(({ label, href }) => {
              const isActive =
                href === '/' ? pathname === '/' : pathname.startsWith(href);

              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-1 text-xl text-black transition-all duration-300',
                  )}
                >
                  <span
                    className={
                      isActive
                        ? 'font-semibold'
                        : 'font-medium opacity-40 hover:opacity-100'
                    }
                  >
                    {' '}
                    {label}
                  </span>
                </Link>
              );
            })}

            <button
              onClick={openCart}
              className={cn(
                'flex cursor-pointer items-center gap-1 text-xl text-black transition-all duration-300',
              )}
            >
              <span className={'font-medium opacity-40 hover:opacity-100'}>
                My Cart
              </span>
              <span className="bg-red flex size-4 items-center justify-center rounded-full text-xs text-white">
                {items.length}
              </span>
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <HeaderSearch />

          {isCreatorSection && (
            <Button onClick={openPostDialog} className="h-13">
              <Icon name="plus_sign" height={24} width={24} />
              Add new post
            </Button>
          )}

          <NotificationDropdown />

          <HeaderProfile />
        </div>
      </div>
    </header>
  );
}
