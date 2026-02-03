'use client';

import React, { useState } from 'react';
import { InstructorCardProp } from '@/lib/types';
import InstructorFilters from './instructor-filters';
import { InstructorCard } from '@/components/shared/instructor-card';
import { useGetCoachesQuery } from '@/redux/api/globalApi';
import Circle3DLoader from '@/components/shared/circle-loader';

const InstructorList = () => {
  const [filters, setFilters] = useState<{
    country?: string;
    gender?: string;
    level?: string;
  }>({});

  const { data, isLoading, error } = useGetCoachesQuery({
    country: filters.country || undefined,
    gender: filters.gender || undefined,
    userprofessionallevelconnector__professional_level__slug: filters.level || undefined,
  });

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Circle3DLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center text-red-500">
        Error loading instructors.
      </div>
    );
  }

  const instructors: InstructorCardProp[] =
    data?.results.map((coach) => ({
      id: coach.uid,
      slug: coach.slug,
      name: `${coach.first_name} ${coach.last_name}`,
      image: coach.image || '/images/instructor/1.png',
      country: coach.club?.[0]?.title ? '/images/brazil.svg' : '/images/brazil.svg', // Default for now
      verified: true,
      sports: coach.sports?.[0]?.title || 'Multi-Sports',
      age: coach.age || 0,
      position: coach.position?.[0]?.title || 'Coach',
    })) || [];

  return (
    <section>
      <div className="container">
        <InstructorFilters filters={filters} setFilters={setFilters} />

        <div className="mb-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {instructors.length > 0 ? (
            instructors.map((instructor) => (
              <InstructorCard key={instructor.id} instructor={instructor} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-500">
              No instructors found matching these filters.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InstructorList;
