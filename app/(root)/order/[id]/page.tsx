import { Metadata } from 'next';
import { orderList } from '@/data';
import PageHeader from '@/components/shared/page-header';
import NavbarHeight from '@/components/shared/navbar-height';
import EmptyCard from './_components/empty-card';
import OrderDetailsPage from './_components/order-details';

type ParamsProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ParamsProps): Promise<Metadata> {
  const { id } = await params;

  const order = orderList.find((o) => String(o.id) == id);

  return {
    title: order
      ? `Total ${order.items.length} Items`
      : 'Order Details History',
  };
}

const OrdersDetailsPage = async ({ params }: ParamsProps) => {
  const { id } = await params;

  const order = orderList.find((o) => String(o.id) == id);

  return (
    <div>
      <NavbarHeight />
      {order ? (
        <>
          <PageHeader
            title="View your order details here…"
            subTitle="Everything about this purchase in one place!"
          />

          <OrderDetailsPage order={order} />
        </>
      ) : (
        <EmptyCard />
      )}
    </div>
  );
};

export default OrdersDetailsPage;
