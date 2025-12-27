'use client';

import Icon from '@/lib/icon';
import { StepProp } from './refund-details';

const RefundItems = ({
  toggleItem,
  selectedList,
  selectedItems,
  step,
}: {
  toggleItem: (index: number) => void;
  selectedList: {
    image: string;
    name: string;
  }[];
  selectedItems: number[];
  step: StepProp;
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-black-10 text-2xl font-medium md:text-3xl lg:text-4xl">
          Items for refund
        </h2>
        <p className="text-black-7 text-lg">Eligible until September 16</p>
      </div>

      <div className="space-y-5">
        {selectedList.map((item, index) => {
          const checked = selectedItems.includes(index);

          return (
            <div key={index} className="flex items-center gap-6">
              <div
                style={{
                  backgroundImage: `url('${item.image}')`,
                }}
                className="relative z-1 size-35 shrink-0 overflow-hidden rounded-xl bg-cover after:absolute after:inset-0 after:-z-1 after:bg-[linear-gradient(0deg,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.20)_100%)]"
              >
                {step === 1 && (
                  <label className="absolute top-3 left-3 cursor-pointer">
                    <input
                      checked={checked}
                      onChange={() => toggleItem(index)}
                      type="checkbox"
                      className="peer sr-only"
                    />

                    <Icon
                      className="text-white peer-checked:hidden"
                      name="checkmark_square"
                      height={24}
                      width={24}
                    />
                    <Icon
                      className="text-white peer-not-checked:hidden"
                      name="checkmark_square_fill"
                      height={24}
                      width={24}
                    />
                  </label>
                )}
              </div>

              <div className="flex flex-1 items-start justify-between">
                <div className="space-y-2">
                  <p className="text-black-9 max-w-100 text-[22px]">
                    Brusia Dortmund signed tracksuit; Fan Made (2x)
                  </p>
                  <p className="text-black-8 text-[22px]">Yellow color, XXL</p>
                </div>
                <span className="text-black-10 text-[32px] font-semibold">
                  $2,485
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RefundItems;
