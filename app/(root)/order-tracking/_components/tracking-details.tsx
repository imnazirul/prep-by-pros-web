'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import TrackingCard from './tracking-card';
import Icon, { IconName } from '@/lib/icon';
import { TrackingCardProp } from '@/lib/types';
import { Button, buttonVariants } from '@/components/ui/button';
import CustomSelectModal from '@/components/ui/custom-select-modal';
import { useRouter } from 'next/navigation';

const deliveryLog = [
  {
    icon: 'truck_delivery' as IconName,
    title: 'Waiting for delivery',
    location: 'Westheimer Rd. Santa Ana,',
    date: '15 May, 9:30',
    status: 'Expected',
  },
  {
    icon: 'product_loading' as IconName,
    title: 'Waiting at sorting line',
    location: 'Westheimer Rd. Santa Ana,',
    date: '13 May, 18:06',
    status: '',
  },
  {
    icon: 'trolley' as IconName,
    title: 'Departed from manufacturing',
    location: 'Westheimer Rd. Santa Ana,',
    date: '12 May, 7:24',
    status: '',
  },
];

const trackingCard: TrackingCardProp = {
  id: '#492KILAP2',
  status: 'ongoing' as const,
  from: 'Mongolia',
  to: 'Nepal',
  fromDate: '15 May 2025',
  toDate: '24 May 2025',
  progress: 3,
  sender: 'Balla Daniella',
  receiver: 'Vincze Nikolett',
};

export default function TrackingDetails() {
  const router = useRouter();
  const [reason, setReason] = useState('');

  const cancelButtonAction = () => {
    router.push(`/refund-cancellation?reason=${reason}`);
  };

  return (
    <>
      <div className="relative space-y-6">
        <TrackingCard
          {...trackingCard}
          isDetail={true}
          className="hover:bg-black-4"
        />

        {/* Delivery Log */}
        <div className="space-y-6">
          <h2 className="text-black-8 text-2xl">Delivery Log</h2>
          <div className="relative z-1 space-y-15">
            {/* Vertical line */}
            <div className="border-black-5 absolute top-px left-10 -z-1 h-full w-px border-r border-dashed"></div>

            {deliveryLog.map((log, index) => (
              <div key={index} className="flex gap-4">
                <div
                  className={cn(
                    buttonVariants({
                      variant: index == 0 ? 'secondary' : 'default',
                    }),
                    'size-20',
                    index !== 0 && 'border-[6px] border-[#DEE6E5]',
                  )}
                >
                  <Icon
                    name={log.icon}
                    height={32}
                    width={32}
                    className={index == 0 ? 'text-black-10' : 'text-white'}
                  />
                </div>
                <div className="flex-1 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1.5">
                      <h3 className="text-black-10 text-2xl font-medium">
                        {log.title}
                      </h3>
                      <p className="text-black-7 text-lg">{log.location}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-black-7 text-lg">{log.date}</div>
                      {log.status && (
                        <div className="text-black-6 text-sm">{log.status}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <CustomSelectModal
            label="Cancel Order"
            value={reason}
            setValue={setReason}
            buttonLabel="Confirm Cancelation"
            buttonAction={cancelButtonAction}
            options={[
              {
                label: 'Wouldn’t arrive in time',
                value: 'Wouldn’t arrive in time',
              },
              {
                label: 'Ordered wrong item or amount',
                value: 'Ordered wrong item or amount',
              },
              {
                label: 'Used wrong payment method',
                value: 'Used wrong payment method',
              },
              {
                label: 'Didn’t place this order',
                value: 'Didn’t place this order',
              },
            ]}
          >
            <Button
              size={'lg'}
              className="bg-black-10 hover:bg-black-12 h-12 text-white lg:px-23.25"
            >
              Cancel Order
            </Button>
          </CustomSelectModal>
        </div>
      </div>
    </>
  );
}
