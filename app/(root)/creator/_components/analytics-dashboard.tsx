'use client';

import ContentSessionsList from './content-sessions-list';
import NewSubscriber from './new-subscriber';
import TotalEarning from './total-earning';
import TotalEngagement from './total-engagement';
import TotalViewsRadial from './total-views-radial';
import UpcomingVideo from './upcoming-video';

export default function AnalyticsDashboard() {
  return (
    <div className="container">
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="hidden 2xl:col-span-8 2xl:block">
          <h1 className="text-black-12 text-2xl font-medium md:text-[32px]">Monthly analytics</h1>
        </div>

        {/* UPCOMING VIDEO */}
        <UpcomingVideo className="lg:col-span-12 2xl:col-span-4 2xl:row-span-3" />

        <div className="lg:col-span-12 2xl:hidden">
          <h1 className="text-black-12 text-2xl font-medium md:text-[32px]">Monthly analytics</h1>
        </div>

        {/* Total Earnings Card */}
        <TotalEarning className="h-101 lg:col-span-8 2xl:col-span-5" />

        {/* Total Views (Radial) */}
        <TotalViewsRadial isDashboard={false} className="h-101 lg:col-span-4 2xl:col-span-3" />

        {/* New Subscriber (Double Line) */}
        <NewSubscriber className="h-101 lg:col-span-4 2xl:col-span-3" />

        {/* Total Engagement (Bar Chart) */}
        <TotalEngagement className="h-101 lg:col-span-8 2xl:col-span-5" />

        {/* Recent Content Sessions */}
        <ContentSessionsList className="lg:col-span-12" />
      </div>
    </div>
  );
}
