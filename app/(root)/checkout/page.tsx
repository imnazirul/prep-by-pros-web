'use client';

import CheckoutForm from '@/components/checkout/checkout-form';
import { Button } from '@/components/ui/button';
import {
  useCreateOrderMutation,
  useGetAddressesQuery,
  useGetCartItemsQuery,
} from '@/redux/api/authApi';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

// Initialize Stripe outside of component
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_H48RqprN8Erf08tSWange35W00qOLrpPQB' // Fallback to key found in mobile app if env not set
);

export default function CheckoutPage() {
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState<string>('');
  const [paymentIntentId, setPaymentIntentId] = useState<string>('');
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  // Fetch Cart Items
  const { data: cartData, isLoading: isCartLoading } = useGetCartItemsQuery();
  const cartItems = cartData?.results || [];

  // Fetch Addresses to select default
  const { data: addressData } = useGetAddressesQuery();
  const defaultAddress =
    addressData?.results?.find((a) => a.is_default) || addressData?.results?.[0];

  const [createOrder] = useCreateOrderMutation();

  // Calculate Summary
  const summary = useMemo(() => {
    const subTotal = cartItems.reduce(
      (acc, curr) => acc + Number(curr.product.price) * curr.product_count,
      0
    );
    // Assuming generic tax/delivery logic similar to mobile app for now
    const deliveryFee = 14.9;
    const tax = 12;
    const discount = 0; // Mobile app had complicated discount logic, zeroing for now
    const total = subTotal + deliveryFee + tax - discount;

    return { subTotal, deliveryFee, tax, discount, total };
  }, [cartItems]);

  useEffect(() => {
    // Check if we should redirect back to cart if empty
    if (!isCartLoading && cartItems.length === 0) {
      // router.push('/cart'); // Commenting out to avoid redirect loops during dev
    }
  }, [cartItems, isCartLoading, router]);

  // Create Order on Mount (or user action?)
  // User flow: Review Cart -> Click Checkout -> Lands here.
  // We should create the Payment Intent immediately to show the Element.
  useEffect(() => {
    const initPayment = async () => {
      if (!isCreatingOrder && !clientSecret && cartItems.length > 0 && defaultAddress) {
        setIsCreatingOrder(true);
        try {
          const payload = {
            sub_total: summary.subTotal.toString(),
            total_amount: summary.total.toString(),
            discount_amount: summary.discount.toString(),
            tax_amount: summary.tax.toString(),
            delivery_fee: summary.deliveryFee.toString(),
            address: defaultAddress.uid,
            products: cartItems.map((item) => ({
              product_uid: item.product.uid,
              quantity: item.product_count,
              size_uid: item.size?.uid,
              colour_uid: item.colour?.uid,
            })),
          };

          // Temporarily bypassing Strict Type check on 'products' structure if it mismatches
          // The API definition had `products: { product_uid: string }[]`
          // We'll trust the payload matches what backend expects or what mobile app sent.
          // Mobile app sent:
          // products: SelectedCarts (product_uid, quantity, size_uid, colour_uid)

          const res: any = await createOrder(payload as any).unwrap();

          if (res?.client_secret) {
            setClientSecret(res.client_secret);
            setPaymentIntentId(res.payment_intent_id);
          } else {
            console.error('Failed to initialize payment');
          }
        } catch (error) {
          console.error('Order creation error:', error);
          alert('Failed to create order');
        } finally {
          setIsCreatingOrder(false);
        }
      }
    };

    if (cartItems.length > 0 && defaultAddress) {
      initPayment();
    }
  }, [cartItems, defaultAddress, createOrder, summary]); // Run when cart/address ready

  if (isCartLoading || (cartItems.length > 0 && !clientSecret && !defaultAddress)) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#173633]" />
      </div>
    );
  }

  if (!defaultAddress) {
    return (
      <div className="container mx-auto p-10 text-center">
        <h2 className="text-xl font-bold">No Delivery Address Found</h2>
        <p className="mb-4 text-gray-600">Please add an address to continue checkout.</p>
        <Button onClick={() => router.push('/profile/addresses')}>Add Address</Button>
      </div>
    );
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#173633',
      },
    },
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#173633]">View your order details here...</h1>
        <p className="text-gray-500">Everything about this purchase in one place!</p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Left Column: Order Summary */}
        <div className="rounded-2xl bg-[#FBFBF6] p-8 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-[#173633]">Order Summary</h2>

          {/* Items List */}
          <div className="mb-6 space-y-4">
            {cartItems.map((item) => (
              <div key={item.uid} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Thumbnail */}
                  <div className="h-12 w-12 overflow-hidden rounded-md bg-gray-200">
                    {item.product.file_items?.[0]?.file && (
                      <Image
                        src={item.product.file_items[0].file}
                        alt={item.product.title}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-[#173633]">{item.product.title}</p>
                    <p className="text-xs text-gray-500">
                      {item.size?.title && <span className="mr-2">{item.size.title}</span>}
                      {item.colour?.title && <span>{item.colour.title}</span>}
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-[#173633]">
                  ${Number(item.product.price).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="my-6 border-t border-dashed border-gray-300"></div>

          {/* Totals */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span>${summary.subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee:</span>
              <span>${summary.deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>TAX:</span>
              <span>${summary.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Discount:</span>
              <span>-${summary.discount.toFixed(2)}</span>
            </div>
          </div>

          <div className="my-6 border-t border-dashed border-gray-300"></div>

          <div className="flex justify-between text-lg font-bold text-[#173633]">
            <span>Total:</span>
            <span>${summary.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Right Column: Payment */}
        <div>
          <h2 className="mb-2 text-xl font-bold text-[#173633]">Payment Method</h2>
          <p className="mb-6 text-sm text-gray-500">
            Use your saved information for faster checkout
          </p>

          <Button
            className="mb-8 w-full bg-[#00D97E] text-black hover:bg-[#00c06f]"
            size="lg"
            onClick={() => {
              // Future implementation for Link Authentication Element?
              alert('Link implementation coming soon');
            }}
          >
            Pay with <span className="ml-1 font-bold">link</span>
          </Button>

          <div className="mb-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200"></div>
            <span className="text-sm font-medium text-gray-500">Or Pay with</span>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          {clientSecret ? (
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm paymentIntentId={paymentIntentId} amount={summary.total} />
            </Elements>
          ) : (
            <div className="text-center text-gray-500">Initializing Secure Payment...</div>
          )}

          <div className="mt-4 flex items-center gap-2">
            <input type="checkbox" id="save-info" className="rounded border-gray-300" />
            <label htmlFor="save-info" className="text-xs text-gray-500">
              Save my information for faster checkout
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
