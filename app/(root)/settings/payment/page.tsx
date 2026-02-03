import NavbarHeight from '@/components/shared/navbar-height';
import PageHeader from '@/components/shared/page-header';
import { Metadata } from 'next';
import PaymentList from '../../payment-history/_components/payment-list';

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
