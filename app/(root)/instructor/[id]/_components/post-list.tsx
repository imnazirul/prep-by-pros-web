'use client';

import Icon from '@/lib/icon';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { feedPost } from '@/data';
import { Button } from '@/components/ui/button';
import PostCard from '@/components/shared/post-card';

const PostList = () => {
  const [tab, setTab] = useState<'ALL' | 'VIDEOS' | 'PHOTOS'>('ALL');

  const videoList = feedPost.filter((post) => post.media.type === 'video');
  const imageList = feedPost.filter((post) => post.media.type === 'image');

  const filterList =
    tab === 'VIDEOS' ? videoList : tab === 'PHOTOS' ? imageList : feedPost;
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {[
            {
              label: 'All',
              type: 'ALL',
            },
            {
              label: 'Videos',
              type: 'VIDEOS',
            },
            {
              label: 'Photos',
              type: 'PHOTOS',
            },
          ].map(({ label, type }) => (
            <Button
              key={label}
              type="button"
              onClick={() => setTab(type as 'ALL' | 'VIDEOS' | 'PHOTOS')}
              variant={'secondary'}
              className={cn(
                tab === type
                  ? 'bg-black-10 hover:bg-black-10/90 font-semibold text-white'
                  : 'font-normal',
              )}
            >
              {label}
            </Button>
          ))}
        </div>

        <Button variant={'secondary'} className="font-normal">
          <Icon height={24} width={24} name="filter_vertical" />
          Filter by
        </Button>
      </div>

      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filterList.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
