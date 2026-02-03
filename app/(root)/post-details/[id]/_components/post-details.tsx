import Icon from '@/lib/icon';
import { cn } from '@/lib/utils';
import { timeAgoShort } from '@/lib/helper';
import { Button } from '@/components/ui/button';
import VideoPlayer from '@/components/shared/video-player';
import { useHeaderHeight } from '@/hooks/use-header-height';
import PostImageSlider from '@/components/shared/PostImageSlider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { useGetContentBySlugQuery } from '@/redux/api/globalApi';
import { mapContentToPostCard } from '@/lib/mapper';
import Circle3DLoader from '@/components/shared/circle-loader';

const PostDetails = ({ slug }: { slug: string }) => {
  const { data: content, isLoading, isError } = useGetContentBySlugQuery(slug);
  const headerHeight = useHeaderHeight();

  console.log('content', content);

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Circle3DLoader />
      </div>
    );
  }

  if (isError || !content) {
    return (
      <div className="py-10 text-center text-red-500">
        Failed to load post details.
      </div>
    );
  }

  const post = mapContentToPostCard(content);
  console.log('Post details:', post);

  const initials = post.profile.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div
      style={{
        top: `calc(${headerHeight + 12}px)`,
      }}
      className={cn('transition-all duration-300')}
    >
      <div className="mb-6 flex items-center justify-between">
        <Link
          href={`/instructor/${post.id}`}
          className="flex items-center gap-3"
        >
          <Avatar className="size-16">
            <AvatarImage src={post.profile.image} className="object-cover" />
            <AvatarFallback className="bg-primary text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5">
            <span className="text-black-10 text-xl font-medium">
              {post.profile.name}
            </span>
            <span className="text-black-7 text-sm">
              {timeAgoShort(post.profile.last_active)}
            </span>
          </div>
        </Link>

        <Button
          variant={'secondary'}
          className="bg-primary-200 hover:bg-primary-300 text-primary font-semibold"
        >
          Subscribe
        </Button>
      </div>

      {post.media.type === 'image' ? (
        <>
          {post.media.images.length > 0 ? (
            <PostImageSlider images={post.media.images} />
          ) : (
            <div className="aspect-708/611 w-full rounded-2xl bg-white md:rounded-3xl"></div>
          )}
        </>
      ) : (
        <VideoPlayer src={post.media.src} />
      )}

      <div>
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
        <h2 className="text-black-10 mt-4 mb-2 text-2xl font-medium">
          {post.title}
        </h2>
        <p className="text-black-8 text-xl">{post.description}</p>
        {post.tags && post.tags.length > 0 && (
          <p className="text-xl text-[#3B82F6]">
            {post.tags.map((tag) => `#${tag}`).join(' ')}
          </p>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
