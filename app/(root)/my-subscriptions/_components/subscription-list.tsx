'use client';

import { Button } from '@/components/ui/button';
import Icon from '@/lib/icon';
import { cn } from '@/lib/utils';
import { Subscription, useGetSubscriptionsQuery } from '@/redux/api/authApi';
import { useEffect, useState } from 'react';
import { SubscriptionCard } from './subscription-card';

const SubscriptionList = () => {
  const [view, setView] = useState<'GRID' | 'LIST'>('GRID');
  const { data: subscriptionsData, isLoading } = useGetSubscriptionsQuery();
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch by only rendering content after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <section className="container">
      <div className="mb-6 flex items-center justify-between gap-2">
        <h3 className="text-black-10 text-2xl font-medium md:text-3xl lg:text-4xl">
          My Subscriptions
        </h3>
        <Button
          variant="secondary"
          className="px-8"
          onClick={() => setView(view === 'GRID' ? 'LIST' : 'GRID')}
        >
          <Icon
            name={view === 'GRID' ? 'grid_view' : 'left_to_right_list_bullet'}
            height={24}
            width={24}
            className="text-black-8"
          />
          {view === 'GRID' ? 'Grid View' : 'List View'}
        </Button>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div
          className={cn(
            'mb-10 grid gap-4',
            view === 'GRID'
              ? 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
              : 'md:grid-cols-2 lg:grid-cols-3'
          )}
        >
          {subscriptionsData?.results?.map((sub: Subscription) => (
            <SubscriptionCard view_type={view} key={sub.uid} subscription={sub} />
          ))}
          {subscriptionsData?.results?.length === 0 && (
            <div className="col-span-full text-center text-gray-500">No subscriptions found.</div>
          )}
        </div>
      )}
    </section>
  );
};

export default SubscriptionList;
