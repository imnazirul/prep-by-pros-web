import { Metadata } from 'next';
import { feedPost } from '@/data';
import PageHeader from '@/components/shared/page-header';
import NavbarHeight from '@/components/shared/navbar-height';
import PostGridContainer from './_components/post-grid-container';

type ParamsProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: ParamsProps): Promise<Metadata> {
  const { id } = await params;

  const post = feedPost.find((o) => String(o.id) == id);

  return {
    title: post ? `${post.title}` : 'Post Details',
  };
}

const PostDetailsPage = async ({ params }: ParamsProps) => {
  const { id } = await params;

  // The 'id' in the URL is actually the slug
  return (
    <div>
      <NavbarHeight />
      <PageHeader
        title="Find your best workout instructions here..."
        subTitle="Updates each week on Sunday!"
      />

      <div className="container">
        <PostGridContainer slug={id} />
      </div>
    </div>
  );
};

export default PostDetailsPage;
