'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { buttonVariants } from '@/components/ui/button';

const PolicyButtons = () => {
  const pathName = usePathname();

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      {[
        {
          label: 'Terms and Conditions',
          href: '/terms-and-conditions-2',
        },
        {
          label: 'Privacy Policy',
          href: '/privacy-policy-2',
        },
        {
          label: 'Refund Policy',
          href: '/refund-policy-2',
        },
      ].map(({ label, href }) => (
        <Link
          href={href}
          key={label}
          type="button"
          className={cn(
            buttonVariants({
              variant: 'secondary',
            }),
            pathName === href
              ? 'bg-black-10 hover:bg-black-10/90 font-semibold text-white'
              : 'border-black-5 border font-normal',
          )}
        >
          {label}
        </Link>
      ))}
    </div>
  );
};

export default PolicyButtons;
