import PostList from './_components/post-list';
import NavbarHeight from '@/components/shared/navbar-height';
import PageHeader from '@/components/shared/page-header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Feed',
};

const FeedPage = () => {
  return (
    <div>
      <NavbarHeight />
      <PageHeader
        title="Find your best workout instructions here..."
        subTitle="Updates each week on Sunday!"
      />
      <PostList />
    </div>
  );
};

export default FeedPage;
