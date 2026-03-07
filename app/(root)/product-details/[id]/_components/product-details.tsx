/* eslint-disable @next/next/no-img-element */
'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

import Circle3DLoader from '@/components/shared/circle-loader';
import { useCart } from '@/contexts/cart-context';
import { useGetProductBySlugQuery } from '@/redux/api/globalApi';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

const ProductDetails = ({ slug }: { slug: string }) => {
  const { openCart, addItem, isAdding } = useCart();
  const { data: product, isLoading } = useGetProductBySlugQuery(slug);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColorUid, setSelectedColorUid] = useState<string>('');
  const [selectedSizeUid, setSelectedSizeUid] = useState<string>('');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (isLoading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  const description = product.description || '';
  const images =
    product.file_items.length > 0
      ? product.file_items.map((f) => ({ src: f.file }))
      : [{ src: '/images/placeholder.png' }];

  return (
    <>
      <section className="mb-10">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[7fr_5fr] lg:gap-10">
            {/* Left column - Product images */}
            <div>
              <div className="bg-muted aspect-1005/812 overflow-hidden rounded-2xl lg:rounded-3xl">
                <img
                  src={images[selectedImage]?.src || '/placeholder.svg'}
                  alt="Product"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Thumbnail images */}
              <div className="mt-6 lg:hidden">
                <Swiper spaceBetween={24} slidesPerView="auto">
                  {images.map(({ src }, index) => (
                    <SwiperSlide
                      key={index}
                      className={`relative w-auto! cursor-pointer overflow-hidden rounded-2xl transition-colors after:visible after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_40%,rgba(0,0,0,0.40)_70%)] after:opacity-100 after:transition-all after:duration-300 hover:after:invisible hover:after:opacity-0 ${
                        selectedImage === index && 'after:invisible! after:opacity-0!'
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
                    {product.title}
                  </h2>
                  <p className="text-black-10 text-4xl font-semibold md:text-5xl lg:text-[56px]">
                    ${product.price}
                  </p>
                </div>

                {/* Color selector */}
                <div className="space-y-5">
                  <div className="space-y-4">
                    <h3 className="text-black-12 text-xl font-medium md:text-2xl">Color</h3>
                    <div className="flex flex-wrap gap-4">
                      {product.colours?.map((color, index) => (
                        <button
                          key={color.uid}
                          onClick={() => {
                            setSelectedColorUid(color.uid);
                            setErrorMessage('');
                          }}
                          className={`h-11.5 w-18.5 cursor-pointer rounded-full bg-(--color) transition-all ${
                            selectedColorUid === color.uid && 'ring-2 ring-(--color) ring-offset-2'
                          }`}
                          style={{ '--color': color.code || '#000' } as React.CSSProperties} // Assuming code exists
                          aria-label={color.title}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Size selector */}
                  <div className="space-y-4">
                    <h3 className="text-black-12 text-xl font-medium md:text-2xl">Size</h3>
                    <div className="flex flex-wrap gap-4">
                      {product.sizes?.map((size, index) => (
                        <button
                          key={size.uid}
                          onClick={() => {
                            setSelectedSizeUid(size.uid);
                            setErrorMessage('');
                          }}
                          className={`flex h-11.5 cursor-pointer items-center rounded-full px-8 text-lg transition-colors ${
                            selectedSizeUid === size.uid
                              ? 'bg-[#212121] text-white'
                              : 'bg-black-4 text-black-8 hover:bg-black-5'
                          }`}
                        >
                          {size.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4">
                  <h3 className="text-black-12 text-xl font-medium md:text-2xl">Description</h3>
                  <p className="text-black-7 gap-2 text-2xl">
                    <span className="mr-2">
                      {showFullDescription
                        ? description
                        : description.split(' ').slice(0, 15).join(' ') +
                          (description.split(' ').length > 15 ? '...' : '')}
                    </span>

                    {description.split(' ').length > 15 && (
                      <button
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        className="text-primary inline-block cursor-pointer font-medium hover:underline"
                      >
                        {showFullDescription ? 'Show less' : 'Show more'}
                      </button>
                    )}
                  </p>
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && <p className="text-red-500 font-medium">{errorMessage}</p>}

              {/* Buy button */}
              <Button
                onClick={() => {
                  setErrorMessage('');
                  if (!selectedColorUid && product.colours?.length > 0) {
                    setErrorMessage('Please select a color');
                    return;
                  }
                  if (!selectedSizeUid && product.sizes?.length > 0) {
                    setErrorMessage('Please select a size');
                    return;
                  }

                  // Determine style_uid: use first available if exists
                  const styleUid = product.styles?.[0]?.uid;

                  // Construct payload with only defined values
                  const payload: any = {
                    product_uid: product.uid,
                    product_count: 1,
                  };

                  if (selectedSizeUid) payload.size_uid = selectedSizeUid;
                  if (selectedColorUid) payload.colour_uid = selectedColorUid;
                  if (styleUid) payload.style_uid = styleUid;

                  addItem(payload);
                }}
                className="w-full rounded-full py-6 text-base font-semibold disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isAdding}
              >
                {isAdding ? (
                  <Circle3DLoader size={2} radius={10} depth={5} color="#fff" />
                ) : (
                  'Add to cart'
                )}
              </Button>
            </div>
          </div>
          <div className="mt-6 hidden gap-8 lg:grid lg:grid-cols-[7fr_5fr] lg:gap-10">
            <Swiper spaceBetween={24} slidesPerView="auto" className="w-full lg:hidden">
              {images.map(({ src }, index) => (
                <SwiperSlide
                  key={index}
                  className={`relative w-auto! cursor-pointer overflow-hidden rounded-2xl transition-colors after:visible after:absolute after:inset-0 after:bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_40%,rgba(0,0,0,0.40)_70%)] after:opacity-100 after:transition-all after:duration-300 hover:after:invisible hover:after:opacity-0 ${
                    selectedImage === index && 'after:invisible! after:opacity-0!'
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
