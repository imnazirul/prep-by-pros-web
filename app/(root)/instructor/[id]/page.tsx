import PostList from '@/components/shared/post-list';
import PageHeader from '@/components/shared/page-header';
import NavbarHeight from '@/components/shared/navbar-height';
import InstructorDetails from '@/components/shared/instructor-details';

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
