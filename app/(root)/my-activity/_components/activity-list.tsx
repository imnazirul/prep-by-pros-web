'use client';

import Icon from '@/lib/icon';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ActivityCard from '@/components/shared/activity-card';
import { ActivityProp } from '@/lib/types';

const activityList: ActivityProp[] = [
  {
    id: 1,
    category: 'Marathon',
    views: '23M',
    image:
      'https://images.unsplash.com/photo-1695203063441-9042bcecbdf3?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    id: 2,
    category: 'Football',
    views: '18M',
    image:
      'https://images.unsplash.com/photo-1434648957308-5e6a859697e8?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    category: 'Basketball',
    views: '15M',
    image:
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    id: 4,
    category: 'Cycling',
    views: '12M',
    image:
      'https://images.unsplash.com/photo-1508780709619-79562169bc64?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    id: 5,
    category: 'Swimming',
    views: '10M',
    image:
      'https://images.unsplash.com/photo-1560089000-7433a4ebbd64?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 6,
    category: 'Yoga',
    views: '9M',
    image:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    id: 7,
    category: 'Cricket',
    views: '21M',
    image:
      'https://images.unsplash.com/photo-1593766788306-28561086694e?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    id: 8,
    category: 'Gym Training',
    views: '17M',
    image:
      'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 9,
    category: 'Tennis',
    views: '11M',
    image:
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 10,
    category: 'Boxing',
    views: '8M',
    image:
      'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    id: 11,
    category: 'Hiking',
    views: '14M',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    id: 12,
    category: 'Surfing',
    views: '7M',
    image:
      'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
  {
    id: 13,
    category: 'Badminton',
    views: '6M',
    image:
      'https://images.unsplash.com/photo-1722087642932-9b070e9a066e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 14,
    category: 'Rowing',
    views: '5M',
    image:
      'https://images.unsplash.com/photo-1697242877038-6213aa0822d9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 15,
    category: 'Skateboarding',
    views: '9M',
    image:
      'https://images.unsplash.com/photo-1602878714398-b28d40926846?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 16,
    category: 'Yoga',
    views: '9M',
    image:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0',
  },
];

const ActivityList = () => {
  const [tab, setTab] = useState<'History' | 'Saves' | 'Downloads'>('History');

  return (
    <section>
      <div className="container">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {[
                {
                  label: 'History',
                  type: 'History',
                },
                {
                  label: 'Saves',
                  type: 'Saves',
                },
                {
                  label: 'Downloads',
                  type: 'Downloads',
                },
              ].map(({ label, type }) => (
                <Button
                  key={label}
                  type="button"
                  onClick={() =>
                    setTab(type as 'History' | 'Saves' | 'Downloads')
                  }
                  variant={'secondary'}
                  className={cn(
                    tab === type
                      ? 'bg-black-10 hover:bg-black-10/90 font-semibold text-white'
                      : 'font-normal',
                  )}
                >
                  {label}
                </Button>
              ))}
            </div>

            <Button variant={'secondary'} className="font-normal">
              <Icon height={24} width={24} name="filter_vertical" />
              Filter by
            </Button>
          </div>

          <div className="mb-10 gap-4 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5">
            {activityList.map((acitivty) => (
              <ActivityCard
                className="mb-4"
                key={acitivty.id}
                acitivty={acitivty}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivityList;
