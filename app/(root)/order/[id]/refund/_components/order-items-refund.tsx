'use client';

import { CustomSelectBox, CustomTextareaBox } from '@/components/shared/custom-input';
import { Button } from '@/components/ui/button';
import Icon from '@/lib/icon';
import { useRefundOrderItemsMutation } from '@/redux/api/authApi';
import { Dispatch, SetStateAction } from 'react';

const OrderItemsRefund = ({
  step,
  issue,
  setIssue,
  setAdditionalMessage,
  additionalMessage,
  toggleItem,
  selectedList,
  handleNext,
  handleConfirm,
  selectedItems,
  selectedOrderItemsUid,
}: {
  step: 1 | 2 | 3;
  issue: string;
  setIssue: Dispatch<SetStateAction<string>>;
  setAdditionalMessage: Dispatch<SetStateAction<string>>;
  additionalMessage: string;
  toggleItem: (index: number) => void;
  selectedList: {
    image: string;
    name: string;
    price?: number;
    quantity?: number;
    attributes?: string;
  }[];
  handleNext: () => void;
  handleConfirm: () => void;
  selectedItems: number[];
  selectedOrderItemsUid: string[];
}) => {
  const [refundOrderItems, { isLoading }] = useRefundOrderItemsMutation();

  const subtotal = selectedList.reduce((acc, item) => {
    // In Step 3, selectedList contains only the selected items, so we can sum them directly.
    return acc + (item.price || 0) * (item.quantity || 1);
  }, 0);

  const total = subtotal;

  const handleSubmit = async () => {
    if (!issue) {
      alert('Please select an issue reason');
      return;
    }

    try {
      await refundOrderItems({
        order_item_uids: selectedOrderItemsUid,
        item_issue_reason: issue,
        additional_message: additionalMessage,
      }).unwrap();

      handleConfirm(); // Show success modal
    } catch (error: any) {
      console.error('Refund failed', error);
      const errorMessage =
        error?.data?.error ||
        error?.data?.item_issue_reason?.[0] ||
        'Failed to process refund. Please try again.';
      alert(errorMessage);
    }
  };

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
              <div key={index} className="flex flex-col gap-6 sm:flex-row sm:items-center">
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
                      {item.name} {item.quantity && item.quantity > 1 ? `(${item.quantity}x)` : ''}
                    </p>
                    {item.attributes && (
                      <p className="text-black-8 text-[22px]">{item.attributes}</p>
                    )}
                  </div>
                  {item.price !== undefined && (
                    <span className="text-black-10 text-[32px] font-semibold">${item.price}</span>
                  )}
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
                label: 'Damaged',
                value: 'DAMAGED',
              },
              {
                label: 'Past Expiration',
                value: 'PAST_EXPIRATION',
              },
              {
                label: 'Missing Item',
                value: 'MISSING_ITEM',
              },
              {
                label: 'Poor Quality',
                value: 'POOR_QUALITY',
              },
            ]}
          />

          <CustomTextareaBox
            icon="message"
            isOptional={true}
            label="Additional message"
            placeholder="Type your message here"
            value={additionalMessage}
            onChange={(e: any) => setAdditionalMessage(e.target.value)}
          />
        </div>
      )}

      {step === 3 && (
        <div className="space-y-5">
          <div className="bg-black-4 space-y-7 rounded-2xl p-6 md:rounded-3xl md:p-8 lg:rounded-4xl">
            <h3 className="text-black-10 text-[22px] font-medium">Estimated Refund Amount</h3>

            {/* Note: We don't have exact refund calculation logic from backend readily available without making a dry-run call 
                or calculating manually. For now, since this is UI integration, I will keep the static layout but maybe hide specific values 
                or show "Pending Calculation" if critical. 
                However, to avoid breaking UI layout, I will leave the breakdown structure but it won't be accurate numbers. 
                Ideally backend should provide this info. 
            */}

            <div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-black-8 text-lg">Subtotal:</span>
                  <span className="text-black-9 text-xl md:text-2xl">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-black-8 text-lg">Delivery Fee:</span>
                  <span className="text-black-9 text-xl md:text-2xl">-</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-black-8 text-lg">TAX:</span>
                  <span className="text-black-9 text-xl md:text-2xl">-</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-black-8 text-lg">Discount:</span>
                  <span className="text-black-9 text-xl md:text-2xl">-</span>
                </div>
              </div>

              <hr className="border-black-5 mt-4 mb-5 border-[1.5px] border-dashed" />

              <div className="flex items-center justify-between">
                <span className="text-black-10 text-xl font-medium md:text-2xl">Total:</span>
                <span className="text-black-9 text-xl font-medium md:text-2xl">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <p className="text-black-7 text-end">You will be refunded with the default gateway*</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-end">
        <Button
          size="lg"
          className="lg:px-31.75"
          onClick={() => (step === 3 ? handleSubmit() : handleNext())}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : step === 3 ? 'Submit' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default OrderItemsRefund;
