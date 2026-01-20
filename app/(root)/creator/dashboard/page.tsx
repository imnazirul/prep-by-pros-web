import NavbarHeight from '@/components/shared/navbar-height';
import PageHeader from '@/components/shared/page-header';
import TotalEarning from '../_components/total-earning';
import TotalViewsRadial from '../_components/total-views-radial';
import NewSubscriber from '../_components/new-subscriber';
import TotalEngagement from '../_components/total-engagement';

const CreatorHomePage = () => {
  return (
    <div className="pb-10">
      <NavbarHeight />
      <PageHeader
        title="Your performance, simplified…"
        subTitle="Track your performance, earnings in one place..."
      />

      <div className="container grid gap-4 xl:grid-cols-12">
        {/* Total Earnings Card */}
        <TotalEarning className="xl:col-span-7" />

        {/* Total Views (Radial) */}
        <TotalViewsRadial isDashboard={true} className="xl:col-span-5" />

        {/* New Subscriber (Double Line) */}
        <NewSubscriber className="xl:col-span-5" />

        {/* Total Engagement (Bar Chart) */}
        <TotalEngagement className="xl:col-span-7" />
      </div>
    </div>
  );
};

export default CreatorHomePage;
