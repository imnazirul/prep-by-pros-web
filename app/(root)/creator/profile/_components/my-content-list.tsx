'use client';

import PostCard from '@/components/shared/post-card';
import { Button } from '@/components/ui/button';
import Icon from '@/lib/icon';
import { mapContentToPostCard } from '@/lib/mapper';
import { cn } from '@/lib/utils';
import { useGetMeContentsQuery } from '@/redux/api/authApi';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const MyContentList = () => {
  const [tab, setTab] = useState<'ALL' | 'VIDEOS' | 'PHOTOS'>('ALL');

  const { data: contentsData, isLoading, isError } = useGetMeContentsQuery({});

  const contents = contentsData?.results || [];

  if (isLoading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-60 items-center justify-center text-red-500">
        Failed to load content.
      </div>
    );
  }

  const mappedPosts = contents.map(mapContentToPostCard);

  const videoList = mappedPosts.filter((post) => post.media.type === 'video');
  const imageList = mappedPosts.filter((post) => post.media.type === 'image');

  const filterList = tab === 'VIDEOS' ? videoList : tab === 'PHOTOS' ? imageList : mappedPosts;

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

      {filterList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg text-muted-foreground">No content found.</p>
        </div>
      ) : (
        <div className="mb-10 gap-4 sm:columns-2 lg:columns-3">
          {filterList
            .filter((post) => !post.is_lock)
            .map((post) => (
              <PostCard layout="auto" key={post.id} post={post} />
            ))}
        </div>
      )}
    </div>
  );
};

export default MyContentList;
