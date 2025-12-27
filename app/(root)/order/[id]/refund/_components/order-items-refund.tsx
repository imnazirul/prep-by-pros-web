'use client';

import {
  CustomSelectBox,
  CustomTextareaBox,
} from '@/components/shared/custom-input';
import Icon from '@/lib/icon';
import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction } from 'react';

const OrderItemsRefund = ({
  step,
  issue,
  setIssue,
  toggleItem,
  selectedList,
  handleNext,
  selectedItems,
}: {
  step: 1 | 2 | 3;
  issue: string;
  setIssue: Dispatch<SetStateAction<string>>;
  toggleItem: (index: number) => void;
  selectedList: {
    image: string;
    name: string;
  }[];
  handleNext: () => void;
  selectedItems: number[];
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-black-10 text-2xl font-medium md:text-3xl lg:text-4xl">
          {step == 3 ? 'Refund Amount' : 'Items for refund'}
        </h2>
        <p className="text-black-7 text-lg">Eligible until September 16</p>
      </div>

      {step != 3 && (
        <div className="space-y-5">
          {selectedList.map((item, index) => {
            const checked = selectedItems.includes(index);

            return (
              <div
                key={index}
                className="flex flex-col gap-6 sm:flex-row sm:items-center"
              >
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

                <div className="flex flex-1 flex-col items-start sm:flex-row sm:justify-between">
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
      )}

      {step === 2 && (
        <div className="space-y-4">
          <CustomSelectBox
            icon="alert_2"
            label="The issue with the item"
            isRequired
            placeholder="Select an option"
            value={issue}
            setValue={setIssue}
            options={[
              {
                label: 'Wouldn’t arrive in time',
                value: 'Wouldn’t arrive in time',
              },
              {
                label: 'Ordered wrong item or amount',
                value: 'Ordered wrong item or amount',
              },
              {
                label: 'Used wrong payment method',
                value: 'Used wrong payment method',
              },
              {
                label: 'Didn’t place this order',
                value: 'Didn’t place this order',
              },
            ]}
          />

          <CustomTextareaBox
            icon="message"
            isOptional={true}
            label="Additional message"
            placeholder="Type your message here"
          />
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <div className="bg-black-4 space-y-7 rounded-2xl p-6 md:rounded-3xl md:p-8 lg:rounded-4xl">
            <h3 className="text-black-10 text-[22px] font-medium">
              Estimated Refund Amount
            </h3>

            <div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-black-8 text-lg">Subtotal:</span>
                  <span className="text-black-9 text-xl md:text-2xl">
                    $2,485
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-black-8 text-lg">Delivery Fee:</span>
                  <span className="text-black-9 text-xl md:text-2xl">
                    $14.90
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-black-8 text-lg">TAX:</span>
                  <span className="text-black-9 text-xl md:text-2xl">$12</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-black-8 text-lg">Discount (10%):</span>
                  <span className="text-black-9 text-xl md:text-2xl">
                    -$252
                  </span>
                </div>
              </div>

              <hr className="border-black-5 mt-4 mb-5 border-[1.5px] border-dashed" />

              <div className="flex items-center justify-between">
                <span className="text-black-10 text-xl font-medium md:text-2xl">
                  Total:
                </span>
                <span className="text-black-9 text-xl font-medium md:text-2xl">
                  $2342
                </span>
              </div>
            </div>
          </div>
          <p className="text-black-7 text-end">
            You will be refunded with the default gateway*
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-end">
        <Button size="lg" className="lg:px-31.75" onClick={() => handleNext()}>
          {step === 3 ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default OrderItemsRefund;
