import { Metadata } from 'next';
import { products } from '@/data';
import EmptyCard from './_components/empty-card';
import PageHeader from '@/components/shared/page-header';
import NavbarHeight from '@/components/shared/navbar-height';
import ProductDetails from './_components/product-details';

type ParamsProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: ParamsProps): Promise<Metadata> {
  const { id } = await params;

  const product = products.find((o) => String(o.id) == id);

  return {
    title: product ? product.name : 'Product Details',
  };
}

const ProductDetailsPage = async ({ params }: ParamsProps) => {
  const { id } = await params;

  const product = products.find((o) => String(o.id) == id);

  return (
    <div>
      <NavbarHeight />
      {product ? (
        <>
          <PageHeader
            title="View your order details here…"
            subTitle="Everything about this purchase in one place!"
          />

          <ProductDetails product={product} />
        </>
      ) : (
        <EmptyCard />
      )}
    </div>
  );
};

export default ProductDetailsPage;
