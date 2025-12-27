import { cn } from '@/lib/utils';
import { products } from '@/data';
import { ProductCard } from '@/components/shared/product-card';

const ProductList = () => {
  return (
    <section className="mb-10">
      <div className="container">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products?.map((product, index) => (
            <ProductCard
              product={product}
              key={product.id}
              className={cn(
                'md:rounded-3xl md:p-6',
                index == 4
                  ? 'aspect-432/569 lg:col-span-2 lg:aspect-auto lg:h-full'
                  : 'aspect-432/569',
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
