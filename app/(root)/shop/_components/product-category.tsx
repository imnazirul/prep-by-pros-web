'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useGetCategoriesQuery } from '@/redux/api/globalApi';
import Link from 'next/link';

export default function ProductCategory() {
  const { data: categoriesData } = useGetCategoriesQuery({ page: 1, page_size: 100 });
  const categories = categoriesData?.results || [];

  return (
    <div className="flex flex-wrap items-center gap-3">
      {categories.map((category, index) => (
        <Link
          key={index}
          href={`/shop/${category.slug}`}
          className={cn(buttonVariants({ variant: 'secondary' }), 'p-1.5 pr-3.5')}
        >
          <Avatar className="size-9">
            <AvatarImage
              src={
                category.file_items && category.file_items.length > 0
                  ? category.file_items[0].file
                  : '/images/category/placeholder.svg'
              }
            />
          </Avatar>
          {category.title}
        </Link>
      ))}
    </div>
  );
}
