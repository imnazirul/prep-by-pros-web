'use client';

import { Button, buttonVariants } from '@/components/ui/button';
import CustomSelectModal from '@/components/ui/custom-select-modal';
import Icon, { IconName } from '@/lib/icon';
import { TrackingCardProp } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useCancelOrderMutation, useGetOrderTrackingQuery } from '@/redux/api/authApi';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TrackingCard from './tracking-card';

interface TrackingDetailsProps {
  trackingUid: string;
}

export default function TrackingDetails({ trackingUid }: TrackingDetailsProps) {
  const router = useRouter();
  const [reason, setReason] = useState('');
  const { data: tracking, isLoading } = useGetOrderTrackingQuery(trackingUid);
  const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();

  const cancelButtonAction = () => {
    // This logic might need to be adjusted. The UI shows 'Cancel Order' but we might need to actually call the API.
    // The original code was pushing to a refund page with reason.
    // If we want to cancel directly here:
    // cancelOrder({ uid: tracking.order_uid, body: { cancel_reason: reason } });

    // OR if we keep the original flow:
    if (tracking) {
      router.push(`/refund-cancellation?orderId=${tracking.order_uid}&reason=${reason}`);
    }
  };

  if (isLoading || !tracking) {
    return <div>Loading details...</div>;
  }

  const trackingCardProp: TrackingCardProp = {
    id: tracking.order_id || tracking.order_uid,
    status:
      tracking.status === 'ON_GOING'
        ? 'ongoing'
        : tracking.status === 'COMPLETED'
          ? 'completed'
          : 'cancelled',
    from: tracking.from_country || 'Unknown',
    to: tracking.receiver_address?.country || 'Unknown',
    fromDate: tracking.created_at,
    toDate: tracking.estimated_delivery_date || 'Unknown',
    progress: tracking.status === 'COMPLETED' ? 4 : tracking.status === 'CANCELED' ? 1 : 2, // todo: dynamic progress
    sender: tracking.sender_name || 'Store',
    receiver: tracking.receiver_name || 'User',
  };

  // Map tracking events to delivery log
  const deliveryLog =
    tracking.tracking_events?.map((event) => {
      let icon: IconName = 'product_loading';
      switch (event.event_type) {
        case 'DEPARTED_FROM_MANUFACTURING':
          icon = 'product_loading';
          break;
        case 'WAITING_AT_SORTING_LINE':
          icon = 'tracking_box';
          break;
        case 'WAITING_FOR_DELIVERY':
          icon = 'truck_delivery';
          break;
        case 'DELIVERED':
          icon = 'checkmark_square';
          break;
        case 'CANCELED':
          icon = 'alert';
          break;
      }

      return {
        icon,
        title: event.event_type.replace(/_/g, ' '), // format string
        location: event.location || event.address || 'Unknown Location',
        date: event.event_type_occurred_at
          ? format(new Date(event.event_type_occurred_at), 'dd MMM, HH:mm')
          : '',
        status: '', // api doesn't seem to have per-event status text other than type
      };
    }) || [];

  return (
    <>
      <div className="relative space-y-6">
        <TrackingCard {...trackingCardProp} isDetail={true} className="hover:bg-black-4" />

        {/* Delivery Log */}
        <div className="space-y-6">
          <h2 className="text-black-10 text-2xl">Delivery Log</h2>
          {deliveryLog.length > 0 ? (
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
                      index !== 0 && 'border-[6px] border-[#DEE6E5]'
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
                        <h3 className="text-black-10 text-2xl font-medium uppercase">
                          {log.title}
                        </h3>
                        <p className="text-black-7 text-lg">{log.location}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-black-7 text-lg">{log.date}</div>
                        {log.status && <div className="text-black-6 text-sm">{log.status}</div>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-black-7">No tracking events available yet.</p>
          )}
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
                value: 'WOULD_NOT_ARRIVE_IN_TIME',
              },
              {
                label: 'Ordered wrong item or amount',
                value: 'ORDERED_WRONG_ITEM_OR_AMOUNT',
              },
              {
                label: 'Used wrong payment method',
                value: 'USED_WRONG_PAYMENT_METHOD',
              },
              {
                label: 'Didn’t place this order',
                value: 'DID_NOT_PLACE_THIS_ORDER',
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
