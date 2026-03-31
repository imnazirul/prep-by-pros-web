'use client';

import { ProductCard } from '@/components/shared/product-card';
import { cn } from '@/lib/utils';
import { useGetProductsQuery } from '@/redux/api/globalApi';
import { useSearchParams } from 'next/navigation';

const ProductList = ({
  categoryTitle,
  categorySlug,
}: {
  categoryTitle?: string;
  categorySlug?: string;
}) => {
  const searchParams = useSearchParams();

  const size = searchParams.get('size');
  const brand = searchParams.get('brand');
  const color = searchParams.get('color');
  const style = searchParams.get('style');
  const sort = searchParams.get('sort');
  const minPrice = searchParams.get('min_price');
  const maxPrice = searchParams.get('max_price');

  /* DEBUG: Hardcoding removed */
  const { data: productsData, isLoading } = useGetProductsQuery({
    page: 1,
    page_size: 100,
    productcategoryconnector__product_category__title: categoryTitle,
    productsizeconnector__product_size__slug: size || undefined,
    brandconnector__brand__slug: brand || undefined,
    productcolourconnector__product_colour__slug: color || undefined,
    productstyleconnector__product_style__slug: style || undefined,
    ordering: sort || undefined,
    min_price: minPrice || undefined,
    max_price: maxPrice || undefined,
  });

  if (isLoading) {
    return (
      <section className="mb-10">
        <div className="container">
          <p>Loading products...</p>
        </div>
      </section>
    );
  }

  const products = productsData?.results.map((product) => ({
    id: product.uid,
    name: product.title,
    price: parseFloat(product.price),
    images:
      product.file_items.length > 0
        ? product.file_items.map((f) => ({ src: f.file }))
        : [{ src: '/images/placeholder.png' }],
    description: product.description || '',
    slug: product.slug,
  }));

  return (
    <section className="mb-10">
      <div className="container">
        {!products || products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard
                product={product}
                key={product.id}
                className={cn(
                  'md:rounded-3xl md:p-6',
                  index == 4
                    ? 'aspect-432/569 lg:col-span-2 lg:aspect-auto lg:h-full'
                    : 'aspect-432/569'
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductList;
