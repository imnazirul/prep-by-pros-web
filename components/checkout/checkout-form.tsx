'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/cart-context';
import { usePatchPaymentMutation } from '@/redux/api/authApi';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface CheckoutFormProps {
  paymentIntentId: string;
  amount: number;
}

export default function CheckoutForm({ paymentIntentId, amount }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { clearCart } = useCart();

  const [patchPayment] = usePatchPaymentMutation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      // 1. Confirm Payment with Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
        redirect: 'if_required', // Avoid redirect if possible to handle backend update synchronously
      });

      if (error) {
        setErrorMessage(error.message || 'An unknown error occurred');
        alert(error.message || 'Payment failed');
        setIsLoading(false);
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // 2. Update Backend
        await patchPayment({
          payment_intent_id: paymentIntent.id,
          body: {
            status: 'SUCCEEDED',
            cart_uids: [],
          },
        }).unwrap();

        console.log('Payment successful!');
        clearCart();
        router.push('/checkout/success');
      }
    } catch (err: any) {
      console.error('Payment error', err);
      setErrorMessage(err.message || 'Payment processing failed');
      alert('Payment processing failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <PaymentElement />
      {errorMessage && <div className="text-sm text-red-500">{errorMessage}</div>}
      <Button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full bg-[#173633] text-white hover:bg-[#245550]"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          `Submit`
        )}
      </Button>
    </form>
  );
}
