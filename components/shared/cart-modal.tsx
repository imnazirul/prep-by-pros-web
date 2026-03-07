/* eslint-disable @next/next/no-img-element */
'use client';

import { useCart } from '@/contexts/cart-context';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import ConfirmModal from './confirm-modal';
import { CustomInputBox } from './custom-input';

import Icon, { IconName } from '@/lib/icon';
import {
  Address,
  CreateOrderRequest,
  useCreateAddressMutation,
  useCreateOrderMutation,
  useGetAddressesQuery,
} from '@/redux/api/authApi';
import { useRouter } from 'next/navigation';
import Circle3DLoader from './circle-loader';

type StepProp = 'CART' | 'BUY' | 'SHIPPING';

// Use API Address type, but we might need a local form type
export type ShippingAddressForm = {
  address: string;
  street: string;
  apartment?: string;
  label: string;
  uid?: string; // Optional because new addresses won't have it yet
};

const Cart = () => {
  const [confirmed, setConfirmed] = useState(false);
  const router = useRouter(); // To redirect or refresh if needed

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

const CartModal = ({ setConfirmed }: { setConfirmed: Dispatch<SetStateAction<boolean>> }) => {
  const { items, isCartOpen, closeCart } = useCart();
  const [step, setStep] = useState<StepProp>('CART');
  const { data: addressesData } = useGetAddressesQuery();
  const [selectedAddress, setSelectedAddress] = useState<ShippingAddressForm | null>(null);

  // Set default address when data loads
  if (addressesData?.results?.length && !selectedAddress) {
    const defaultAddr =
      addressesData.results.find((a: Address) => a.is_default) || addressesData.results[0];
    setSelectedAddress({
      address: defaultAddr.address,
      street: defaultAddr.street,
      apartment: defaultAddr.apartment,
      label: defaultAddr.label || 'Home',
      uid: defaultAddr.uid,
    });
  }

  const currentAddress: ShippingAddressForm = selectedAddress || {
    address: '2972 Westheimer Rd',
    street: 'Santa Ana, Illinois 85486',
    label: 'Home',
  };

  if (!isCartOpen) return;

  return (
    <Dialog
      open={isCartOpen}
      onOpenChange={() => {
        setStep('CART'); // Reset step on close
        if (isCartOpen) closeCart(); // Allow closing via clicking outside
      }}
    >
      <DialogTitle className="sr-only">Cart</DialogTitle>
      <DialogContent showCloseButton={false} className="w-full gap-0 sm:max-w-170">
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
              <BuyAgain setConfirmed={setConfirmed} setStep={setStep} address={currentAddress} />
            ) : step == 'SHIPPING' ? (
              <Shopping
                setStep={setStep}
                setAddress={setSelectedAddress}
                currentAddress={currentAddress}
              />
            ) : (
              <div></div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

const CartItem = ({ setStep }: { setStep: Dispatch<SetStateAction<StepProp>> }) => {
  const {
    items,
    removeItem,
    decreaseQuantity,
    increaseQuantity,
    closeCart,
    isUpdating,
    isDeleting,
  } = useCart();
  const router = useRouter();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

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
                  <img src={item.image} alt={item.name} className="size-full object-cover" />
                )}
              </div>
              <div className="flex flex-1 items-center justify-between">
                <div className="flex flex-col gap-9">
                  <div className="grid gap-0.5">
                    <h4 className="text-black-9 text-xl">{item.name}</h4>
                    <div className="flex flex-wrap items-center gap-2 text-base text-black-7">
                      {item.color && (
                        <span className="flex items-center gap-1">
                          {item.colorCode && (
                            <span
                              className="inline-block size-3 rounded-full border border-gray-200"
                              style={{ backgroundColor: item.colorCode }}
                            />
                          )}
                          {item.color}
                        </span>
                      )}
                      {item.size && (
                        <>
                          <span className="text-black-4">•</span>
                          <span>{item.size}</span>
                        </>
                      )}
                      {item.style && (
                        <>
                          <span className="text-black-4">•</span>
                          <span>{item.style}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <p className="text-black-12 text-xl font-semibold">
                    ${item.price * item.quantity}
                  </p>
                </div>

                <div className="flex h-35.25 flex-col items-center justify-between gap-2 rounded-xl bg-white p-2">
                  <button
                    disabled={isUpdating || isDeleting}
                    onClick={() =>
                      item.quantity > 1 ? decreaseQuantity(item.id) : removeItem(item.id)
                    }
                    className="hover:bg-primary text-black-7 flex size-8 cursor-pointer items-center justify-center rounded-md bg-[#F0F0F0] transition-all duration-300 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isUpdating || isDeleting ? (
                      <Circle3DLoader size={2} radius={10} depth={5} color="#000" />
                    ) : item.quantity > 1 ? (
                      <Minus className="size-5" />
                    ) : (
                      <Trash2 className="size-5" />
                    )}
                  </button>

                  <span className="text-base text-[#0D1E1C]">{item.quantity}</span>

                  <button
                    disabled={isUpdating || isDeleting}
                    onClick={() => increaseQuantity(item.id)}
                    className="hover:bg-primary text-black-7 flex size-8 cursor-pointer items-center justify-center rounded-md bg-[#F0F0F0] transition-all duration-300 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isUpdating || isDeleting ? (
                      <Circle3DLoader size={2} radius={10} depth={5} color="#000" />
                    ) : (
                      <Plus className="size-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-black-4 space-y-5 rounded-[22px] p-4">
          {/* Receipt Line Items */}
          <h3 className="text-black-10 text-xl font-medium md:text-2xl">Order Summary</h3>

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
                <span className="text-black-10 text-xl font-medium">Total:</span>
                <span className="text-black-10 text-xl font-medium">${total}</span>
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
            onClick={() => {
              if (items.length === 0) return;
              closeCart();
              router.push('/checkout');
            }}
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
  address,
}: {
  setStep: Dispatch<SetStateAction<StepProp>>;
  setConfirmed: Dispatch<SetStateAction<boolean>>;
  address: ShippingAddressForm;
}) => {
  const { items, closeCart, clearCart } = useCart();
  const [createOrder, { isLoading: isOrderLoading }] = useCreateOrderMutation();
  const [createAddress, { isLoading: isAddressLoading }] = useCreateAddressMutation();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isPaymentEditing, setIsPaymentEditing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const isLoading = isOrderLoading || isAddressLoading || isProcessing;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 14.9;
  const tax = 12.0;
  const discount = 252.0; // Fixed mock discount for now
  const total = (subtotal + deliveryFee + tax - discount).toFixed(2);

  const methods = [
    {
      id: 'card',
      name: 'Credit Card',
      description: 'Pay with Visa, Mastercard',
      icon: 'shopping_basket' as IconName,
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Pay securely with PayPal',
      icon: 'global' as IconName,
    },
    {
      id: 'google_pay',
      name: 'Google Pay',
      description: 'Faster checkout',
      icon: 'google_logo' as IconName,
    },
  ];

  const currentMethod = methods.find((m) => m.id === selectedMethod) || methods[0];

  const handleCheckout = async () => {
    try {
      let addressUid = address.uid;

      if (!addressUid) {
        const newAddress = await createAddress({
          address: address.address,
          street: address.street,
          apartment: address.apartment,
          label: address.label,
          city: 'Unknown',
          country: 'Unknown',
          postal_code: '00000',
        }).unwrap();
        addressUid = newAddress.uid;
      }

      // Construct products array: repeat product object for quantity
      const productsList: { product_uid: string }[] = [];
      items.forEach((item) => {
        for (let i = 0; i < item.quantity; i++) {
          productsList.push({ product_uid: item.productUid });
        }
      });

      const payload: CreateOrderRequest = {
        sub_total: subtotal.toString(),
        total_amount: total,
        discount_amount: discount.toString(),
        tax_amount: tax.toString(),
        delivery_fee: deliveryFee.toString(),
        address: addressUid!,
        products: productsList,
      };

      await createOrder(payload).unwrap();

      // Simulate Payment Processing
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        closeCart();
        clearCart();
        setTimeout(() => {
          setConfirmed(true);
        }, 100);
      }, 1500);
    } catch (error) {
      console.error('Failed to create order:', JSON.stringify(error, null, 2));
      // Could add toast here
    }
  };

  return (
    <>
      <div>
        <h3 className="text-black-10 mb-10 text-4xl font-semibold">Buy Again</h3>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-black-8 text-2xl">Payment Method</h3>
            {isPaymentEditing ? (
              <div className="space-y-3">
                {methods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedMethod === method.id
                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      className="accent-primary size-5"
                      checked={selectedMethod === method.id}
                      onChange={() => {
                        setSelectedMethod(method.id);
                        setIsPaymentEditing(false);
                      }}
                    />
                    <div className="bg-white p-2 rounded-lg border border-gray-100 shrink-0">
                      <Icon name={method.icon} className="size-6 text-black-9" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-black-9">{method.name}</p>
                      <p className="text-xs text-black-7">{method.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            ) : (
              <div
                className="flex items-center gap-5 rounded-2xl cursor-pointer hover:bg-black-3/50 transition-colors"
                onClick={() => setIsPaymentEditing(true)}
              >
                <div className="bg-black-3 flex size-20 items-center justify-center rounded-[10px]">
                  <Icon name={currentMethod.icon} height={50} width={50} />
                </div>
                <div className="grid flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-black-10 text-2xl font-semibold">
                      {currentMethod.name}
                    </span>
                  </div>
                  <p className="text-black-7">{currentMethod.description}</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-black-8 text-2xl">Delivery Address</h3>

            <div className="flex items-center gap-5 rounded-2xl">
              <div className="bg-black-3 flex size-20 items-center justify-center rounded-[10px]">
                <Icon name="motorbike" height={50} width={50} />
              </div>
              <div className="grid flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-black-10 text-2xl font-semibold">{address.label}</span>
                  <button className="cursor-pointer" onClick={() => setStep('SHIPPING')}>
                    <Icon
                      name="pencil_edit"
                      height={26}
                      width={26}
                      className="text-black-7 hover:text-black-8"
                    />
                  </button>
                </div>
                <p className="text-black-7 line-clamp-2 max-w-59.5">
                  {address.address} {address.street} {address.apartment}
                </p>
              </div>
            </div>
          </div>

          <hr className="border-[#D9D9D9]" />

          <div className="flex items-center justify-between">
            <span className="text-black-7 text-xl">Estimated Delivery time</span>
            <span className="text-black-9 text-lg">7 days max</span>
          </div>
        </div>
        <Button className="mt-15 w-full" size={'lg'} onClick={handleCheckout} disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Place Order'}
        </Button>
      </div>
    </>
  );
};

const Shopping = ({
  setStep,
  setAddress,
  currentAddress,
}: {
  setStep: Dispatch<SetStateAction<StepProp>>;
  setAddress: Dispatch<SetStateAction<ShippingAddressForm | null>>;
  currentAddress: ShippingAddressForm;
}) => {
  const [formData, setFormData] = useState<ShippingAddressForm>(currentAddress);

  const handleSubmit = () => {
    setAddress({ ...formData, uid: undefined });
    setStep('BUY');
  };

  return (
    <div>
      <h3 className="text-black-10 mb-10 text-4xl font-semibold">Delivery Address</h3>
      <div className="space-y-6">
        <div className="space-y-4">
          <CustomInputBox
            icon="location"
            label="Address"
            placeholder="Enter Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
          <CustomInputBox
            icon="road_wayside"
            label="Street"
            placeholder="Enter Street"
            value={formData.street}
            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
          />
          <CustomInputBox
            icon="building"
            label="Apartment"
            isOptional={true}
            placeholder="Enter Apartment"
            value={formData.apartment || ''}
            onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
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
              <label key={label} className="group flex cursor-pointer flex-col items-center gap-2">
                <input
                  name="add_label"
                  type="radio"
                  className="peer"
                  hidden
                  checked={formData.label === label}
                  onChange={() => setFormData({ ...formData, label })}
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
      <Button onClick={handleSubmit} className="mt-15 w-full" size={'lg'}>
        Continue
      </Button>
    </div>
  );
};
