import NavbarHeight from '@/components/shared/navbar-height';
import PageHeader from '@/components/shared/page-header';
import { Metadata } from 'next';
import SubscriptionList from './_components/subscription-list';

export const metadata: Metadata = {
  title: 'My Subscription',
};

const SubscriptionPage = () => {
  return (
    <div>
      <NavbarHeight />
      <PageHeader
        title="View all your active subscriptions here…"
        subTitle={`Plans and renewal details updated automatically!`}
      />

      <SubscriptionList />
    </div>
  );
};

export default SubscriptionPage;
