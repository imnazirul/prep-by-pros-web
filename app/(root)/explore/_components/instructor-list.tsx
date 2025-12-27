import { InstructorCardProp } from '@/lib/types';
import InstructorFilters from './instructor-filters';
import { InstructorCard } from '@/components/shared/instructor-card';

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

const InstructorList = () => {
  return (
    <section>
      <div className="container">
        <InstructorFilters />

        <div className="mb-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {instructors.map((instructor) => (
            <InstructorCard key={instructor.id} instructor={instructor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstructorList;
