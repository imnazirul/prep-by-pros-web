'use client';

import Circle3DLoader from '@/components/shared/circle-loader';
import { InstructorCard } from '@/components/shared/instructor-card';
import { InstructorCardProp } from '@/lib/types';
import { useGetCoachesQuery } from '@/redux/api/globalApi';
import { useState } from 'react';
import InstructorFilters from './instructor-filters';

const InstructorList = () => {
  const [filters, setFilters] = useState<{
    country?: string;
    gender?: string;
    level?: string;
    ordering?: string;
  }>({});

  const { data, isLoading, error } = useGetCoachesQuery({
    country: filters.country || undefined,
    gender: filters.gender || undefined,
    userprofessionallevelconnector__professional_level__slug: filters.level || undefined,
    ordering: filters.ordering || undefined,
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
      <div className="flex h-96 flex-col items-center justify-center p-10">
        <div className="text-red-500 font-bold mb-4">Error loading instructors.</div>
        <pre className="bg-gray-100 p-4 rounded text-sm text-left overflow-auto max-w-full">
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    );
  }

  const instructors: InstructorCardProp[] =
    data?.results.map((coach) => ({
      id: coach.uid,
      slug: coach.slug,
      name: [coach.first_name, coach.last_name].filter(Boolean).join(' '),
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
