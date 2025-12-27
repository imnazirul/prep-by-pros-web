import { orderList } from '@/data';
import HistoryCard from '@/components/shared/history-card';

const OrderList = () => {
  return (
    <section className="mb-10">
      <div className="container">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {orderList.map((order) => (
            <HistoryCard key={order.id} history={order} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrderList;
