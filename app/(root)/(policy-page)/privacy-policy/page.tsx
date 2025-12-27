import Icon from '@/lib/icon';
import { Metadata } from 'next';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

const data = {
  title: 'Privacy Policy',
  last_update: new Date(),
  description:
    'At Prep by Pros, your privacy is important to us. This policy explains what information we collect, how we use it, and how we keep it safe.',
  content: `
  <h3>1. Information We Collect</h3>
  <p>
   We collect basic info like your name, email, device data, and activity in the app (e.g. videos watched or products viewed.
  </p>
  <h3>2. Account Security</h3>
  <p>
   We protect your personal information using encryption and secure storage. Never share your password with others.
  </p>
  <h3>3. Payments & Subscriptions</h3>
  <p>
   Payment details are processed securely by trusted third-party services like Apple or Google. We don’t store credit card info.
  </p>
  <h3>4. Children's Privacy</h3>
  <p>
   Users must be 13 or older. We don’t knowingly collect data from children under this age.
  </p>
  <h3>5. Email & Notifications</h3>
  <p>
   We may send you service updates or promotions. You can unsubscribe at any time through the link in the email.
  </p>
  <h3>6. Changes to This Policy</h3>
  <p>
  We may update this policy when needed. We’ll notify you of any major changes in the app or via email.
  </p>
  <h3>7. Data Access by Admins</h3>
  <p>
   Super admins and moderators may access user activity data only to monitor content and maintain quality and safety.
  </p>
`,
};

const PrivacyPolicyPage = () => {
  return (
    <div className="space-y-8 text-base md:space-y-10">
      <div>
        <h2 className="text-black-10 text-[1.75rem] font-semibold">
          {data.title}
        </h2>
        <div className="mt-2 mb-4.5 flex items-center gap-2">
          <Icon
            name="date_time"
            height={20}
            width={20}
            className="text-[#90AB9A]"
          />
          <span className="text-base text-[#90AB9A]">
            Last updated on {format(data.last_update, 'dd MMMM, yyyy')}
          </span>
        </div>
        <p className="text-black-7 text-2xl">{data.description}</p>
      </div>
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </div>
  );
};

export default PrivacyPolicyPage;
