'use client';

import NavbarHeight from '@/components/shared/navbar-height';
import PageHeader from '@/components/shared/page-header';
import { buttonVariants } from '@/components/ui/button';
import Icon from '@/lib/icon';
import { cn } from '@/lib/utils';
import { useGetCategoriesQuery } from '@/redux/api/globalApi';
import Link from 'next/link';
import ProductList from '../../_components/product-list';
import CateogoryBanner from './cateogory-banner';
import Filter from './filter';

const ShopCategoryContent = ({ slug }: { slug: string }) => {
  // Fetch categories to find the current one and get its title
  const { data: categoriesData, isLoading } = useGetCategoriesQuery({
    page: 1,
    page_size: 100,
  });

  const category = categoriesData?.results.find(
    (c) => c.slug === slug || c.title.toLowerCase() === slug.toLowerCase().replace(/-/g, ' ')
  );

  if (isLoading) {
    return (
      <div className="container py-20 text-center">
        <p>Loading category...</p>
      </div>
    );
  }

  // If category not found in the fetched list (maybe fallback to slug as title or show 404?)
  // For now, let's gracefully fallback to using the slug as title if not found,
  // or return null if we want to be strict.
  // But strictly returning null might hide products if the category exists but wasn't in the first 100 results.
  // Given user requirements, showing the Products is key.

  const displayTitle = category?.title || slug;

  return (
    <div>
      <NavbarHeight />
      <PageHeader
        title="Where Style Meets Comfort"
        subTitle={`The ${displayTitle} you'll reach for every time.!`}
      />

      {category && <CateogoryBanner title={displayTitle} />}

      <section className="container">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href={'/shop'}
              className={cn(
                buttonVariants({
                  variant: 'default',
                  size: 'icon',
                }),
                'size-13'
              )}
            >
              <Icon height={24} width={24} name="arrow_left" />
            </Link>

            <h3 className="text-black-10 text-2xl font-medium md:text-3xl lg:text-4xl">
              {displayTitle}
            </h3>
          </div>
          <Filter />
        </div>
      </section>

      <ProductList categoryTitle={category?.title || undefined} categorySlug={slug} />
    </div>
  );
};

export default ShopCategoryContent;
