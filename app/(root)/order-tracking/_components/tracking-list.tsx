import { orders } from '@/data';
import TrackingCard from './tracking-card';

export default function TrackingList() {
  return (
    <div className="space-y-6">
      {orders.map((order, index) => (
        <TrackingCard
          className="group"
          isActive={index === 0 ? true : false}
          key={index}
          {...order}
        />
      ))}
    </div>
  );
}
