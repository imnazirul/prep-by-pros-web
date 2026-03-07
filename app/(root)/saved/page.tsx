import NavbarHeight from '@/components/shared/navbar-height';
import PageHeader from '@/components/shared/page-header';
import { Metadata } from 'next';
import SavedPostList from './_components/saved-post-list';

export const metadata: Metadata = {
  title: 'My Saves',
};

const SavedPage = () => {
  return (
    <div>
      <NavbarHeight />
      <PageHeader title="Your saved collection" subTitle="Access your favorite content anytime" />
      <SavedPostList />
    </div>
  );
};

export default SavedPage;
