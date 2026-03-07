'use client';

import PostImageSlider from '@/components/shared/PostImageSlider';
import VideoPlayer from '@/components/shared/video-player';
import { Button, buttonVariants } from '@/components/ui/button';
import Icon from '@/lib/icon';
import { API_BASE_URL } from '@/lib/mapper';
import { cn } from '@/lib/utils';
import { useGetMeContentQuery } from '@/redux/api/authApi';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import RecentUploads from '../recent-uploads';

const CreatorPostDetails = ({ id }: { id: string }) => {
  const { data: content, isLoading, isError } = useGetMeContentQuery(id);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !content) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-red-500">Failed to load content.</p>
      </div>
    );
  }

  const getFullUrl = (url: string | undefined | null) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${API_BASE_URL}${url}`;
  };

  const fileItems = content.file_items || [];

  // Logic to determine media type (similar to mapper)
  const videoFile = fileItems.find(
    (f: any) =>
      ['VIDEO', 'MOV', 'MP4'].includes(f.kind?.toUpperCase() || '') ||
      f.file?.match(/\.(mp4|mov|3gp)$/i)
  );

  const imageFiles = fileItems
    .filter(
      (f: any) =>
        ['IMAGE', 'JPG', 'JPEG', 'PNG', 'WEBP'].includes(f.kind?.toUpperCase() || '') ||
        f.file?.match(/\.(jpg|jpeg|png|webp|gif)$/i) ||
        f.thumbnail?.match(/\.(jpg|jpeg|png|webp|gif)$/i) ||
        (!f.kind && (f.file || f.thumbnail))
    )
    .map((f: any) => getFullUrl(f.file || f.thumbnail || ''))
    .filter(Boolean);

  const isVideo = !!videoFile;
  const mediaSrc = isVideo ? getFullUrl(videoFile.file) : '';

  return (
    <div>
      <div className="relative">
        {!isVideo ? (
          <PostImageSlider
            images={imageFiles}
            className="aspect-auto h-80 sm:h-88 md:h-120 lg:h-165"
          />
        ) : (
          <VideoPlayer
            src={mediaSrc}
            className="aspect-auto h-80 sm:h-88 md:h-120 lg:h-165"
            contentUid={content.uid}
          />
        )}

        <div className="absolute inset-x-5 top-5 z-50 flex items-center justify-between">
          <Link
            href={'/creator/profile'}
            className={cn(
              buttonVariants({
                variant: 'secondary',
                size: 'icon',
              }),
              'size-13 bg-white hover:bg-white'
            )}
          >
            <Icon height={24} width={24} name="arrow_left" className="text-black-10" />
          </Link>

          <Button
            variant={'secondary'}
            size={'icon'}
            className={cn('size-13 bg-white hover:bg-white')}
          >
            <Icon height={24} width={24} name="more_vertical" className="text-black-10" />
          </Button>
        </div>
      </div>

      <div className="mb-10">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="text-black-8 mt-5 flex items-center gap-4 text-lg">
            <div className="flex items-center gap-1.5">
              <Icon name="view" height={22} width={22} />
              <span>{content.view_count || 0}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Icon name="sent" height={22} width={22} />
              <span>{content.share_count || 0}</span>
            </div>
          </div>

          <p className="text-black-7">
            Uploaded on{' '}
            {new Date(content.created_at || Date.now()).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        <h2 className="text-black-10 mt-4 mb-2 text-2xl font-medium">{content.title}</h2>
        <p className="text-black-8 text-xl">{content.description}</p>
        {/* Tags are not explicit in Content type but often present or related */}
      </div>

      <RecentUploads />
    </div>
  );
};

export default CreatorPostDetails;
