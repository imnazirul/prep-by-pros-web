import Link from 'next/link';
import Image from 'next/image';
import CustomImage from './custom-image';
import { InstructorCardProp } from '@/lib/types';

export function InstructorCard({
  instructor,
  view_type = 'GRID',
}: {
  instructor: InstructorCardProp;
  view_type?: 'GRID' | 'LIST';
}) {
  return (
    <>
      {view_type === 'GRID' ? (
        <Link
          href={`/instructor/${instructor.id}`}
          className="group bg-card relative aspect-342/451 cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-xl md:rounded-3xl"
        >
          <div className="relative size-full overflow-hidden">
            <CustomImage
              fill
              src={instructor.image}
              alt={instructor.name}
              className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 flex size-full flex-col justify-between bg-[linear-gradient(181deg,rgba(36,85,80,0.00)_28.43%,#173633_76.66%)] p-5">
              <div className="flex items-center justify-between">
                <Image
                  height={32}
                  width={32}
                  src={instructor.country}
                  alt="Country"
                />
                <Image
                  height={44}
                  width={44}
                  src={'/images/toronto.png'}
                  alt="Toronto"
                />
              </div>

              {/* Instructor info overlay */}
              <div>
                <h3 className="mb-4 text-center text-2xl font-semibold text-white md:text-[32px]">
                  {instructor.name}
                </h3>

                <div className="grid grid-cols-3 gap-4.5 text-center">
                  <div>
                    <div className="mb-1 text-sm text-[#B0C6BA]">Sports</div>
                    <div className="text-xl font-medium text-white">
                      {instructor.sports}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-sm text-[#B0C6BA]">Age</div>
                    <div className="text-xl font-medium text-white">
                      {instructor.age}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-sm text-[#B0C6BA]">Position</div>
                    <div className="text-xl font-medium text-white">
                      {instructor.position}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ) : (
        <Link
          href={`/instructor/${instructor.id}`}
          className="group bg-black-4 relative flex cursor-pointer flex-col gap-5 overflow-hidden rounded-[20px] p-4 transition-all duration-300 hover:shadow-xl sm:flex-row sm:items-center"
        >
          <div className="relative size-25 shrink-0 overflow-hidden rounded-xl">
            <CustomImage
              fill
              src={instructor.image}
              alt={instructor.name}
              className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="flex flex-1 shrink-0 items-start justify-between">
            <div>
              <h3 className="text-black-9 line-clamp-1 text-2xl">
                {instructor.name}
              </h3>

              <div className="mt-1.5 mb-3.5 flex items-center gap-2.5">
                <Image
                  height={32}
                  width={32}
                  src={instructor.country}
                  alt="Country"
                  className="h-auto"
                />
                <span className="text-black-7 text-base">Coche</span>
              </div>

              <p className="text-black-7 text-sm">
                Age: <span className="text-black-8">{instructor.age}</span>
              </p>
            </div>
            <Image
              height={44}
              width={44}
              src={'/images/toronto.png'}
              alt="Toronto"
            />
          </div>
        </Link>
      )}
    </>
  );
}
