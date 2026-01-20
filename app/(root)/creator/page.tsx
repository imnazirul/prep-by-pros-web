import { HotDeals } from '../_components/hot-deals';
import { HeroSection } from '../_components/hero-section';
import AnalyticsDashboard from './_components/analytics-dashboard';

const CreatorHomePage = () => {
  return (
    <>
      <HeroSection />
      <div className="grid gap-10 py-10 lg:py-18">
        <AnalyticsDashboard />
        <HotDeals />
      </div>
    </>
  );
};

export default CreatorHomePage;
