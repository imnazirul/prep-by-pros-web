import Icon from '@/lib/icon';
import { Button } from '@/components/ui/button';
import PostCard from '@/components/shared/post-card';
import { useGetContentsQuery } from '@/redux/api/globalApi';
import { mapContentToPostCard } from '@/lib/mapper';
import Circle3DLoader from '@/components/shared/circle-loader';

const PostList = () => {
  const { data, isLoading } = useGetContentsQuery();

  const contents = data?.results || [];
  const mappedData = contents.map(mapContentToPostCard);

  if (isLoading) {
    return (
      <div className="flex h-50 items-center justify-center">
        <Circle3DLoader />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-black-10 text-2xl font-medium md:text-3xl lg:text-4xl">
          Creations you might love
        </h3>

        <Button variant={'secondary'} className="font-normal">
          <Icon height={24} width={24} name="filter_vertical" />
          Filter by
        </Button>
      </div>

      {mappedData.length > 0 ? (
        <div className="gap-4 sm:columns-2 lg:columns-2 2xl:columns-3">
          {mappedData.map((post) => (
            <PostCard layout="auto" key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-black-4 py-10 text-center">No additional creations found.</p>
      )}
    </div>
  );
};

export default PostList;
