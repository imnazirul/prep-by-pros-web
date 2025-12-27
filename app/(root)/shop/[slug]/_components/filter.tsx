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

const sizes = ['XS', 'S', 'SM', 'M', 'ML', 'L', 'XL', 'XXL'];
const brands = ['Nike', 'Adidas', 'New Balance', 'Carhartt', 'Asics', 'Gap'];
const colors = ['Blue', 'Red', 'Burberry', 'purple', 'Brown', 'Pink'];
const styles = ['Regular', 'Slim', 'Skinny', 'Oversized', 'Relaxed'];
const shortBy = ['Popularity', 'Rating', 'Best Selling', 'Alphabetically'];

const Filter = () => {
  const [selectedSize, setSelectedSize] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState(1);
  const [selectedColor, setSelectedColor] = useState(1);
  const [selectedStyle, setSelectedStyle] = useState(2);
  const [selectedSortBy, setSelectedSortBy] = useState(2);
  const [range, setRange] = useState<[number, number]>([20, 80]);

  return (
    <Dialog>
      <form>
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
              options={sizes}
              selectedIndex={selectedSize}
              onSelect={setSelectedSize}
            />

            <FilterGroup
              title="Brand"
              options={brands}
              selectedIndex={selectedBrand}
              onSelect={setSelectedBrand}
            />

            <FilterGroup
              title="Color"
              options={colors}
              selectedIndex={selectedColor}
              onSelect={setSelectedColor}
            />

            <FilterGroup
              title="Style"
              options={styles}
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
                  max={100}
                  value={range}
                  onInput={setRange}
                />
              </div>
            </div>

            <FilterGroup
              title="Sort by"
              options={shortBy}
              selectedIndex={selectedSortBy}
              onSelect={setSelectedSortBy}
            />

            <Button size={'lg'} className="w-full">
              View Items
            </Button>
          </div>
        </DialogContent>
      </form>
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
              onClick={() => onSelect(index)}
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
