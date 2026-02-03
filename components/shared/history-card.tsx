import { HistoryCardProp } from '@/lib/types';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import Link from 'next/link';
import { Button } from '../ui/button';

const HistoryCard = ({ history }: { history: HistoryCardProp }) => {
  return (
    <div
      style={{
        backgroundImage: `url("${history.items[0].image}")`,
      }}
      className="group bg-card relative z-1 flex aspect-426/398 items-end overflow-hidden rounded-2xl bg-cover p-4 transition-all duration-300 after:absolute after:inset-0 after:-z-1 after:bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_26.88%,rgba(0,0,0,0.60)_55.34%)] md:rounded-3xl"
    >
      <Link
        href={`/order/${history.id}`}
        className="absolute inset-0 z-0"
        aria-label="View Order Details"
      />
      <div className="w-full relative z-10 pointer-events-none">
        <div className="space-y-2">
          <div
            className={cn(
              'flex items-center justify-between',
              history.type === 'ORDER' ? 'items-center' : 'items-start'
            )}
          >
            <div className="space-y-1">
              <h3 className="line-clamp-1 text-2xl font-semibold text-white">
                {history.type === 'ORDER' ? `Total ${history.items.length} Items` : history.title}
              </h3>
              {history.type === 'PAYMENT' && (
                <p className="text-black-4 text-sm">TxID: {history.payment_details.trx_id} </p>
              )}
            </div>
            <span className="text-black-4 shrink-0 rounded-full bg-[#AEACAC52] px-3 py-1.5 text-lg font-bold backdrop-blur-[20px]">
              ${history.price.toFixed(2)}
            </span>
          </div>

          {history.type === 'ORDER' && (
            <div className="flex items-center justify-between">
              <p className="text-black-4 line-clamp-2 max-w-53.75 text-sm">
                {history.items.map((item) => item.name).join(',')}
              </p>
              <div className="grid shrink-0">
                <span className="text-black-4 text-base font-medium">Delivered on</span>
                <span className="text-black-5 text-xs">
                  {format(new Date(history.date), 'dd MMMM, yyyy')}
                </span>
              </div>
            </div>
          )}

          {history.type === 'PAYMENT' && (
            <div className="flex items-center justify-between">
              <div className="grid shrink-0">
                <span className="text-black-4 text-base font-medium">Payment Date</span>
                <span className="text-black-5 text-xs">
                  {format(new Date(history.date), 'dd MMMM, yyyy')}
                </span>
              </div>
              <div className="grid shrink-0">
                <span className="text-black-4 text-base font-medium">Payment Method</span>
                <span className="text-black-5 text-xs">
                  {history.payment_details.payment_method}
                </span>
              </div>
            </div>
          )}

          <div className="mt-5 grid grid-cols-[4.5fr_7.5fr] items-center gap-2 text-center pointer-events-auto">
            <Button
              asChild
              className="text-primary hover:bg-primary-100 w-full bg-white font-semibold"
              variant={'secondary'}
            >
              <Link href={`/order/${history.id}/refund`}>Refund</Link>
            </Button>

            <Button variant={'default'}>Buy Again</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
