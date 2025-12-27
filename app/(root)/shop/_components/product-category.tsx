'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { categories } from '@/data';
import { buttonVariants } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

export default function ProductCategory() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {categories.map((category, index) => (
        <Link
          key={index}
          href={`/shop/${category.slug}`}
          className={cn(
            buttonVariants({ variant: 'secondary' }),
            'p-1.5 pr-3.5',
          )}
        >
          <Avatar className="size-9">
            <AvatarImage src={category.image} />
          </Avatar>
          {category.value}
        </Link>
      ))}
    </div>
  );
}
