import { Metadata } from 'next';
import ShopCategoryContent from './_components/shop-category-content';

export const metadata: Metadata = {
  title: 'Shop',
};

const ShopCategoryPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  return <ShopCategoryContent slug={slug} />;
};

export default ShopCategoryPage;
