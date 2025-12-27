import { Metadata } from 'next';
import PageHeader from '@/components/shared/page-header';
import NavbarHeight from '@/components/shared/navbar-height';
import ProductList from './_components/product-list';
import Filter from './_components/filter';
import CateogoryBanner from './_components/cateogory-banner';
import { categories } from '@/data';
import { CategoryProp } from '@/lib/types';

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
          <h3 className="text-black-10 text-2xl font-medium md:text-3xl lg:text-4xl">
            {cateogory.value}
          </h3>
          <Filter />
        </div>
      </section>

      <ProductList />
    </div>
  );
};

export default ShopCategoryPage;
