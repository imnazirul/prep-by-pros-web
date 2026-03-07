'use client';

import { useGetProductsQuery } from '@/redux/api/globalApi';
import { ProductCard } from '@/components/shared/product-card';
import Circle3DLoader from '@/components/shared/circle-loader';
import { ProductCardProp } from '@/lib/types';

export default function HotDeals() {
  const { data, isLoading, error } = useGetProductsQuery({ popular: true });

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Circle3DLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center text-red-500">
        Error loading hot deals.
      </div>
    );
  }

  const products: ProductCardProp[] =
    data?.results
      .filter((product) => product.file_items && product.file_items.length > 0)
      .map((product) => ({
        id: product.uid,
        name: product.title,
        price: parseFloat(product.price),
        images: product.file_items.map((file) => ({ src: file.file })),
        description: product.description || '',
      })) || [];

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="mb-8 text-3xl font-bold">Hot Deals</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
