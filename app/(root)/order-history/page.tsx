import NavbarHeight from '@/components/shared/navbar-height';
import PageHeader from '@/components/shared/page-header';
import OrderList from './_components/order-list';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order History',
};

const OrdersPage = () => {
  return (
    <div>
      <NavbarHeight />
      <PageHeader
        title="Check all your previous purchases here..."
        subTitle="Mange refund or repurchase easily!"
      />
      <OrderList />
    </div>
  );
};

export default OrdersPage;
