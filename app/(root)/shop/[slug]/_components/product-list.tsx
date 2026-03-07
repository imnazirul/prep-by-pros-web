import { ProductCard } from '@/components/shared/product-card';
import { products } from '@/data';
import { cn } from '@/lib/utils';

const ProductList = () => {
  return (
    <section className="mb-10">
      <div className="container">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products?.map((product) => (
            <ProductCard
              product={product}
              key={product.id}
              className={cn('aspect-432/569 md:rounded-3xl md:p-6')}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
