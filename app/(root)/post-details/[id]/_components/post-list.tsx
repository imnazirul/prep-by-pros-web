'use client';

import Icon from '@/lib/icon';
import { feedPost } from '@/data';
import { Button } from '@/components/ui/button';
import PostCard from '@/components/shared/post-card';

const PostList = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-black-10 text-2xl font-medium md:text-3xl lg:text-4xl">
          Creations you might love
        </h3>

        <Button variant={'secondary'} className="font-normal">
          <Icon height={24} width={24} name="filter_vertical" />
          Filter by
        </Button>
      </div>

      <div className="gap-4 sm:columns-2 lg:columns-2 2xl:columns-3">
        {feedPost.map((post) => (
          <PostCard layout="auto" key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
