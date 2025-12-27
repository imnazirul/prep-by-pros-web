'use client';

import { HistoryCardProp } from '@/lib/types';
import OrderItemDetails from '@/components/shared/order-item-details';
import OrderItemsRefund from './order-items-refund';
import { useState } from 'react';
import ConfirmModal from '@/components/shared/confirm-modal';

export default function OrderDetailsPage({
  order,
}: {
  order: HistoryCardProp;
}) {
  const [confirmed, setConfirmed] = useState(false);

  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [issue, setIssue] = useState('');

  const toggleItem = (index: number) => {
    setSelectedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const selectedList =
    step == 1 ? order.items : selectedItems.map((index) => order.items[index]);

  const handleNext = () => {
    if (selectedItems?.length === 0) {
      alert('First Select');
      return;
    }
    setStep(step === 1 ? 2 : step === 2 ? 3 : 3);

    if (step == 3) {
      setConfirmed(true);
    }
  };

  return (
    <>
      <div className="container mb-12">
        <div className="grid gap-10 lg:grid-cols-[5fr_7fr]">
          {/* Left Column - Item Details */}
          <OrderItemDetails
            order={order}
            isRefund={true}
            step={step}
            selectedList={selectedList}
          />

          {/* Right Column -  Items for refund */}
          <OrderItemsRefund
            toggleItem={toggleItem}
            handleNext={handleNext}
            selectedList={selectedList}
            setIssue={setIssue}
            issue={issue}
            step={step}
            selectedItems={selectedItems}
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
