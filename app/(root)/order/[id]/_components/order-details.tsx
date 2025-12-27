'use client';

import { HistoryCardProp } from '@/lib/types';
import { Button, buttonVariants } from '@/components/ui/button';
import { useCart } from '@/contexts/cart-context';
import OrderItemDetails from '@/components/shared/order-item-details';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function OrderDetailsPage({
  order,
}: {
  order: HistoryCardProp;
}) {
  const { addItem, openCart } = useCart();
  return (
    <div className="container mb-12">
      <div className="grid gap-10 lg:grid-cols-[5fr_7fr]">
        {/* Left Column - Item Details */}
        <OrderItemDetails order={order} />

        {/* Right Column - Payment Details */}
        <div className="space-y-6">
          <h2 className="text-black-10 text-2xl font-medium md:text-3xl lg:text-4xl">
            Payment Details
          </h2>

          {/* Receipt Card */}
          <div className="bg-black-4 space-y-7 rounded-2xl p-6 md:rounded-3xl md:p-8">
            {/* Receipt Line Items */}
            <h3 className="text-black-10 text-xl font-medium md:text-2xl">
              Receipt
            </h3>

            <div className="space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-black-8 text-lg">Subtotal:</span>
                  <span className="text-black-9 text-2xl">$2,485</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-black-8 text-lg">Delivery Fee:</span>
                  <span className="text-black-9 text-2xl">$14.90</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-black-8 text-lg">TAX:</span>
                  <span className="text-black-9 text-2xl">$12</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-black-8 text-lg">Discount (10%):</span>
                  <span className="text-black-9 text-2xl">-$252</span>
                </div>
              </div>

              <hr className="border-black-5 border-[1.5px] border-dashed" />

              <div className="flex items-center justify-between">
                <span className="text-black-10 text-xl font-medium md:text-2xl">
                  Total:
                </span>
                <span className="text-black-10 text-xl font-medium md:text-2xl">
                  ${order.price}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4">
            <Link
              href={`/order/1/refund`}
              className={cn(
                buttonVariants({
                  variant: 'secondary',
                  size: 'lg',
                }),
                'bg-primary-200 hover:bg-primary-300 text-primary lg:px-26.25',
              )}
            >
              Refund
            </Link>
            <Button
              onClick={() => {
                addItem({
                  id: String(order.id),
                  name: order.title,
                  price: order.price,
                  quantity: 1,
                  image: order.items[0].image,
                });
                openCart();
              }}
              size="lg"
              className="lg:px-26.25"
            >
              Buy Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
