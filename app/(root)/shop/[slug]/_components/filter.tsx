'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Icon from '@/lib/icon';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import {
  useGetBrandFiltersQuery,
  useGetColorFiltersQuery,
  useGetSizeFiltersQuery,
  useGetStyleFiltersQuery,
} from '@/redux/api/globalApi';
import { useEffect } from 'react';

const shortByOptions = [
  { title: 'Popularity', slug: 'popularity' },
  { title: 'Rating', slug: 'rating' },
  { title: 'Best Selling', slug: 'best_selling' },
  { title: 'Alphabetically', slug: 'title' },
];

const Filter = () => {
  const [selectedSize, setSelectedSize] = useState(-1);
  const [selectedBrand, setSelectedBrand] = useState(-1);
  const [selectedColor, setSelectedColor] = useState(-1);
  const [selectedStyle, setSelectedStyle] = useState(-1);
  const [selectedSortBy, setSelectedSortBy] = useState(-1);
  const [range, setRange] = useState<[number, number]>([0, 200]);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { data: sizes = [] } = useGetSizeFiltersQuery();
  const { data: brands = [] } = useGetBrandFiltersQuery();
  const { data: colors = [] } = useGetColorFiltersQuery();
  const { data: styles = [] } = useGetStyleFiltersQuery();

  // Initialize selected indices from URL search params when the dialog opens
  useEffect(() => {
    if (open) {
      if (sizes.length) {
        const urlSize = searchParams.get('size');
        setSelectedSize(urlSize ? sizes.findIndex((s) => s.slug === urlSize) : -1);
      }
      if (brands.length) {
        const urlBrand = searchParams.get('brand');
        setSelectedBrand(urlBrand ? brands.findIndex((b) => b.slug === urlBrand) : -1);
      }
      if (colors.length) {
        const urlColor = searchParams.get('color');
        setSelectedColor(urlColor ? colors.findIndex((c) => c.slug === urlColor) : -1);
      }
      if (styles.length) {
        const urlStyle = searchParams.get('style');
        setSelectedStyle(urlStyle ? styles.findIndex((s) => s.slug === urlStyle) : -1);
      }
      const urlSort = searchParams.get('sort');
      setSelectedSortBy(urlSort ? shortByOptions.findIndex((s) => s.slug === urlSort) : -1);

      const urlMinPrice = searchParams.get('min_price');
      const urlMaxPrice = searchParams.get('max_price');
      if (urlMinPrice && urlMaxPrice) {
        const min = parseInt(urlMinPrice);
        const max = parseInt(urlMaxPrice);
        if (range[0] !== min || range[1] !== max) {
          setRange([min, max]);
        }
      } else {
        if (range[0] !== 0 || range[1] !== 200) {
          setRange([0, 200]);
        }
      }
    }
  }, [open, searchParams, sizes.length, brands.length, colors.length, styles.length]);

  const handleSubmit = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    const sizeSlug = sizes[selectedSize]?.slug;
    if (sizeSlug) params.set('size', sizeSlug);
    else params.delete('size');

    const brandSlug = brands[selectedBrand]?.slug;
    if (brandSlug) params.set('brand', brandSlug);
    else params.delete('brand');

    const colorSlug = colors[selectedColor]?.slug;
    if (colorSlug) params.set('color', colorSlug);
    else params.delete('color');

    const styleSlug = styles[selectedStyle]?.slug;
    if (styleSlug) params.set('style', styleSlug);
    else params.delete('style');

    const sortSlug = shortByOptions[selectedSortBy]?.slug;
    if (sortSlug) params.set('sort', sortSlug);
    else params.delete('sort');

    if (range[0] !== 0 || range[1] !== 200) {
      params.set('min_price', range[0].toString());
      params.set('max_price', range[1].toString());
    } else {
      params.delete('min_price');
      params.delete('max_price');
    }

    router.push(`${pathname}?${params.toString()}`);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary" className="px-8">
            <Icon
              name="filter_vertical"
              height={24}
              width={24}
              className="text-black-8"
            />
            Filter and Sorting
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-170" showCloseButton={false}>
          <div className="flex flex-col gap-10">
            <DialogHeader>
              <DialogTitle>Filter and Sort your view</DialogTitle>
              <DialogDescription>
                Refine results to match your preferences.
              </DialogDescription>
            </DialogHeader>

            <FilterGroup
              title="Size"
              options={sizes.map((s) => s.title)}
              selectedIndex={selectedSize}
              onSelect={setSelectedSize}
            />

            <FilterGroup
              title="Brand"
              options={brands.map((b) => b.title)}
              selectedIndex={selectedBrand}
              onSelect={setSelectedBrand}
            />

            <FilterGroup
              title="Color"
              options={colors.map((c) => c.title)}
              selectedIndex={selectedColor}
              onSelect={setSelectedColor}
            />

            <FilterGroup
              title="Style"
              options={styles.map((s) => s.title)}
              selectedIndex={selectedStyle}
              onSelect={setSelectedStyle}
            />

            <div className="space-y-4">
              <h3 className="text-black-12 text-xl font-semibold md:text-2xl">
                Price Range
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-[#0D1E1C]">
                    ${range[0]}
                  </span>
                  <span className="text-base font-semibold text-[#0D1E1C]">
                    ${range[1]}
                  </span>
                </div>

                <RangeSlider
                  min={0}
                  max={300}
                  value={range}
                  onInput={setRange}
                />
              </div>
            </div>

            <FilterGroup
              title="Sort by"
              options={shortByOptions.map((s) => s.title)}
              selectedIndex={selectedSortBy}
              onSelect={setSelectedSortBy}
            />

            <Button type="button" size={'lg'} className="w-full" onClick={handleSubmit}>
              View Items
            </Button>
          </div>
        </DialogContent>
    </Dialog>
  );
};

export default Filter;

type FilterGroupProps<T extends string> = {
  title: string;
  options: T[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

const FilterGroup = <T extends string>({
  title,
  options,
  selectedIndex,
  onSelect,
}: FilterGroupProps<T>) => {
  return (
    <div className="space-y-4">
      <h3 className="text-black-12 text-xl font-semibold md:text-2xl">
        {title}
      </h3>

      <div className="flex flex-wrap gap-4">
        {options.map((option, index) => {
          const isActive = selectedIndex === index;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(isActive ? -1 : index)}
              className={cn(
                'flex h-14 cursor-pointer items-center rounded-full px-8 text-lg transition-colors',
                isActive
                  ? 'bg-[#212121] font-semibold text-white'
                  : 'border-black-5 text-black-8 hover:bg-black-4 border',
              )}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
};
