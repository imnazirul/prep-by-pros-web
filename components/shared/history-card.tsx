'use client';

import { HistoryCardProp } from '@/lib/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import Link from 'next/link';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useAddToCartMutation } from '@/redux/api/authApi';
import { useState } from 'react';

const HistoryCard = ({ history }: { history: HistoryCardProp }) => {
  const router = useRouter();
  const [addToCart] = useAddToCartMutation();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const itemsWithProduct = history.items.filter((item) => item.product_uid);
  const canBuyAgain = itemsWithProduct.length > 0;
  // Show order-related actions only when there are purchasable items (not subscription payments)
  const showOrderActions = canBuyAgain || history.type === 'ORDER';

  const handleBuyAgain = async () => {
    if (!canBuyAgain) return;
    try {
      setIsAddingToCart(true);

      for (const item of itemsWithProduct) {
        await addToCart({
          product_uid: item.product_uid!,
          product_count: item.quantity || 1,
          size_uid: item.size_uid,
          colour_uid: item.colour_uid,
          style_uid: item.style_uid,
        }).unwrap();
      }

      router.push('/checkout');
    } catch (error) {
      console.error('Failed to add items to cart', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("${history.items[0].image}")`,
      }}
      className="group bg-card relative z-1 flex aspect-426/398 items-end overflow-hidden rounded-2xl bg-cover p-4 transition-all duration-300 after:absolute after:inset-0 after:-z-1 after:bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_26.88%,rgba(0,0,0,0.60)_55.34%)] md:rounded-3xl"
    >
      <Link
        href={`/order/${history.id}`}
        className="absolute inset-0 z-0"
        aria-label="View Order Details"
      />
      <div className="w-full relative z-10 pointer-events-none">
        <div className="space-y-2">
          <div
            className={cn(
              'flex items-center justify-between',
              history.type === 'ORDER' ? 'items-center' : 'items-start'
            )}
          >
            <div className="space-y-1">
              <h3 className="line-clamp-1 text-2xl font-semibold text-white">
                {history.type === 'ORDER' ? `Total ${history.items.length} Items` : history.title}
              </h3>
              {history.type === 'PAYMENT' && (
                <p className="text-black-4 text-sm">TxID: {history.payment_details.trx_id} </p>
              )}
            </div>
            <span className="text-black-4 shrink-0 rounded-full bg-[#AEACAC52] px-3 py-1.5 text-lg font-bold backdrop-blur-[20px]">
              ${history.price.toFixed(2)}
            </span>
          </div>

          {history.type === 'ORDER' && (
            <div className="flex items-center justify-between">
              <p className="text-black-4 line-clamp-2 max-w-53.75 text-sm">
                {history.items.map((item) => item.name).join(',')}
              </p>
              <div className="grid shrink-0">
                <span className="text-black-4 text-base font-medium">Delivered on</span>
                <span className="text-black-5 text-xs">
                  {format(new Date(history.date), 'dd MMMM, yyyy')}
                </span>
              </div>
            </div>
          )}

          {history.type === 'PAYMENT' && (
            <div className="flex items-center justify-between">
              <div className="grid shrink-0">
                <span className="text-black-4 text-base font-medium">Payment Date</span>
                <span className="text-black-5 text-xs">
                  {format(new Date(history.date), 'dd MMMM, yyyy')}
                </span>
              </div>
              <div className="grid shrink-0">
                <span className="text-black-4 text-base font-medium">Payment Method</span>
                <span className="text-black-5 text-xs">
                  {history.payment_details.payment_method}
                </span>
              </div>
            </div>
          )}

          {showOrderActions ? (
            <div className="mt-5 grid grid-cols-[4.5fr_7.5fr] items-center gap-2 text-center pointer-events-auto">
              <Button
                asChild
                className="text-primary hover:bg-primary-100 w-full bg-white font-semibold"
                variant={'secondary'}
              >
                <Link href={`/order/${history.id}/refund`}>Refund</Link>
              </Button>

              <Button
                variant={'default'}
                disabled={isAddingToCart || !canBuyAgain}
                onClick={handleBuyAgain}
              >
                {isAddingToCart ? 'Adding...' : 'Buy Again'}
              </Button>
            </div>
          ) : history.is_subscription ? (
            <div className="mt-5 pointer-events-auto">
              <Button asChild variant={'default'} className="w-full">
                <Link href="/my-subscriptions">Manage Subscription</Link>
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
