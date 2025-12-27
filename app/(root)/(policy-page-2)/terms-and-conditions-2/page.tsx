import Icon from '@/lib/icon';
import { Metadata } from 'next';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
};

const data = {
  title: 'Terms and Conditions',
  last_update: new Date(),
  description:
    'Welcome to Prep by Pros! These Terms and Conditions govern your access and use of the Prep by Pros mobile application and any related services provided by us.',
  content: `
  <h3>1. User Types</h3>
  <p>
   Players subscribe to access exclusive training and motivational videos. Coaches create and upload content, which is reviewed and approved by our super admins to maintain quality.
  </p>
  <h3>2. Account Registration</h3>
  <p>
   You must be at least 13 years old to register. Please provide accurate information and keep your login details secure to protect your account.
  </p>
  <h3>3. Content Guidelines</h3>
  <p>
   All coach-uploaded videos are monitored for quality and compliance. Content that is offensive, illegal, or violates others’ rights will be removed without notice.
  </p>
  <h3>4. Subscriptions and Payments</h3>
  <p>
   Players pay to subscribe for full access to content. All payments are final unless required by law. You control your subscription settings within the app.
  </p>
  <h3>5. Marketplace Sales</h3>
  <p>
   Our app lets you buy sports gear and apparel from trusted vendors. While we vet sellers, we aren’t responsible for shipping delays, quality issues, or warranties.
  </p>
  <h3>6. Intellectual Property</h3>
  <p>
   All app content, branding, and designs belong to Prep by Pros or our partners. You may not use or copy them without our permission.
  </p>
  <h3>7. User Conduct</h3>
  <p>
   Please use the app respectfully. Avoid illegal activities, impersonation, hacking, or anything that disrupts the community or service.
  </p>
  <h3>8. Changes to Terms</h3>
  <p>
    We may update these terms at any time. Continued use of the app means you accept the new terms. Please check back regularly.
  </p>
`,
};

const TermsAndConditionsPage = () => {
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
        className="prose md:columns-2 md:gap-9"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </div>
  );
};

export default TermsAndConditionsPage;
