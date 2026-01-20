import Link from 'next/link';
import Icon from '@/lib/icon';
import { cn } from '@/lib/utils';
import { feedPost } from '@/data';
import RecentUploads from './recent-uploads';
import VideoPlayer from '@/components/shared/video-player';
import { Button, buttonVariants } from '@/components/ui/button';
import PostImageSlider from '@/components/shared/PostImageSlider';

type ParamsProps = {
  params: Promise<{ id: string }>;
};

const PostDetailsPage = async ({ params }: ParamsProps) => {
  const { id } = await params;

  const post = feedPost.find((o) => String(o.id) == id);

  if (!post) {
    return;
  }
  return (
    <div>
      <div className="relative">
        {post.media.type === 'image' ? (
          <PostImageSlider
            images={post.media.images}
            className="aspect-auto h-80 sm:h-88 md:h-120 lg:h-165"
          />
        ) : (
          <VideoPlayer
            src={post.media.src}
            className="aspect-auto h-80 sm:h-88 md:h-120 lg:h-165"
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
              <span>{post.views}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Icon name="sent" height={22} width={22} />
              <span>{post.share}</span>
            </div>
          </div>

          <p className="text-black-7">Uploaded on 14 April, 2025</p>
        </div>

        <h2 className="text-black-10 mt-4 mb-2 text-2xl font-medium">{post.title}</h2>
        <p className="text-black-8 text-xl">{post.description}</p>
        {post.tags && post.tags.length > 0 && (
          <p className="text-xl text-[#3B82F6]">{post.tags.map((tag) => `#${tag}`).join(' ')}</p>
        )}
      </div>

      <RecentUploads />
    </div>
  );
};

export default PostDetailsPage;
