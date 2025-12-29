'use client';

import Icon from '@/lib/icon';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { feedPost } from '@/data';
import { Button } from '@/components/ui/button';
import PostCard from '@/components/shared/post-card';

const PostList = () => {
  const [tab, setTab] = useState<'ALL' | 'FEED' | 'TRENDING'>('ALL');

  const filteredData = feedPost.filter((post) => !post.is_lock);
  return (
    <section>
      <div className="container">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {[
                {
                  label: 'All',
                  type: 'ALL',
                },
                {
                  label: 'My Feed',
                  type: 'FEED',
                },
                {
                  label: 'Trending',
                  type: 'TRENDING',
                },
              ].map(({ label, type }) => (
                <Button
                  key={label}
                  type="button"
                  onClick={() => setTab(type as 'ALL' | 'FEED' | 'TRENDING')}
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

          <div className="mb-10 gap-4 sm:columns-2 md:columns-3 xl:columns-4 2xl:columns-5">
            {filteredData.map((post) => (
              <PostCard key={post.id} layout="auto" post={post} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostList;
