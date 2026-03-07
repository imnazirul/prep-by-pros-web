'use client';

import Circle3DLoader from '@/components/shared/circle-loader';
import PostCard from '@/components/shared/post-card';
import { Button } from '@/components/ui/button';
import Icon from '@/lib/icon';
import { mapContentToPostCard } from '@/lib/mapper';
import { cn } from '@/lib/utils';
import { useGetContentsQuery } from '@/redux/api/globalApi';
import { useState } from 'react';

const PostList = () => {
  const [tab, setTab] = useState<'ALL' | 'FEED' | 'TRENDING'>('ALL');
  const { data, isLoading, isError } = useGetContentsQuery();

  const contents = data?.results || [];
  const mappedData = contents.map(mapContentToPostCard);

  if (isLoading) {
    return (
      <section>
        <div className="container flex h-[400px] items-center justify-center">
          <Circle3DLoader />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section>
        <div className="container">
          <p className="text-center text-red-500">Failed to load feed. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {[
                { label: 'All', type: 'ALL' },
                { label: 'My Feed', type: 'FEED' },
                { label: 'Trending', type: 'TRENDING' },
              ].map(({ label, type }) => (
                <Button
                  key={label}
                  type="button"
                  onClick={() => setTab(type as 'ALL' | 'FEED' | 'TRENDING')}
                  variant={'secondary'}
                  className={cn(
                    tab === type
                      ? 'bg-black-10 hover:bg-black-10/90 font-semibold text-white'
                      : 'font-normal'
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

          {mappedData.length > 0 ? (
            <div className="mb-10 gap-4 sm:columns-2 md:columns-3 xl:columns-4 2xl:columns-5">
              {mappedData.map((post) => (
                <PostCard key={post.id} layout="auto" post={post} />
              ))}
            </div>
          ) : (
            <p className="text-black-4 py-20 text-center">No content found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PostList;
