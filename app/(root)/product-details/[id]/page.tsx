import NavbarHeight from '@/components/shared/navbar-height';
import PageHeader from '@/components/shared/page-header';
import { Metadata } from 'next';
import ProductDetails from './_components/product-details';

type ParamsProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: ParamsProps): Promise<Metadata> {
  const { id } = await params;

  return {
    title: `Product Details - ${id}`,
  };
}

const ProductDetailsPage = async ({ params }: ParamsProps) => {
  const { id } = await params;

  return (
    <div>
      <NavbarHeight />
      <PageHeader
        title="View your order details here…"
        subTitle="Everything about this purchase in one place!"
      />

      <ProductDetails slug={id} />
    </div>
  );
};

export default ProductDetailsPage;
