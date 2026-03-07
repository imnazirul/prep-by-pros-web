import NavbarHeight from '@/components/shared/navbar-height';
import PageHeader from '@/components/shared/page-header';
import { Metadata } from 'next';
import GlobalContentList from './_components/global-content-list';

export const metadata: Metadata = {
  title: 'My Feed',
};

const FeedPage = () => {
  return (
    <div>
      <NavbarHeight />
      <PageHeader title="All Feeds" subTitle="" />
      <div className="container">
        <GlobalContentList />
      </div>
    </div>
  );
};

export default FeedPage;
