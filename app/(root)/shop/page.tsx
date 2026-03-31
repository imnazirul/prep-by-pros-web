import { Metadata } from 'next';
import PageHeader from '@/components/shared/page-header';
import NavbarHeight from '@/components/shared/navbar-height';
import ProductList from './_components/product-list';
import ProductCategory from './_components/product-category';
import ShopBanner from './_components/shop-banner';
import Filter from './_components/filter';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Shop',
};

const ShopPage = () => {
  return (
    <div>
      <NavbarHeight />
      <PageHeader
        title="A better way to wear confidence"
        subTitle="Your new favorite jersey starts here.!"
      />

      <ShopBanner />

      <section className="container">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <ProductCategory />
          <Suspense fallback={<div>Loading filters...</div>}>
            <Filter />
          </Suspense>
        </div>
      </section>

      <Suspense fallback={<div>Loading products...</div>}>
        <ProductList />
      </Suspense>
    </div>
  );
};

export default ShopPage;
