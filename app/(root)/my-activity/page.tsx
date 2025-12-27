import { Metadata } from 'next';
import ActivityList from './_components/activity-list';
import NavbarHeight from '@/components/shared/navbar-height';
import PageHeader from '@/components/shared/page-header';

export const metadata: Metadata = {
  title: 'My Activity',
};

const ActivityPage = () => {
  return (
    <div>
      <NavbarHeight />
      <PageHeader
        title="Check your complete history here…"
        subTitle="Every record stored and refreshed in real time!"
      />

      <ActivityList />
    </div>
  );
};

export default ActivityPage;
