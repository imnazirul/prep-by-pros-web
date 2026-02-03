'use client';

import { useGetContentsQuery, Content, FileItem } from '@/redux/api/globalApi';
import { PostCardProp } from '@/lib/types';
import Icon from '@/lib/icon';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import PostCard from '@/components/shared/post-card';
import Circle3DLoader from '@/components/shared/circle-loader';

const PostList = () => {
  const [tab, setTab] = useState<'ALL' | 'FEED' | 'TRENDING'>('ALL');
  const { data, isLoading, isError } = useGetContentsQuery();
  console.log('data feed', data);

  const API_BASE_URL = 'https://prepbyprop.jumatechs.xyz';

  const mapContentToPostCard = (content: Content): PostCardProp => {
    const fileItems = (content.file_items as FileItem[]) || [];

    const getFullUrl = (url: string) => {
      if (!url) return '';
      if (url.startsWith('http')) return url;
      return `${API_BASE_URL}${url}`;
    };

    // Strategy: Find video if exists, else everything else is an image
    const videoFile = fileItems.find((f) =>
      ['VIDEO', 'MOV', 'MP4'].includes(f.kind?.toUpperCase() || '') ||
      f.file?.match(/\.(mp4|mov|3gp)$/i)
    );

    const imageFiles = fileItems
      .filter((f) =>
        ['IMAGE', 'JPG', 'JPEG', 'PNG', 'WEBP'].includes(f.kind?.toUpperCase() || '') ||
        f.file?.match(/\.(jpg|jpeg|png|webp|gif)$/i) ||
        (!f.kind && f.file)
      )
      .map((f) => getFullUrl(f.file))
      .filter(Boolean);

    // If still no images but we have files, just use them as images (best effort)
    const finalImages = imageFiles.length > 0 ? imageFiles : fileItems.map((f) => getFullUrl(f.file)).filter(Boolean);

    const media: PostCardProp['media'] = videoFile
      ? {
          type: 'video',
          src: getFullUrl(videoFile.file),
          duration: videoFile.duration_count
            ? `${Math.floor(videoFile.duration_count / 60)}:${(videoFile.duration_count % 60)
                .toString()
                .padStart(2, '0')}`
            : '0:00',
        }
      : {
          type: 'image',
          images: finalImages,
        };

    return {
      id: content.slug,
      title: content.title,
      description: content.description,
      views: content.view_count?.toString() || '0',
      share: content.share_count?.toString() || '0',
      media,
      profile: {
        name: content.user
          ? `${content.user.first_name || ''} ${content.user.last_name || ''}`.trim() ||
            content.user.username
          : 'Unknown',
        image: getFullUrl(content.user?.image),
        last_active: new Date(content.created_at),
      },
      category: 'Workout',
      tags: [],
      is_lock: content.is_file_item_un_locked === false || content.is_file_item_un_locked === 'False',
    };
  };

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
