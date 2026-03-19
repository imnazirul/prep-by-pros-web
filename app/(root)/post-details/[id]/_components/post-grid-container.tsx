/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import PostList from './post-list';
import PostDetails from './post-details';
// import { PostCardProp } from '@/lib/types';
import { useHeaderHeight } from '@/hooks/use-header-height';

const PostGridContainer = ({ slug }: { slug: string }) => {
  const headerHeight = useHeaderHeight();

  // Only used on lg+ via tailwind class `lg:h-[var(--split-h)]`
  const style = {
    ['--split-h' as any]: `calc(100vh - ${headerHeight + 200}px)`,
  } as React.CSSProperties;

  return (
    <div
      style={style}
      className="grid items-start gap-10 lg:h-(--split-h) lg:min-h-0 lg:grid-cols-[5fr_7fr] lg:overflow-hidden"
    >
      {/* LEFT: scrolls when hovered */}
      <div className="hide-scrollbar min-h-0 lg:h-full lg:overflow-y-auto lg:overscroll-contain">
        <PostDetails slug={slug} />
      </div>

      {/* RIGHT: scrolls when hovered */}
      <div className="hide-scrollbar min-h-0 lg:h-full lg:overflow-y-auto lg:overscroll-contain">
        <PostList />
      </div>
    </div>
  );
};

export default PostGridContainer;
