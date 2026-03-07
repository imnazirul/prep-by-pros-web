import CreatorPostDetails from './_components/creator-post-details';

type ParamsProps = {
  params: Promise<{ id: string }>;
};

const PostDetailsPage = async ({ params }: ParamsProps) => {
  const { id } = await params;

  return <CreatorPostDetails id={id} />;
};

export default PostDetailsPage;
