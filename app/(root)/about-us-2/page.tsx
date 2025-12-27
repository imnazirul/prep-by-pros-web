import { Metadata } from 'next';
import NavbarHeight from '@/components/shared/navbar-height';

export const metadata: Metadata = {
  title: 'About Us',
};

const aboutData = `<h2>What is Prep by Pros</h2>
<p>
  Prep by Pros is a powerful all-in-one platform designed to bridge the gap
  between professional athletes, coaches, and the next generation of players.
  At its core, the app allows athletes to share their knowledge, experience,
  and training routines through exclusive, paid video content.
</p>

<p>
  Whether you're a rising star looking to improve your performance or a fan
  wanting a closer look into a pro's mindset, Prep by Pros delivers that
  connection. But it doesn't stop at training. The platform also includes a curated
  marketplace where stakeholders and partners can sell high-quality sports
  equipment, clothing, and performance tools. This makes Prep by Pros not just
  a learning space, but a complete ecosystem for athletic growth and
  development.
</p>

<img
  src="/images/about.png"
  alt="Football training session"
/>
<h2>How It Works</h2>

<p>
  The app works by allowing professional coaches and athletes to upload
  exclusive content—ranging from motivational talks to technique drills and
  game insights. These videos are monitored and approved by platform admins to
  ensure top-quality and meaningful instruction.
</p>

<p>
  Users can browse through a range of profiles, subscribe to the pros they
  connect with most, and gain access to premium content that helps them train
  smarter and stay inspired. Subscriptions are handled through a secure
  payment system, offering a seamless experience for both creators and
  learners.
</p>

<p>
  In addition, the built-in marketplace allows verified stakeholders to sell
  sports gear directly through the app. Whether it's apparel, accessories, or
  training tools, users can find what they need to elevate their
  performance—all within the same platform.
</p>

<h2>Our Mission</h2>

<p>
  At Prep by Pros, we believe that access to professional-level training,
  mentorship, and equipment shouldn't be limited by geography or opportunity.
  Our mission is to break down those barriers and make elite sports education
  and resources available to athletes everywhere.
</p>

<p>
  By combining expert content, community interaction, and e-commerce in one
  place, we're creating a space where athletes of all levels can grow, get
  motivated, and take their game to the next level. From the locker room to
  the living room, from practice fields to digital screens—Prep by Pros is
  here to support every athlete's journey.
</p>
`;

const AboutUSPage = () => {
  return (
    <div>
      <NavbarHeight />

      <div className="container py-10 md:columns-2 md:gap-10 md:py-12 lg:py-20">
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: aboutData }}
        />
      </div>
    </div>
  );
};

export default AboutUSPage;
