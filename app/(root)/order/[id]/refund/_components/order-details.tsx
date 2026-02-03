'use client';

import ConfirmModal from '@/components/shared/confirm-modal';
import OrderItemDetails from '@/components/shared/order-item-details';
import { HistoryCardProp } from '@/lib/types';
import { OrderItem, useGetOrderItemsQuery, useGetOrderQuery } from '@/redux/api/authApi';
import { useState } from 'react';
import EmptyCard from './empty-card';
import OrderItemsRefund from './order-items-refund';

export default function OrderDetailsPage({ orderUid }: { orderUid: string }) {
  const [confirmed, setConfirmed] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [issue, setIssue] = useState('');
  const [additionalMessage, setAdditionalMessage] = useState('');

  const { data: orderData, isLoading: isOrderLoading } = useGetOrderQuery(orderUid);
  const { data: orderItemsResponse, isLoading: isItemsLoading } = useGetOrderItemsQuery({
    uid: orderUid,
  });

  const orderItems = orderItemsResponse?.results || [];

  if (isOrderLoading || isItemsLoading) return <div>Loading...</div>;
  if (!orderData) return <EmptyCard />;

  const toggleItem = (index: number) => {
    setSelectedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  // Map backend OrderItem to UI format expected by OrderItemDetails
  const mappedItems = orderItems.map((item: OrderItem) => {
    const attributes = [item.colour?.title, item.size?.title, item.style?.title]
      .filter(Boolean)
      .join(', ');

    return {
      image: item.product?.file_items?.[0]?.file || '/images/placeholder.png', // Fallback image
      name: item.product?.title || item.title || 'Unknown Item',
      price: parseFloat(item.price || '0'),
      quantity: item.quantity || 1,
      attributes: attributes,
    };
  });

  // Create a HistoryCardProp object from the fetched order data
  const orderProp: HistoryCardProp = {
    id: orderData.uid,
    title: orderData.title || `Order #${orderData.uid.substring(0, 8)}`,
    items: mappedItems,
    price: parseFloat(orderData.total_amount || '0'),
    date: new Date(orderData.created_at),
    shipping_address: {
      name: typeof orderData.address === 'string' ? orderData.address : 'User', // Address might be string or obj
      email: 'user@example.com', // Placeholder or fetch from user
      location: typeof orderData.address === 'string' ? orderData.address : 'Location',
    },
    payment_details: {
      payment_method: 'Card', // Placeholder
      trx_id: orderData.payment_intent_id || 'N/A',
    },
    type: 'ORDER',
  };

  const selectedList = step == 1 ? mappedItems : selectedItems.map((index) => mappedItems[index]);

  const selectedOrderItems = selectedItems.map((index) => orderItems[index]);

  const handleNext = () => {
    if (selectedItems?.length === 0) {
      alert('First Select Items to Refund');
      return;
    }
    setStep(step === 1 ? 2 : step === 2 ? 3 : 3);
  };

  const handleConfirm = () => {
    setConfirmed(true);
  };

  return (
    <>
      <div className="container mb-12">
        <div className="grid gap-10 lg:grid-cols-[5fr_7fr]">
          {/* Left Column - Item Details */}
          <OrderItemDetails
            order={orderProp}
            isRefund={true}
            step={step}
            selectedList={selectedList}
          />

          {/* Right Column -  Items for refund */}
          <OrderItemsRefund
            toggleItem={toggleItem}
            handleNext={handleNext}
            handleConfirm={handleConfirm}
            selectedList={selectedList}
            setIssue={setIssue}
            issue={issue}
            setAdditionalMessage={setAdditionalMessage}
            additionalMessage={additionalMessage}
            step={step}
            selectedItems={selectedItems}
            selectedOrderItemsUid={selectedOrderItems.map((i) => i.uid)}
          />
        </div>
      </div>

      <ConfirmModal
        icon="happy_image"
        iconWidth={398}
        iconHeight={340}
        open={confirmed}
        setOpen={setConfirmed}
        title="Your refund is on its way"
        subTitle="You will be refunded with the default gateway soon. No need to return the product. Thank you."
      />
    </>
  );
}
