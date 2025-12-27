import {
  CustomSelectBox,
  CustomTextareaBox,
} from '@/components/shared/custom-input';
import { useState } from 'react';
import { StepProp } from './refund-details';
import { Button } from '@/components/ui/button';
import ConfirmModal from '@/components/shared/confirm-modal';

const RefundForm = ({
  step,
  handleNext,
}: {
  step: StepProp;
  handleNext: () => void;
}) => {
  const [reason, setReason] = useState('');
  const [issue, setIssue] = useState('');

  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-black-10 text-2xl font-medium md:text-3xl lg:text-4xl">
            {step == 1 ? 'Items for refund' : step == 2 && 'Refund Amount'}
          </h2>
          <p className="text-black-7 text-lg">
            {step == 1 ? '' : 'Eligible until September 16'}
          </p>
        </div>

        {step == 1 && (
          <div className="space-y-4">
            <CustomSelectBox
              icon="alert_2"
              label="Reason for cancelation"
              isRequired
              placeholder="Select an option"
              value={reason}
              setValue={setReason}
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

        {step == 2 && (
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
                    <span className="text-black-9 text-xl md:text-2xl">
                      $12
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-black-8 text-lg">
                      Discount (10%):
                    </span>
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
          <Button
            size="lg"
            className="lg:px-31.75"
            onClick={() => {
              if (step == 1) {
                handleNext();
              } else {
                setOpen(true);
              }
            }}
          >
            Next
          </Button>
        </div>
      </div>

      <ConfirmModal
        icon="happy_image"
        iconWidth={398}
        iconHeight={340}
        open={open}
        setOpen={setOpen}
        title="Your order is cancelled"
        subTitle=" Your order has been cancelled successfully and will be refunded with the default gateway soon. Thank you."
      />
    </div>
  );
};

export default RefundForm;
