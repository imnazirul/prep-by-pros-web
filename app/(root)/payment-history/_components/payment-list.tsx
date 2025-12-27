import { paymentList } from '@/data';
import HistoryCard from '@/components/shared/history-card';

const PaymentList = () => {
  return (
    <section className="mb-10">
      <div className="container">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {paymentList.map((payment) => (
            <HistoryCard key={payment.id} history={payment} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PaymentList;
