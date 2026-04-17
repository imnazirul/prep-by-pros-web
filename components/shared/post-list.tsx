'use client';

import Icon from '@/lib/icon';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { feedPost } from '@/data';
import { Button } from '@/components/ui/button';
import PostCard from '@/components/shared/post-card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const PostList = () => {
  const [tab, setTab] = useState<'ALL' | 'VIDEOS' | 'PHOTOS'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const videoList = feedPost.filter((post) => post.media.type === 'video');
  const imageList = feedPost.filter((post) => post.media.type === 'image');

  let filterList =
    tab === 'VIDEOS' ? videoList : tab === 'PHOTOS' ? imageList : feedPost;

  if (selectedCategory !== 'ALL') {
    filterList = filterList.filter((post) => post.category === selectedCategory);
  }

  // Extract unique categories from feedPost
  const categories = Array.from(
    new Set(feedPost.map((post) => post.category).filter(Boolean))
  );

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

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'secondary'} className="font-normal capitalize">
              <Icon height={24} width={24} name="filter_vertical" />
              {selectedCategory === 'ALL' ? 'Filter by' : selectedCategory}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem onClick={() => setSelectedCategory('ALL')}>
              All Categories
            </DropdownMenuItem>
            {categories.map((category) => (
              <DropdownMenuItem
                key={category}
                onClick={() => setSelectedCategory(category || '')}
              >
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mb-10 gap-4 sm:columns-2 lg:columns-3">
        {filterList
          .filter((post) => !post.is_lock)
          .map((post) => (
            <PostCard layout="auto" key={post.id} post={post} />
          ))}
      </div>
    </div>
  );
};

export default PostList;
