import { HotDeals } from './_components/hot-deals';
import { HeroSection } from './_components/hero-section';
import { ExclusiveDrops } from './_components/exclusive-drops';
import { TrendingSessions } from './_components/trending-sessions';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <div className="space-y-11">
        <ExclusiveDrops />
        <TrendingSessions />
        <HotDeals />
      </div>
    </>
  );
};

export default HomePage;
