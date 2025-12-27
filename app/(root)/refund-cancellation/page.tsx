import { Metadata } from 'next';
import PageHeader from '@/components/shared/page-header';
import RefundDetails from './_components/refund-details';
import NavbarHeight from '@/components/shared/navbar-height';

export const metadata: Metadata = {
  title: 'Refund after cancellation',
};

const RefundCancellationPage = () => {
  return (
    <div>
      <NavbarHeight />
      <PageHeader
        title="Check your refund status here…"
        subTitle="Updates appear automatically after cancellation!"
      />

      <div className="mb-10">
        <RefundDetails />
      </div>
    </div>
  );
};

export default RefundCancellationPage;
