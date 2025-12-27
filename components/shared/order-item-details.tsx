import { format } from 'date-fns';
import CustomImage from './custom-image';
import { HistoryCardProp } from '@/lib/types';

const OrderItemDetails = ({
  order,
  isRefund,
  step,
  selectedList,
}: {
  order: HistoryCardProp;
  isRefund?: boolean;
  step?: 1 | 2 | 3;
  selectedList?: {
    image: string;
    name: string;
  }[];
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-black-10 text-2xl font-medium md:text-3xl lg:text-4xl">
        {step == 3
          ? 'Items for Refund'
          : isRefund
            ? 'Item Details'
            : 'Order Details'}
      </h2>

      {step == 3 ? (
        <>
          <div className="space-y-5">
            {selectedList?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="bg-black-4 flex items-center gap-6 rounded-4xl p-8"
                >
                  <div
                    style={{
                      backgroundImage: `url('${item.image}')`,
                    }}
                    className="relative z-1 size-35 shrink-0 overflow-hidden rounded-xl bg-cover after:absolute after:inset-0 after:-z-1 after:bg-[linear-gradient(0deg,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.20)_100%)]"
                  ></div>

                  <div className="flex flex-1 items-start justify-between">
                    <div className="space-y-2">
                      <p className="text-black-9 max-w-100 text-[22px]">
                        Brusia Dortmund signed tracksuit; Fan Made (2x)
                      </p>
                      <p className="text-black-8 text-[22px]">
                        Yellow color, XXL
                      </p>
                    </div>
                    <span className="text-black-10 text-[32px] font-semibold">
                      $2,485
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          {/* Order Summary Card */}
          <div className="bg-black-4 rounded-2xl p-6 md:rounded-3xl md:p-8">
            {/* Total and Price */}
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-black-10 text-xl font-medium md:text-2xl">
                Total {order.items.length} Items
              </h3>
              <p className="text-black-10 text-2xl font-semibold md:text-3xl lg:text-[40px]">
                ${order.price}
              </p>
            </div>

            {/* Delivery Date */}
            <p className="text-black-7 mb-2">
              Delivered on {format(new Date(order.date), 'dd MMM yyyy')}
            </p>

            {/* Items List */}
            <p className="text-black-8 text-lg">
              {order.items.map((item) => item.name).join(',')}
            </p>

            {/* Product Images */}
            <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3">
              {order.items?.map((item, index) => (
                <div
                  key={index}
                  className="bg-muted relative aspect-201/240 overflow-hidden rounded-[20px]"
                >
                  <CustomImage
                    src={item.image}
                    className="size-full"
                    alt="Order item"
                    fill
                  />
                </div>
              ))}
            </div>

            {!isRefund && (
              <div className="mt-12 space-y-4">
                <h3 className="text-black-10 text-xl font-medium md:text-2xl">
                  Others Details
                </h3>

                <div className="space-y-2.5 sm:space-y-4">
                  {[
                    { label: 'Delivered to:', value: 'Andrew Whierholze' },
                    { label: 'Contact:', value: 'andrewhierholze@gmail.com' },
                    { label: 'Location:', value: 'New York' },
                    { label: 'Payment Method:', value: 'Cash on Delivery' },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="flex items-center justify-between"
                    >
                      <span className="text-black-8 text-base sm:text-lg">
                        {label}
                      </span>
                      <span className="text-black-9 text-lg sm:text-xl">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default OrderItemDetails;
