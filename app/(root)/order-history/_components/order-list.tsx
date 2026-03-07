'use client';

import HistoryCard from '@/components/shared/history-card';
import { HistoryCardProp } from '@/lib/types';
import { Order, useGetOrdersQuery } from '@/redux/api/authApi';

const OrderList = () => {
  const { data: ordersData, isLoading } = useGetOrdersQuery();

  if (isLoading) {
    return (
      <section className="mb-10">
        <div className="container">
          <p>Loading orders...</p>
        </div>
      </section>
    );
  }

  const orders = ordersData?.results.map((order: Order) => ({
    id: order.uid,
    title: `Order #${order.uid.slice(0, 8)}`,
    items:
      order.order_items.length > 0
        ? order.order_items.map((item) => ({
            image: item.product.file_items[0]?.file || '/images/placeholder.png',
            name: item.title,
          }))
        : [{ image: '/images/placeholder.png', name: 'No items' }],
    price: parseFloat(order.total_amount),
    date: new Date(order.created_at),
    shipping_address: {
      name: 'User', // Placeholder, API doesn't return name in order yet
      email: 'user@example.com', // Placeholder
      location: typeof order.address === 'string' ? order.address : order.address.address,
    },
    payment_details: {
      payment_method: 'Card', // Placeholder
      trx_id: order.payment_intent_id,
    },
    type: 'ORDER' as const,
  }));

  return (
    <section className="mb-10">
      <div className="container">
        {!orders || orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {orders.map((order: HistoryCardProp) => (
              <HistoryCard key={order.id} history={order} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OrderList;
