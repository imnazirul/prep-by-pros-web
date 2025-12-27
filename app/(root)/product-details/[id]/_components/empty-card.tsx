'use client';

import Icon from '@/lib/icon';
import { useHeaderHeight } from '@/hooks/use-header-height';

const EmptyCard = () => {
  const headerHeight = useHeaderHeight();
  return (
    <div
      style={{
        minHeight: `calc(100vh - ${headerHeight}px)`,
      }}
      className="container flex flex-col items-center justify-center gap-6 py-12 text-center"
    >
      <Icon
        name={'shopping_bag'}
        height={40}
        width={40}
        className="text-black-10 group-hover:text-black-10 size-6"
      />
      <h2 className="text-black-10 text-2xl font-medium md:text-3xl lg:text-4xl">
        No Product Found
      </h2>
    </div>
  );
};

export default EmptyCard;
