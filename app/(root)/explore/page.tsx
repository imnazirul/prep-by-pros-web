import { Metadata } from 'next';
import InstructorList from './_components/instructor-list';
import PageHeader from '@/components/shared/page-header';
import NavbarHeight from '@/components/shared/navbar-height';

export const metadata: Metadata = {
  title: 'Explore',
};

const ExplorePage = () => {
  return (
    <div>
      <NavbarHeight />
      <PageHeader
        title=" Find your best instructors here..."
        subTitle="For Baseball, Football to anything or any position!"
      />
      <InstructorList />
    </div>
  );
};

export default ExplorePage;
