'use client';

import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CheckoutSuccessPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
        <CheckCircle2 className="h-12 w-12 text-green-600" />
      </div>
      <h1 className="mb-2 text-3xl font-bold text-[#173633]">Order Confirmed!</h1>
      <p className="mb-8 max-w-md text-gray-600">
        Thank you for your purchase. Your order has been placed successfully and is being processed.
      </p>

      <div className="flex gap-4">
        <Button onClick={() => router.push('/shop')} variant="outline">
          Continue Shopping
        </Button>
        <Button
          onClick={() => router.push('/account/orders')}
          className="bg-[#173633] text-white hover:bg-[#245550]"
        >
          View My Orders
        </Button>
      </div>
    </div>
  );
}
