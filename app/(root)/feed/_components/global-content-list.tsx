'use client';

import Circle3DLoader from '@/components/shared/circle-loader';
import PostCard from '@/components/shared/post-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';
import Icon from '@/lib/icon';
import { mapContentToPostCard } from '@/lib/mapper';
import { cn } from '@/lib/utils';
import { useGetContentsQuery } from '@/redux/api/globalApi';
import { useState } from 'react';

const GlobalContentList = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState<'ALL' | 'VIDEOS' | 'PHOTOS'>('ALL');

  const {
    data: contentsData,
    isLoading,
    isError,
  } = useGetContentsQuery({
    page,
    page_size: 20,
    search: debouncedSearch,
  });

  const contents = contentsData?.results || [];
  const hasNext = !!contentsData?.next;
  const hasPrev = !!contentsData?.previous;

  // Ideally, API supports filtering by kind (video/photo).
  // If not, we filter locally, but local filter on paginated data is weird.
  // For now, let's keep tab UI but maybe disable it if API doesn't filtering, OR filter the current page.
  // Filtering current page is acceptable for MVP.

  const mappedPosts = contents.map(mapContentToPostCard);

  const videoList = mappedPosts.filter((post) => post.media.type === 'video');
  const imageList = mappedPosts.filter((post) => post.media.type === 'image');

  const filterList = tab === 'VIDEOS' ? videoList : tab === 'PHOTOS' ? imageList : mappedPosts;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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

        <div className="relative w-full md:w-72">
          <Icon
            name="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            width={18}
            height={18}
          />
          <Input
            placeholder="Search content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>
      {isLoading ? (
        <div className="flex h-60 items-center justify-center">
          <Circle3DLoader />
        </div>
      ) : isError ? (
        <div className="flex h-60 items-center justify-center text-red-500">
          Failed to load content.
        </div>
      ) : filterList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg text-muted-foreground">No content found.</p>
        </div>
      ) : (
        <>
          <div className="mb-10 gap-4 sm:columns-2 md:columns-3 xl:columns-4 2xl:columns-5">
            {filterList.map((post) => (
              <PostCard layout="auto" key={post.id} post={post} />
            ))}
          </div>

          <div className="flex items-center justify-end gap-2">
            <Button
              variant="outline"
              disabled={!hasPrev}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <span className="text-sm">Page {page}</span>
            <Button variant="outline" disabled={!hasNext} onClick={() => setPage((p) => p + 1)}>
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default GlobalContentList;
