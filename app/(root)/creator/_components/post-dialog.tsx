/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useCallback, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { usePostDialog } from '@/contexts/post-dialog-context';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import type { Swiper as SwiperType } from 'swiper';

import Icon from '@/lib/icon';
import { useDropzone } from 'react-dropzone';
import { DiscardAlert } from './discard-alert';
import ZoomSliderPopup from './zoom-slider-popup';
import { DropzoneArea } from './post-dropzone-area';
import PostImageOrdering from './post-image-ordering';

interface FileWithPreview extends File {
  preview: string;
}

export function PostDialog() {
  const { isOpen, closePostDialog } = usePostDialog();
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [showDiscardAlert, setShowDiscardAlert] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const [showZoomSlider, setShowZoomSlider] = useState(false);
  const [showPostImgOrdering, setShowPostImgOrdering] = useState(false);
  const [zoomValue, setZoomValue] = useState([1]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    // Use functional update to append files if you want to allow multiple separate uploads
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      // 'video/*': ['.3gp', '.mp4', '.mov'],
    },
    multiple: true,
  });

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleClose = () => {
    if (files.length > 0) {
      setShowDiscardAlert(true);
    } else {
      closePostDialog();
    }
  };

  const handleDiscardConfirm = () => {
    files.forEach((file) => URL.revokeObjectURL(file.preview));
    setFiles([]);
    setShowDiscardAlert(false);
    closePostDialog();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent showCloseButton={false} className="sm:max-w-265">
          <DialogHeader className="mb-8">
            <DialogTitle>Create New Post</DialogTitle>
          </DialogHeader>

          {files.length === 0 ? (
            <DropzoneArea
              getRootProps={getRootProps}
              isDragActive={isDragActive}
              getInputProps={getInputProps}
            />
          ) : (
            <div className="group bg-primary-200 relative grid aspect-980/640 w-full overflow-hidden rounded-3xl md:rounded-4xl">
              <Swiper
                modules={[Pagination]}
                className="size-full"
                onBeforeInit={(swiper) => {
                  swiperRef.current = swiper;
                }}
                pagination={{
                  el: '.custom-pagination',
                  clickable: true,
                  renderBullet: (_, className) =>
                    `<span class="${className} custom-bullet size-3! bg-white! opacity-50! cursor-pointer! [&.swiper-pagination-bullet-active]:opacity-100! rounded-full"></span>`,
                }}
              >
                {files.map((file) => (
                  <SwiperSlide key={file.preview} className="relative">
                    <img src={file.preview} alt="preview" className="h-full w-full object-cover" />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Prev */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  swiperRef.current?.slidePrev();
                }}
                className="absolute top-1/2 left-4 z-10 -translate-y-1/2 cursor-pointer"
              >
                <Icon name="circle_arrow_left" width={44} height={44} className="text-white" />
              </button>

              {/* Next */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  swiperRef.current?.slideNext();
                }}
                className="absolute top-1/2 right-4 z-10 -translate-y-1/2 cursor-pointer"
              >
                <Icon name="circle_arrow_right" width={44} height={44} className="text-white" />
              </button>

              <div className="custom-pagination absolute bottom-5! z-9999999 mx-auto flex w-full justify-center" />

              {/* Action Buttons Overlay */}
              <div className="absolute inset-x-5 bottom-5 z-50 flex items-center justify-between">
                <ZoomSliderPopup
                  showZoomSlider={showZoomSlider}
                  setShowZoomSlider={setShowZoomSlider}
                  zoomValue={zoomValue}
                  setZoomValue={setZoomValue}
                />

                <PostImageOrdering
                  setFiles={setFiles}
                  getInputProps={getInputProps}
                  removeFile={removeFile}
                  files={files}
                  showPostImgOrdering={showPostImgOrdering}
                  setShowPostImgOrdering={setShowPostImgOrdering}
                />
              </div>
            </div>
          )}

          <div className="mt-12 grid grid-cols-2 gap-3">
            <Button
              size="lg"
              variant="secondary"
              onClick={handleClose}
              className="bg-primary-200 hover:bg-primary-300 text-primary"
            >
              Cancel
            </Button>

            {files.length === 0 ? (
              <DropzoneTrigger getInputProps={getInputProps} />
            ) : (
              <Button size="lg" onClick={() => console.log('Upload:', files)}>
                Next
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <DiscardAlert
        isOpen={showDiscardAlert}
        onClose={() => setShowDiscardAlert(false)}
        onConfirm={handleDiscardConfirm}
      />
    </>
  );
}

function DropzoneTrigger({ getInputProps }: { getInputProps: any }) {
  return (
    <label className={cn('cursor-pointer', buttonVariants({ variant: 'default', size: 'lg' }))}>
      Upload from computer
      <input {...getInputProps()} />
    </label>
  );
}
