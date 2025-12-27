import Icon from '@/lib/icon';
import { Metadata } from 'next';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'Refund Policy',
};

const data = {
  title: 'Refund Policy',
  last_update: new Date(),
  description:
    'At Prep by Pros, we aim to provide high-quality training content and a seamless user experience. Please read our refund policy carefully before making any purchases.',
  content: `
  <h3>1. Subscription Refunds</h3>
  <p>
   All subscriptions are non-refundable. You can cancel anytime, and you'll keep access until the end of your billing cycle.
  </p>
  <h3>2. Marketplace Purchases</h3>
  <p>
   Refunds for physical products depend on the individual seller’s policy. We are not responsible for shipping or product issues.
  </p>
  <h3>3. Technical Issues</h3>
  <p>
   If paid content isn’t working, contact us within 7 days. We’ll try to fix it or offer credit if needed.
  </p>
  <h3>4. Unauthorized Charges</h3>
  <p>
  Think you were charged by mistake? Let us know right away so we can investigate and help.
  </p>
  <h3>5. Delayed Content Access</h3>
  <p>
   If your subscription didn’t unlock content as expected, let us know. We’ll fix it or compensate accordingly.
  </p>
  <h3>6. Refund Timeframe</h3>
  <p>
  Approved refunds may take 5–10 business days to appear in your account, depending on your bank or payment provider.
  </p>
  <h3>7. Promo Codes & Discounts</h3>
  <p>
   Refunds do not include the value of any promotional codes or discounts applied at checkout.
  </p>
`,
};

const RefundPolicyPage = () => {
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

export default RefundPolicyPage;
