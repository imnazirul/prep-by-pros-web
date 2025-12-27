import NavbarHeight from '@/components/shared/navbar-height';
import PageHeader from '@/components/shared/page-header';
import PaymentList from './_components/payment-list';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment History',
};

const PaymentPage = () => {
  return (
    <div>
      <NavbarHeight />
      <PageHeader
        title="View your payment history here…"
        subTitle="All transactions updated automatically!"
      />
      <PaymentList />
    </div>
  );
};

export default PaymentPage;
