import Icon from '@/lib/icon';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { TrackingCardProp } from '@/lib/types';

interface TrackingCardProps extends TrackingCardProp {
  className?: string;
  isDetail?: boolean;
  isActive?: boolean;
}

export default function TrackingCard({
  id,
  status,
  from,
  to,
  fromDate,
  toDate,
  receiver,
  sender,
  progress,
  className,
  isActive,
  isDetail,
}: TrackingCardProps) {
  const statusConfig = {
    ongoing: {
      label: 'Ongoing',
      className: `bg-[#FB923C] text-black-4 group-hover:bg-[#FFEDD5] group-hover:text-[#FB923C] ${isActive && 'bg-[#FFEDD5]! text-[#FB923C]!'}`,
    },
    completed: {
      label: 'Completed',
      className: `bg-[#16A34A] text-black-4 group-hover:bg-[#FFEDD5] group-hover:text-[#16A34A] ${isActive && 'bg-[#FFEDD5]! text-[#16A34A]!'}`,
    },
    cancelled: {
      label: 'Cancelled',
      className: `bg-[#DC2626] text-black-4 group-hover:bg-[#FFEDD5] group-hover:text-[#DC2626] ${isActive && 'bg-[#FFEDD5]! text-[#DC2626]!'}`,
    },
  };

  const currentStatus = statusConfig[status];

  return (
    <div
      className={cn(
        'hover:bg-primary bg-black-4 relative overflow-hidden rounded-2xl p-5 text-white transition-all duration-300 *:transition-all *:duration-300 md:rounded-3xl',
        className,
        isActive && 'bg-primary',
      )}
    >
      <div className="absolute -top-5 -right-12">
        <Icon
          name="tracking_box"
          width={194}
          height={242}
          className={cn(
            `group-hover:[&_path.color-1]:fill-black-10 [&_path.color-1]:fill-[#B0C6BA]`,
            `[&_path.color-2]:fill-[#FB923C] group-hover:[&_path.color-2]:fill-[#DEE6E5]`,
            '[&_path.color-3]:fill-[#CE7730] group-hover:[&_path.color-3]:fill-[#BBCAC9]',
            '[&_path.color-4]:fill-[#245550] group-hover:[&_path.color-4]:fill-white',
            '[&_path.color-5]:fill-[#001F0E] group-hover:[&_path.color-5]:fill-[#8C8C8C]',
            '[&_path.color-6]:fill-[#1D4440] group-hover:[&_path.color-6]:fill-[#D9D9D9]',
            '[&_path.color-7]:fill-[#F8F7B6] group-hover:[&_path.color-7]:fill-[#212121]',
            '[&_path.color-8]:fill-[#043B36] group-hover:[&_path.color-8]:fill-[#ffffff]',
            isActive &&
              '[&_path.color-1]:fill-black-10 [&_path.color-2]:fill-[#DEE6E5] [&_path.color-3]:fill-[#BBCAC9] [&_path.color-4]:fill-white [&_path.color-5]:fill-[#8C8C8C] [&_path.color-6]:fill-[#D9D9D9] [&_path.color-7]:fill-[#212121] [&_path.color-8]:fill-[#ffffff]',
          )}
        />
      </div>

      <Badge
        className={cn(
          currentStatus.className,
          'h-10 px-5 py-2 text-base font-normal',
        )}
      >
        {currentStatus.label}
      </Badge>

      <div className="mt-3 mb-6 text-lg">
        <span
          className={cn(
            'text-black-8 group-hover:text-black-6',
            isActive && 'text-black-6!',
          )}
        >
          Order ID:{' '}
        </span>
        <span
          className={cn(
            'text-black-10 font-medium group-hover:text-white',
            isActive && 'text-white!',
          )}
        >
          {id}
        </span>
      </div>

      <div className="mr-40">
        <div className="relative mb-8 h-6">
          <div className="absolute top-1/2 right-0 left-0 z-10 mb-2 flex -translate-y-1/2 items-center justify-between">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="relative">
                <div
                  className={cn(
                    'rounded-full',
                    index + 1 <= progress && progress === 4
                      ? `bg-black-10 size-4 group-hover:bg-white ${isActive && 'bg-white!'}`
                      : index + 1 == progress
                        ? `group-hover:bg-primary size-6 border-[6px] border-[#212121] bg-white group-hover:border-[#FFFFFF] ${isActive && 'bg-primary! border-[#FFFFFF]!'}`
                        : index + 1 < progress
                          ? `bg-black-10 size-4 group-hover:bg-white ${isActive && 'bg-white!'}`
                          : `size-6 bg-[#D9D9D9] group-hover:bg-[#6C8D8A] ${isActive && 'bg-[#6C8D8A]!'}`,
                  )}
                ></div>
              </div>
            ))}
          </div>

          {/* Progress Line */}
          <div
            className={`absolute top-1/2 right-2 left-2 h-1.25 -translate-y-1/2 bg-[#D9D9D9] group-hover:bg-[#6C8D8A] ${isActive && 'bg-[#6C8D8A]!'}`}
          >
            <div
              style={{
                width: `${((progress - 1) / (4 - 1)) * 100}%`,
              }}
              className={`z-10 h-full bg-[#212121] group-hover:bg-white ${isActive && 'bg-white!'}`}
            ></div>
          </div>
        </div>

        <div>
          {isDetail ? (
            <div className="flex justify-between">
              <div className="space-y-5">
                {[
                  {
                    key: 'From',
                    value: from,
                  },
                  {
                    key: 'Created',
                    value: fromDate,
                  },
                  {
                    key: 'Sender',
                    value: sender,
                  },
                ].map(({ key, value }) => (
                  <div key={key} className="space-y-1">
                    <div
                      className={`group-hover:text-black-6 text-black-8 text-sm transition-all duration-300 ${isActive && 'text-black-6!'}`}
                    >
                      {key}
                    </div>
                    <div
                      className={`text-black-10 text-lg font-medium transition-all duration-300 group-hover:text-white ${isActive && 'text-white!'}`}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-5">
                {[
                  {
                    key: 'To',
                    value: to,
                  },
                  {
                    key: 'Estimated',
                    value: toDate,
                  },
                  {
                    key: 'Receiver',
                    value: receiver,
                  },
                ].map(({ key, value }) => (
                  <div key={key} className="space-y-1">
                    <div
                      className={`group-hover:text-black-6 text-black-8 text-sm transition-all duration-300 ${isActive && 'text-black-6!'}`}
                    >
                      {key}
                    </div>
                    <div
                      className={`text-black-10 text-lg font-medium transition-all duration-300 group-hover:text-white ${isActive && 'text-white!'}`}
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2">
              <div className="space-y-1 last:grid last:justify-end">
                <div
                  className={`text-black-10 text-lg font-medium transition-all duration-300 group-hover:text-white ${isActive && 'text-white!'}`}
                >
                  {from}
                </div>
                <div
                  className={`group-hover:text-black-6 text-black-8 text-sm transition-all duration-300 ${isActive && 'text-black-6!'}`}
                >
                  {fromDate}
                </div>
              </div>
              <div className="space-y-1 last:grid last:justify-end">
                <div
                  className={`text-black-10 text-lg font-medium transition-all duration-300 group-hover:text-white ${isActive && 'text-white!'}`}
                >
                  {to}
                </div>
                <div
                  className={`group-hover:text-black-6 text-black-8 text-sm transition-all duration-300 ${isActive && 'text-black-6!'}`}
                >
                  {toDate}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
