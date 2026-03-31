import NavbarHeight from '@/components/shared/navbar-height';
import PageHeader from '@/components/shared/page-header';
import { Metadata } from 'next';
import OrderDetailsPage from './_components/order-details';

type ParamsProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: ParamsProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Refund Order #${id.slice(0, 8)}`,
  };
}

const OrdersDetailsPage = async ({ params }: ParamsProps) => {
  const { id } = await params;

  return (
    <div>
      <NavbarHeight />
      <PageHeader
        title="View your order details here…"
        subTitle="Everything about this purchase in one place!"
      />

      <OrderDetailsPage orderUid={id} />
    </div>
  );
};

export default OrdersDetailsPage;
