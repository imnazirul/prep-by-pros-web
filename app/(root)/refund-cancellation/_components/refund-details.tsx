'use client';

import { useState } from 'react';
import RefundItems from './refund-items';
import { HistoryCardProp } from '@/lib/types';
import RefundForm from './refund-form';

const order: HistoryCardProp = {
  id: 1,
  title: 'Subscribed to J. Parker',
  price: 58.0,
  type: 'ORDER',
  date: new Date('24 May 2025'),
  items: [
    {
      image:
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Signed  Sweatshirt (3x)',
    },
    {
      image:
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Fan Made Cap (2x)',
    },
    {
      image:
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      name: 'Vintage Tracksuit',
    },
  ],
  shipping_address: {
    name: 'Andrew Whierholze',
    email: 'andrewhierholze@gmail.com',
    location: 'New York',
  },
  payment_details: {
    payment_method: 'Cash on Delivery',
    trx_id: '93DJ2231ADD35672D',
  },
};

export type StepProp = 1 | 2 | 3;

const RefundDetails = () => {
  const [step, setStep] = useState<StepProp>(1);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

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
    setStep(step === 1 ? 2 : 2);
  };

  return (
    <div className="container">
      <div className="grid gap-10 lg:grid-cols-[5fr_7fr]">
        <RefundItems
          selectedItems={selectedItems}
          toggleItem={toggleItem}
          selectedList={selectedList}
          step={step}
        />

        <RefundForm step={step} handleNext={handleNext} />
      </div>
    </div>
  );
};

export default RefundDetails;
