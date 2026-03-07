'use client';

import Circle3DLoader from '@/components/shared/circle-loader';
import OrderItemDetails from '@/components/shared/order-item-details';
import { Button, buttonVariants } from '@/components/ui/button';
import { useCart } from '@/contexts/cart-context';
import { HistoryCardProp } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useGetOrderQuery } from '@/redux/api/authApi';
import Link from 'next/link';

export default function OrderDetailsPage({ orderUid }: { orderUid: string }) {
  const { addItem, openCart, isAdding } = useCart();
  const { data: orderData, isLoading } = useGetOrderQuery(orderUid);

  if (isLoading) {
    return (
      <div className="container mb-12">
        <p>Loading order details...</p>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="container mb-12">
        <p>Order not found</p>
      </div>
    );
  }

  const order: HistoryCardProp = {
    id: orderData.uid,
    title: `Order #${orderData.uid.slice(0, 8)}`,
    items: orderData.order_items.map((item) => ({
      image: item.product.file_items[0]?.file || '/images/placeholder.png',
      name: item.title,
    })),
    price: parseFloat(orderData.total_amount),
    date: new Date(orderData.created_at),
    shipping_address: {
      name: orderData.user?.first_name || orderData.user?.username || 'User',
      email: orderData.user?.email || 'user@example.com',
      location:
        typeof orderData.address === 'string'
          ? orderData.address
          : orderData.address?.address || 'Unknown Location',
    },
    payment_details: {
      payment_method: 'Card',
      trx_id: orderData.payment_intent_id,
    },
    type: 'ORDER' as const,
  };

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
            <h3 className="text-black-10 text-xl font-medium md:text-2xl">Receipt</h3>

            <div className="space-y-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-black-8 text-lg">Subtotal:</span>
                  <span className="text-black-9 text-2xl">${orderData.sub_total || 0}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-black-8 text-lg">Delivery Fee:</span>
                  <span className="text-black-9 text-2xl">${orderData.delivery_fee || 0}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-black-8 text-lg">TAX:</span>
                  <span className="text-black-9 text-2xl">${orderData.tax_amount || 0}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-black-8 text-lg">Discount:</span>
                  <span className="text-black-9 text-2xl">${orderData.discount_amount || 0}</span>
                </div>
              </div>

              <hr className="border-black-5 border-[1.5px] border-dashed" />

              <div className="flex items-center justify-between">
                <span className="text-black-10 text-xl font-medium md:text-2xl">Total:</span>
                <span className="text-black-10 text-xl font-medium md:text-2xl">
                  ${order.price}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4">
            <Link
              href={`/order/${order.id}/refund`}
              className={cn(
                buttonVariants({
                  variant: 'secondary',
                  size: 'lg',
                }),
                'bg-primary-200 hover:bg-primary-300 text-primary lg:px-26.25'
              )}
            >
              Refund
            </Link>
            <Button
              disabled={isAdding}
              onClick={async () => {
                // Add all items from the order to cart
                if (orderData?.order_items) {
                  for (const item of orderData.order_items) {
                    await addItem({
                      product_uid: item.product.uid,
                      product_count: 1,
                    });
                  }
                  openCart();
                }
              }}
              size="lg"
              className="lg:px-26.25 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isAdding ? (
                <Circle3DLoader size={2} radius={10} depth={5} color="#fff" />
              ) : (
                'Buy Again'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
