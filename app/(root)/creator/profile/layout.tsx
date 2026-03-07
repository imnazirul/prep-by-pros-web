import InstructorDetails from '@/components/shared/instructor-details';
import NavbarHeight from '@/components/shared/navbar-height';
import PageHeader from '@/components/shared/page-header';
import { ReactNode } from 'react';

const ProfileLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="pb-10">
      <NavbarHeight />
      <PageHeader
        title="Welcome to your timeline..."
        subTitle="Mange your profile or uploads from here..."
      />

      <div className="container">
        <div className="grid gap-7 lg:grid-cols-[5fr_7fr] xl:grid-cols-[4fr_8fr] md:gap-10">
          <InstructorDetails />
          {children}
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
