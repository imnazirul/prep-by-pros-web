'use client';

import HistoryCard from '@/components/shared/history-card';
import { HistoryCardProp } from '@/lib/types';
import { Payment, useGetPaymentsQuery } from '@/redux/api/authApi';
import { Loader2 } from 'lucide-react';

const PaymentList = () => {
  const { data: paymentsData, isLoading, isError } = useGetPaymentsQuery();

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-40 items-center justify-center text-red-500">
        Failed to load payment history.
      </div>
    );
  }

  const payments = paymentsData?.results || [];

  return (
    <section className="mb-10">
      <div className="container">
        {payments.length === 0 ? (
          <div className="flex h-40 items-center justify-center text-gray-500">
            No payment history found.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {payments.map((payment: Payment) => {
              // Extract items or fallback
              let items: { image: string; name: string }[] = [];
              let title = 'Payment';

              if (payment.kind === 'ORDER' && payment.order) {
                title =
                  payment.order.title || `Order #${payment.order.uid || payment.uid.slice(0, 8)}`;
                items = (payment.order.order_items || []).map((item: any) => ({
                  image: item.product?.file_items?.[0]?.thumbnail || '/images/fallback.jpeg',
                  name: item.title || item.product?.title || 'Unknown Product',
                  price: parseFloat(item.price),
                  quantity: item.quantity,
                }));
              } else if (payment.kind.includes('SUBSCRIPTION')) {
                title = 'Subscription Payment';
                // Try to get image from coach or player involved in subscription
                const image =
                  payment.user_subscription?.coach?.image ||
                  payment.coach?.image ||
                  '/images/fallback.jpeg';
                items = [
                  {
                    image: image,
                    name: `Subscription - ${payment.user_subscription?.status || payment.status}`,
                  },
                ];
              }

              // Fallback if no items found to prevent crash in HistoryCard (it accesses items[0])
              if (items.length === 0) {
                items.push({
                  image: '/images/fallback.jpeg',
                  name: 'Payment',
                });
              }

              const historyProp: HistoryCardProp = {
                id: payment.uid,
                title: title,
                price: parseFloat(payment.total),
                type: 'PAYMENT',
                date: new Date(payment.created_at),
                items: items,
                shipping_address: {
                  name: payment.player?.first_name || payment.player?.username || 'Unknown',
                  email: payment.player?.email || 'N/A',
                  location: payment.player?.country || 'Unknown',
                },
                payment_details: {
                  payment_method: payment.currency_kind, // Mapping currency as method for now as method is missing
                  trx_id: payment._id || payment.uid,
                },
              };

              return <HistoryCard key={payment.uid} history={historyProp} />;
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default PaymentList;
