/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ProductCardProp } from '@/lib/types';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useCart } from '@/contexts/cart-context';

const colors = [
  { name: 'Burgundy', value: '#6B4545' },
  { name: 'Beige', value: '#C4B5A0' },
  { name: 'Green', value: '#90D896' },
  { name: 'Peach', value: '#E5A96F' },
];

const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

const ProductDetails = ({ product }: { product: ProductCardProp }) => {
  const { openCart, addItem } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(4);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const description = product.description;
  return (
    <>
      <section className="mb-10">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[7fr_5fr] lg:gap-10">
            {/* Left column - Product images */}
            <div>
              <div className="bg-muted aspect-1005/812 overflow-hidden rounded-2xl lg:rounded-3xl">
                <img
                  src={product.images[selectedImage].src || '/placeholder.svg'}
                  alt="Product"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Thumbnail images */}
              <div className="mt-6 lg:hidden">
                <Swiper spaceBetween={24} slidesPerView="auto">
                  {product.images.map(({ src }, index) => (
                    <SwiperSlide
                      key={index}
                      className={`relative w-auto! cursor-pointer overflow-hidden rounded-2xl transition-colors after:visible after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_40%,rgba(0,0,0,0.40)_70%)] after:opacity-100 after:transition-all after:duration-300 hover:after:invisible hover:after:opacity-0 ${
                        selectedImage === index &&
                        'after:invisible! after:opacity-0!'
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={src}
                        alt={`Product view ${index + 1}`}
                        className="size-32 rounded-2xl object-cover md:size-40"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            {/* Right column - Product details */}
            <div className="flex flex-col justify-between space-y-9">
              <div className="space-y-9">
                <div className="space-y-5">
                  <h2 className="text-black-10 text-2xl font-semibold md:text-3xl lg:text-4xl">
                    {product.name}
                  </h2>
                  <p className="text-black-10 text-4xl font-semibold md:text-5xl lg:text-[56px]">
                    ${product.price}
                  </p>
                </div>

                {/* Color selector */}
                <div className="space-y-5">
                  <div className="space-y-4">
                    <h3 className="text-black-12 text-xl font-medium md:text-2xl">
                      Color
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {colors.map((color, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedColor(index)}
                          className={`h-11.5 w-18.5 cursor-pointer rounded-full bg-(--color) transition-all ${
                            selectedColor === index &&
                            'ring-2 ring-(--color) ring-offset-2'
                          }`}
                          style={
                            { '--color': color.value } as React.CSSProperties
                          }
                          aria-label={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Size selector */}
                  <div className="space-y-4">
                    <h3 className="text-black-12 text-xl font-medium md:text-2xl">
                      Size
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {sizes.map((size, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedSize(index)}
                          className={`flex h-11.5 cursor-pointer items-center rounded-full px-8 text-lg transition-colors ${
                            selectedSize === index
                              ? 'bg-[#212121] text-white'
                              : 'bg-black-4 text-black-8 hover:bg-black-5'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4">
                  <h3 className="text-black-12 text-xl font-medium md:text-2xl">
                    Description
                  </h3>
                  <p className="text-black-7 gap-2 text-2xl">
                    <span className="mr-2">
                      {showFullDescription
                        ? description
                        : description.split(' ').slice(0, 15).join(' ') +
                          (description.split(' ').length > 15 ? '...' : '')}
                    </span>

                    {description.split(' ').length > 15 && (
                      <button
                        onClick={() =>
                          setShowFullDescription(!showFullDescription)
                        }
                        className="text-primary inline-block cursor-pointer font-medium hover:underline"
                      >
                        {showFullDescription ? 'Show less' : 'Show more'}
                      </button>
                    )}
                  </p>
                </div>
              </div>

              {/* Buy button */}
              <Button
                onClick={() => {
                  addItem({
                    id: String(product.id),
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    image: product.images[0].src,
                  });
                  openCart();
                }}
                className="w-full rounded-full py-6 text-base font-semibold"
              >
                Buy Now
              </Button>
            </div>
          </div>
          <div className="mt-6 hidden gap-8 lg:grid lg:grid-cols-[7fr_5fr] lg:gap-10">
            <Swiper
              spaceBetween={24}
              slidesPerView="auto"
              className="w-full lg:hidden"
            >
              {product.images.map(({ src }, index) => (
                <SwiperSlide
                  key={index}
                  className={`relative w-auto! cursor-pointer overflow-hidden rounded-2xl transition-colors after:visible after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_40%,rgba(0,0,0,0.40)_70%)] after:opacity-100 after:transition-all after:duration-300 hover:after:invisible hover:after:opacity-0 ${
                    selectedImage === index &&
                    'after:invisible! after:opacity-0!'
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={src}
                    alt={`Product view ${index + 1}`}
                    className="size-32 rounded-2xl object-cover md:size-40"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
