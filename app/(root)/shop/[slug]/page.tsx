import { Metadata } from 'next';
import PageHeader from '@/components/shared/page-header';
import NavbarHeight from '@/components/shared/navbar-height';
import ProductList from './_components/product-list';
import Filter from './_components/filter';
import CateogoryBanner from './_components/cateogory-banner';
import { categories } from '@/data';
import { CategoryProp } from '@/lib/types';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import Icon from '@/lib/icon';

export const metadata: Metadata = {
  title: 'Shop',
};

const ShopCategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const cateogory: CategoryProp | undefined = categories?.find(
    (category) => category.slug == slug,
  );

  if (!cateogory) {
    return;
  }
  return (
    <div>
      <NavbarHeight />
      <PageHeader
        title="Where Style Meets Comfort"
        subTitle={`The ${cateogory.slug} you'll reach for every time.!`}
      />

      <CateogoryBanner title={cateogory.value} />

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
                'size-13',
              )}
            >
              <Icon height={24} width={24} name="arrow_left" />
            </Link>

            <h3 className="text-black-10 text-2xl font-medium md:text-3xl lg:text-4xl">
              {cateogory.value}
            </h3>
          </div>
          <Filter />
        </div>
      </section>

      <ProductList />
    </div>
  );
};

export default ShopCategoryPage;
