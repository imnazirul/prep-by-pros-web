import Circle3DLoader from '@/components/shared/circle-loader';
import PostImageSlider from '@/components/shared/PostImageSlider';
import VideoPlayer from '@/components/shared/video-player';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useHeaderHeight } from '@/hooks/use-header-height';
import { timeAgoShort } from '@/lib/helper';
import Icon from '@/lib/icon';
import { mapContentToPostCard } from '@/lib/mapper';
import { cn } from '@/lib/utils';
import { useGetMeContentsQuery, useRetrieveMeQuery } from '@/redux/api/authApi';
import { useGetContentBySlugQuery } from '@/redux/api/globalApi';
import Link from 'next/link';

const PostDetails = ({ slug }: { slug: string }) => {
  const {
    data: globalContent,
    isLoading: isGlobalLoading,
    isError: isGlobalError,
    error: globalError,
  } = useGetContentBySlugQuery(slug);

  // Fallback to fetching "own" post via authApi if global api returns 404
  const {
    data: meContentsResponse,
    isLoading: isMeLoading,
    isError: isMeError,
    error: meError,
  } = useGetMeContentsQuery(undefined, {
    skip: !isGlobalError, // Only run if the global fetch failed
  });

  const meContent = meContentsResponse?.results?.find((c) => c.slug === slug);
  const content = globalContent || meContent;
  const isLoading = isGlobalLoading || (isGlobalError && isMeLoading);
  const isError = isGlobalError && isMeError;

  const headerHeight = useHeaderHeight();

  const { data: currentUser } = useRetrieveMeQuery(undefined, {
    skip: !!content?.user, // No need to fetch if the post already has an author
  });

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Circle3DLoader />
      </div>
    );
  }

  if (isError || !content) {
    const is403Error = (globalError as any)?.status === 403 || (meError as any)?.status === 403;

    if (is403Error) {
      return (
        <div className="flex h-[400px] flex-col items-center justify-center space-y-4 px-4 text-center">
          <Icon name="lock" height={64} width={64} className="text-black-5" />
          <h2 className="text-2xl font-semibold text-black-10">Premium Content</h2>
          <p className="max-w-[400px] text-black-8">
            This content is locked. You do not have permission to view this post. Please subscribe
            to the instructor to gain access.
          </p>
        </div>
      );
    }

    return (
      <div className="py-10 px-4">
        <div className="mb-4 text-center font-bold text-red-500">Failed to load post details.</div>
      </div>
    );
  }

  const post = mapContentToPostCard({
    ...content,
    user: content?.user || currentUser, // Fallback to signed-in user if missing
  } as any);

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
        <Link href={`/instructor/${post.profile.slug}`} className="flex items-center gap-3">
          <Avatar className="size-16">
            <AvatarImage src={post.profile.image} className="object-cover" />
            <AvatarFallback className="bg-primary text-xs">{initials}</AvatarFallback>
          </Avatar>
          <div className="grid gap-0.5">
            <span className="text-black-10 text-xl font-medium">{post.profile.name}</span>
            <span className="text-black-7 text-sm">{timeAgoShort(post.profile.last_active)}</span>
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
        <VideoPlayer src={post.media.src} contentUid={content?.uid || content?.slug} />
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
        <h2 className="text-black-10 mt-4 mb-2 text-2xl font-medium">{post.title}</h2>
        <p className="text-black-8 text-xl">{post.description}</p>
        {post.tags && post.tags.length > 0 && (
          <p className="text-xl text-[#3B82F6]">{post.tags.map((tag) => `#${tag}`).join(' ')}</p>
        )}
      </div>
    </div>
  );
};

export default PostDetails;
