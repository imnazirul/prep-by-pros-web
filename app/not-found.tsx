import Link from 'next/link';
import Icon from '@/lib/icon';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="mb-8">
          <h2 className="text-primary text-7xl font-semibold">404</h2>
          <p className="text-black-8 mt-2 text-3xl font-bold">Page not found</p>
          <p className="text-black-7 mt-2 text-xl">
            Sorry, we couldn&apos;t find the page you&apos;re looking for.
          </p>
        </div>
        <div className="mt-8">
          <Link href="/" className={cn(buttonVariants({ variant: 'default' }))}>
            <Icon name="arrow_left" />
            Go back home
          </Link>
        </div>
      </div>
      <div className="mt-16 w-full max-w-2xl">
        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-primary-200 px-2 text-sm text-gray-500">
              If you think this is a mistake, please contact support
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
