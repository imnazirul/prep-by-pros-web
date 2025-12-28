import { Metadata } from 'next';
import TrackingList from './_components/tracking-list';
import PageHeader from '@/components/shared/page-header';
import TrackingEmpty from './_components/tracking-empty';
import TrackingDetails from './_components/tracking-details';
import NavbarHeight from '@/components/shared/navbar-height';

export const metadata: Metadata = {
  title: 'Order Tracking',
};

export default function TrackingPage() {
  const isEmpty = false;

  return (
    <div>
      <NavbarHeight />

      {isEmpty ? (
        <TrackingEmpty />
      ) : (
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
                <TrackingList />
              </div>
              <div className="xl:col-span-7">
                <h3 className="text-black-10 mb-6 text-2xl font-medium md:text-3xl lg:w-4xl">
                  Order ID: #492KILAP2
                </h3>
                <TrackingDetails />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
