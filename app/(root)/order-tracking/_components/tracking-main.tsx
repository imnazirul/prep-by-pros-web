'use client';

import PageHeader from '@/components/shared/page-header';
import { useGetAllOrderTrackingQuery } from '@/redux/api/authApi';
import { useEffect, useState } from 'react';
import TrackingDetails from './tracking-details';
import TrackingEmpty from './tracking-empty';
import TrackingList from './tracking-list';

export default function TrackingMain() {
  const { data: trackingsResponse, isLoading } = useGetAllOrderTrackingQuery();
  const trackings = trackingsResponse?.results || [];
  const [selectedTrackingUid, setSelectedTrackingUid] = useState<string | null>(null);

  useEffect(() => {
    if (trackings.length > 0 && !selectedTrackingUid) {
      setSelectedTrackingUid(trackings[0].uid);
    }
  }, [trackings, selectedTrackingUid]);

  if (isLoading) {
    return <div>Loading...</div>; // Or a skeleton loader
  }

  const isEmpty = trackings.length === 0;

  if (isEmpty) {
    return <TrackingEmpty />;
  }

  const selectedTracking = trackings.find((t) => t.uid === selectedTrackingUid) || trackings[0];

  return (
    <>
      <PageHeader
        title="Track your order status here…"
        subTitle="Updates appear in real time as it moves!"
      />

      <div className="container mb-10">
        <div className="grid gap-8 lg:gap-10 xl:grid-cols-12">
          <div className="xl:col-span-5">
            <h3 className="text-black-10 mb-6 text-2xl font-medium md:text-3xl lg:w-4xl">
              Tracking Order Summary
            </h3>
            <TrackingList
              trackings={trackings}
              selectedTrackingUid={selectedTrackingUid}
              onSelect={setSelectedTrackingUid}
            />
          </div>
          <div className="xl:col-span-7">
            <h3 className="text-black-10 mb-6 text-2xl font-medium md:text-3xl lg:w-4xl">
              Order ID: #
              {selectedTracking?.order_id || selectedTracking?.uid?.substring(0, 8).toUpperCase()}
            </h3>
            {selectedTrackingUid && <TrackingDetails trackingUid={selectedTrackingUid} />}
          </div>
        </div>
      </div>
    </>
  );
}
