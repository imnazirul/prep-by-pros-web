import NavbarHeight from '@/components/shared/navbar-height';
import PageHeader from '@/components/shared/page-header';
import React from 'react';
import PostList from './_components/post-list';
import InstructorDetails from './_components/instructor-details';

const page = () => {
  return (
    <div>
      <NavbarHeight />
      <PageHeader
        title="Find your best instructors here..."
        subTitle="For Baseball, Football to anything or any position!"
      />

      <div className="container">
        <div className="grid gap-7 md:grid-cols-[4fr_8fr] md:gap-10">
          <InstructorDetails isSubscribe={true} />
          <PostList />
        </div>
      </div>
    </div>
  );
};

export default page;
