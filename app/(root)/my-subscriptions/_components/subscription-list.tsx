'use client';

import Icon from '@/lib/icon';
import { Button } from '@/components/ui/button';
import { InstructorCardProp } from '@/lib/types';
import { InstructorCard } from '@/components/shared/instructor-card';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const instructors: InstructorCardProp[] = [
  {
    id: 1,
    name: 'Jerome Parker',
    image: '/images/instructor/1.png',
    country: '/images/brazil.svg',
    verified: true,
    sports: 'Football',
    age: 57,
    position: 'GK, DF',
  },
  {
    id: 2,
    name: 'Jerome Parker',
    image: '/images/instructor/1.png',
    country: '/images/brazil.svg',
    verified: true,
    sports: 'Football',
    age: 57,
    position: 'GK, DF',
  },
  {
    id: 3,
    name: 'Jerome Parker',
    image: '/images/instructor/1.png',
    country: '/images/brazil.svg',
    verified: true,
    sports: 'Football',
    age: 57,
    position: 'GK, DF',
  },
  {
    id: 4,
    name: 'Jerome Parker',
    image: '/images/instructor/1.png',
    country: '/images/brazil.svg',
    verified: true,
    sports: 'Football',
    age: 57,
    position: 'GK, DF',
  },
  {
    id: 5,
    name: 'Jerome Parker',
    image: '/images/instructor/1.png',
    country: '/images/brazil.svg',
    verified: true,
    sports: 'Football',
    age: 57,
    position: 'GK, DF',
  },
  {
    id: 6,
    name: 'Jerome Parker',
    image: '/images/instructor/1.png',
    country: '/images/brazil.svg',
    verified: true,
    sports: 'Football',
    age: 57,
    position: 'GK, DF',
  },
  {
    id: 7,
    name: 'Jerome Parker',
    image: '/images/instructor/1.png',
    country: '/images/brazil.svg',
    verified: true,
    sports: 'Football',
    age: 57,
    position: 'GK, DF',
  },
  {
    id: 8,
    name: 'Jerome Parker',
    image: '/images/instructor/1.png',
    country: '/images/brazil.svg',
    verified: true,
    sports: 'Football',
    age: 57,
    position: 'GK, DF',
  },
  {
    id: 9,
    name: 'Jerome Parker',
    image: '/images/instructor/1.png',
    country: '/images/brazil.svg',
    verified: true,
    sports: 'Football',
    age: 57,
    position: 'GK, DF',
  },
  {
    id: 10,
    name: 'Jerome Parker',
    image: '/images/instructor/1.png',
    country: '/images/brazil.svg',
    verified: true,
    sports: 'Football',
    age: 57,
    position: 'GK, DF',
  },
];

const SubscriptionList = () => {
  const [view, setView] = useState<'GRID' | 'LIST'>('GRID');

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

      <div
        className={cn(
          'mb-10 grid gap-4',
          view === 'GRID'
            ? 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
            : 'md:grid-cols-2 lg:grid-cols-3',
        )}
      >
        {instructors.map((instructor) => (
          <InstructorCard
            view_type={view}
            key={instructor.id}
            instructor={instructor}
          />
        ))}
      </div>
    </section>
  );
};

export default SubscriptionList;
