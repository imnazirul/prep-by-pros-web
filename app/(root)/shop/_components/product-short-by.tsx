import Icon from '@/lib/icon';
import { Button } from '@/components/ui/button';

const ProductShortBy = () => {
  return (
    <Button variant="secondary" className="px-8">
      <Icon
        name="filter_vertical"
        height={24}
        width={24}
        className="text-black-8"
      />
      Sort by
    </Button>
  );
};

export default ProductShortBy;
