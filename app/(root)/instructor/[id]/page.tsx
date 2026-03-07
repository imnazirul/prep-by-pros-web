import PostList from '@/components/shared/post-list';
import PageHeader from '@/components/shared/page-header';
import NavbarHeight from '@/components/shared/navbar-height';
import InstructorDetails from '@/components/shared/instructor-details';

type ParamsProps = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: ParamsProps) => {
  const { id } = await params;

  return (
    <div>
      <NavbarHeight />
      <PageHeader
        title="Find your best instructors here..."
        subTitle="For Baseball, Football to anything or any position!"
      />

      <div className="container">
        <div className="grid gap-7 md:grid-cols-[4fr_8fr] md:gap-10">
          <InstructorDetails slug={id} />
          <PostList />
        </div>
      </div>
    </div>
  );
};

export default page;
