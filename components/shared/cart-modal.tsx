/* eslint-disable @next/next/no-img-element */
'use client';

import Icon, { IconName } from '@/lib/icon';
import { useCart } from '@/contexts/cart-context';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Dispatch, SetStateAction, useState } from 'react';
import { CustomInputBox } from './custom-input';
import ConfirmModal from './confirm-modal';

type StepProp = 'CART' | 'BUY' | 'SHIPPING';

const Cart = () => {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <>
      <CartModal setConfirmed={setConfirmed} />

      <ConfirmModal
        icon="happy_image"
        iconWidth={398}
        iconHeight={340}
        open={confirmed}
        setOpen={setConfirmed}
        title="Order Confirmed!"
        subTitle="Thank you for your purchase — your order is being processed and you'll hear from us soon!"
      />

      {/* For Error */}
      {/* <ConfirmModal
        icon="opps_image"
        iconWidth={335}
        iconHeight={320}
        open={confirmed}
        setOpen={setConfirmed}
        title="Oops!"
        subTitle="Something wen’t wrong, we can’t process your request at the moment, Please try again."
      /> */}
    </>
  );
};

export default Cart;

const CartModal = ({
  setConfirmed,
}: {
  setConfirmed: Dispatch<SetStateAction<boolean>>;
}) => {
  const { items, isCartOpen, closeCart } = useCart();
  const [step, setStep] = useState<StepProp>('CART');

  if (!isCartOpen) return;

  return (
    <Dialog
      open={isCartOpen}
      onOpenChange={() => {
        setStep('CART');
        closeCart();
      }}
    >
      <DialogTitle className="sr-only">Cart</DialogTitle>
      <DialogContent
        showCloseButton={false}
        className="w-full gap-0 sm:max-w-170"
      >
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6 text-center">
            <Icon
              name={'shopping_bag'}
              height={40}
              width={40}
              className="text-black-10 group-hover:text-black-10"
            />
            <h2 className="text-black-10 text-2xl font-medium md:text-3xl lg:text-4xl">
              Your cart is empty
            </h2>
          </div>
        ) : (
          <>
            {step == 'CART' ? (
              <CartItem setStep={setStep} />
            ) : step == 'BUY' ? (
              <BuyAgain setConfirmed={setConfirmed} setStep={setStep} />
            ) : step == 'SHIPPING' ? (
              <Shopping setStep={setStep} />
            ) : (
              <div></div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

const CartItem = ({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<StepProp>>;
}) => {
  const { items, removeItem, decreaseQuantity, increaseQuantity } = useCart();

  const total = items
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const [integerPart, decimalPart] = total.split('.');

  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <span className="text-black-10 text-4xl font-semibold">Cart</span>
        <span className="text-black-7 text-2xl">
          {items.length} {items.length > 1 ? 'Items' : 'Item'}
        </span>
      </div>
      <div className="space-y-6">
        <div className="space-y-4 overflow-y-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-black-4 flex flex-col gap-4 rounded-[20px] p-3 sm:flex-row sm:items-center"
            >
              <div className="size-35 shrink-0 overflow-hidden rounded-xl">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="size-full object-cover"
                  />
                )}
              </div>
              <div className="flex flex-1 items-center justify-between">
                <div className="flex flex-col gap-9">
                  <div className="grid gap-0.5">
                    <h4 className="text-black-9 text-xl">{item.name}</h4>
                    <p className="text-black-7 text-base">(Black Addition)</p>
                  </div>

                  <p className="text-black-12 text-xl font-semibold">
                    ${item.price * item.quantity}
                  </p>
                </div>

                <div className="flex h-35.25 flex-col items-center justify-between gap-2 rounded-xl bg-white p-2">
                  <button
                    onClick={() =>
                      item.quantity > 1
                        ? decreaseQuantity(item.id)
                        : removeItem(item.id)
                    }
                    className="hover:bg-primary text-black-7 flex size-8 cursor-pointer items-center justify-center rounded-md bg-[#F0F0F0] transition-all duration-300 hover:text-white"
                  >
                    {item.quantity > 1 ? (
                      <Minus className="size-5" />
                    ) : (
                      <Trash2 className="size-5" />
                    )}
                  </button>

                  <span className="text-base text-[#0D1E1C]">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="hover:bg-primary text-black-7 flex size-8 cursor-pointer items-center justify-center rounded-md bg-[#F0F0F0] transition-all duration-300 hover:text-white"
                  >
                    <Plus className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-black-4 space-y-5 rounded-[22px] p-4">
          {/* Receipt Line Items */}
          <h3 className="text-black-10 text-xl font-medium md:text-2xl">
            Order Summary
          </h3>

          <div className="space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-black-8 text-lg">Subtotal:</span>
                <span className="text-black-9 text-xl">$2,485</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-black-8 text-lg">Delivery Fee:</span>
                <span className="text-black-9 text-xl">$14.90</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-black-8 text-lg">TAX:</span>
                <span className="text-black-9 text-xl">$12</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-black-8 text-lg">Discount (10%):</span>
                <span className="text-black-9 text-xl">-$252</span>
              </div>

              <hr className="border-dashed border-[#D9D9D9]" />

              <div className="flex items-center justify-between">
                <span className="text-black-10 text-xl font-medium">
                  Total:
                </span>
                <span className="text-black-10 text-xl font-medium">
                  ${total}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-black-8 mb-0.5 text-xl">Total</p>
            <p className="text-4xl font-semibold text-[#0D1E1C]">
              ${integerPart}.<span className="text-2xl">{decimalPart}</span>
            </p>
          </div>
          <Button
            className="lg:px-20"
            size={'lg'}
            onClick={() => setStep('BUY')}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

const BuyAgain = ({
  setStep,
  setConfirmed,
}: {
  setStep: Dispatch<SetStateAction<StepProp>>;
  setConfirmed: Dispatch<SetStateAction<boolean>>;
}) => {
  const { closeCart } = useCart();

  return (
    <>
      <div>
        <h3 className="text-black-10 mb-10 text-4xl font-semibold">
          Buy Again
        </h3>
        <div className="space-y-6">
          <div className="bg-black-4 flex items-center gap-5 rounded-2xl p-4">
            <div className="flex size-20 items-center justify-center rounded-[10px] bg-white">
              <Icon
                name="apple"
                height={60}
                width={60}
                className="text-[#212121]"
              />
            </div>
            <span className="text-black-10 text-2xl font-semibold">Apple</span>
          </div>

          <div className="space-y-4">
            <h3 className="text-black-8 text-2xl">Delivery Address</h3>

            <div className="flex items-center gap-5 rounded-2xl">
              <div className="bg-black-3 flex size-20 items-center justify-center rounded-[10px]">
                <Icon name="motorbike" height={50} width={50} />
              </div>
              <div className="grid flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-black-10 text-2xl font-semibold">
                    Home
                  </span>
                  <button
                    className="cursor-pointer"
                    onClick={() => setStep('SHIPPING')}
                  >
                    <Icon
                      name="pencil_edit"
                      height={26}
                      width={26}
                      className="text-black-7 hover:text-black-8"
                    />
                  </button>
                </div>
                <p className="text-black-7 line-clamp-2 max-w-59.5">
                  2972 Westheimer Rd. Santa Ana, Illinois 85486{' '}
                </p>
              </div>
            </div>
          </div>

          <hr className="border-[#D9D9D9]" />

          <div className="flex items-center justify-between">
            <span className="text-black-7 text-xl">
              Estimated Delivery time
            </span>
            <span className="text-black-9 text-lg">7 days max</span>
          </div>
        </div>
        <Button
          className="mt-15 w-full"
          size={'lg'}
          onClick={() => {
            closeCart();

            setTimeout(() => {
              setConfirmed(true);
            }, 100);
          }}
        >
          Continue
        </Button>
      </div>
    </>
  );
};

const Shopping = ({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<StepProp>>;
}) => {
  return (
    <div>
      <h3 className="text-black-10 mb-10 text-4xl font-semibold">
        Delivery Address
      </h3>
      <div className="space-y-6">
        <div className="space-y-4">
          <CustomInputBox
            icon="location"
            label="Address"
            placeholder="Enter Address"
          />
          <CustomInputBox
            icon="road_wayside"
            label="Street"
            placeholder="Enter Street"
          />
          <CustomInputBox
            icon="building"
            label="Apartment"
            isOptional={true}
            placeholder="Enter Apartment"
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-black-8 text-2xl">Add a label</h3>
          <div className="flex items-center gap-3">
            {[
              { icon: 'house' as IconName, label: 'Home' },
              { icon: 'building_2' as IconName, label: 'Office' },
              { icon: 'favorite' as IconName, label: 'Partner' },
              { icon: 'plus_sign' as IconName, label: 'Other' },
            ].map(({ icon, label }, index) => (
              <label
                key={label}
                className="group flex cursor-pointer flex-col items-center gap-2"
              >
                <input
                  name="add_label"
                  type="radio"
                  className="peer"
                  hidden
                  defaultChecked={index === 0}
                />
                <div className="bg-primary-100 flex size-25 items-center justify-center rounded-[10px]">
                  <Icon
                    name={icon}
                    height={52}
                    width={52}
                    className="group-has-[input:checked]:text-primary group-hover:text-primary text-black-8 transition-all duration-300"
                  />
                </div>
                <span className="text-black-7 group-hover:text-black-9 peer-checked:text-black-9 font-medium group-hover:font-semibold peer-checked:font-semibold">
                  {label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <Button
        onClick={() => setStep('BUY')}
        className="mt-15 w-full"
        size={'lg'}
      >
        Continue
      </Button>
    </div>
  );
};
