'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/cart-context';
import Icon from '@/lib/icon';
import { ProductCardProp } from '@/lib/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function ProductCard({
  product,
  className,
}: {
  product: ProductCardProp;
  className?: string;
}) {
  const { addItem, items } = useCart();

  // Check if this product is already in the cart
  const isInCart = items.some((item) => item.id === String(product.id));
  return (
    <Link
      href={`/product-details/${product.slug || product.id}`}
      style={{
        backgroundImage: `url("${product.images[0].src}")`,
      }}
      className={cn(
        'group bg-card relative z-1 flex aspect-240/320 items-end overflow-hidden rounded-2xl bg-cover p-4 transition-all duration-300 after:absolute after:inset-0 after:-z-1 after:bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_40%,rgba(0,0,0,0.40)_70%)]',
        className
      )}
    >
      <div className="grid w-full gap-1.5">
        <div className="flex items-center justify-between">
          <h3 className="text-[26px] font-semibold text-white">${product.price}</h3>
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();

              // Construct proper payload for API
              const payload: any = {
                product_uid: String(product.id),
                product_count: 1,
              };

              addItem(payload);
            }}
            size="icon-sm"
            variant="secondary"
            className={`shrink-0 bg-[#FBFFFF] hover:bg-white ${
              isInCart ? 'text-red' : 'text-black-10 hover:text-red'
            }`}
          >
            <Icon name="shopping_basket" height={16} width={16} />
          </Button>
        </div>

        <p className="text-black-5 line-clamp-1 text-sm">{product.name}</p>
      </div>
    </Link>
  );
}
