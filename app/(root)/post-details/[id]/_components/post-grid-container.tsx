// OLD CODE

/* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client';

// import PostList from './post-list';
// import PostDetails from './post-details';
// import { PostCardProp } from '@/lib/types';

// const PostGridContainer = ({ post }: { post: PostCardProp }) => {
//   return (
//     <div className="grid items-start gap-10 lg:grid-cols-[5fr_7fr]">
//       <PostDetails post={post} />
//       <PostList />
//     </div>
//   );
// };

// export default PostGridContainer;

'use client';

import PostList from './post-list';
import PostDetails from './post-details';
import { PostCardProp } from '@/lib/types';
import { useHeaderHeight } from '@/hooks/use-header-height';

const PostGridContainer = ({ post }: { post: PostCardProp }) => {
  const headerHeight = useHeaderHeight();

  // Only used on lg+ via tailwind class `lg:h-[var(--split-h)]`
  const style = {
    ['--split-h' as any]: `calc(100vh - ${headerHeight + 24}px)`,
  } as React.CSSProperties;

  return (
    <div
      style={style}
      className="grid items-start gap-10 lg:h-(--split-h) lg:min-h-0 lg:grid-cols-[5fr_7fr] lg:overflow-hidden"
    >
      {/* LEFT: scrolls when hovered */}
      <div className="hide-scrollbar min-h-0 lg:h-full lg:overflow-y-auto lg:overscroll-contain">
        <PostDetails post={post} />
      </div>

      {/* RIGHT: scrolls when hovered */}
      <div className="hide-scrollbar min-h-0 lg:h-full lg:overflow-y-auto lg:overscroll-contain">
        <PostList />
      </div>
    </div>
  );
};

export default PostGridContainer;
