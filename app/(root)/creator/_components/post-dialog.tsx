/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useCallback, useRef, useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button, buttonVariants } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { usePostDialog } from '@/contexts/post-dialog-context';
import { cn } from '@/lib/utils';
// Swiper styles
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

import ConfirmModal from '@/components/shared/confirm-modal';
import Icon from '@/lib/icon';
import { useCreateMeContentMutation } from '@/redux/api/authApi';
import { useUploadFileMutation } from '@/redux/api/globalApi';
import { useDropzone } from 'react-dropzone';
import { DiscardAlert } from './discard-alert';
import { DropzoneArea } from './post-dropzone-area';
import PostImageOrdering from './post-image-ordering';
import PostSchedule from './post-schedule';
import ZoomSliderPopup from './zoom-slider-popup';

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

  const [imageConfirmed, setImageConfirmed] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [createMeContent, { isLoading: isCreating }] = useCreateMeContentMutation();
  const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();

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

  const handlePost = async () => {
    try {
      const fileSlugs: string[] = [];

      // 1. Upload files
      if (files.length > 0) {
        for (const file of files) {
          const formData = new FormData();
          formData.append('file', file);
          // formData.append('kind', 'IMAGE');
          // formData.append('status', 'ACTIVE');

          const response = await uploadFile(formData).unwrap();
          if (response.slug) {
            fileSlugs.push(response.slug);
          }
        }
      }

      // 2. Create content
      const scheduleDate = new Date(); // Or use actual schedule state if available

      await createMeContent({
        title,
        description,
        schedule: scheduleDate.toISOString(),
        file_items: fileSlugs,
      }).unwrap();

      // 3. Success handling
      closePostDialog();
      setImageConfirmed(false);
      setIsSubmitted(true);
      // Reset form
      setTitle('');
      setDescription('');
      setFiles([]);
    } catch (error: any) {
      console.error('Failed to create post:', error);

      let errorMessage = 'Failed to create post. Please try again.';

      if (error?.status === 'PARSING_ERROR' && error?.originalStatus === 500) {
        errorMessage =
          'Server Error: The backend failed to process the request (500). Please check with the administrator.';
      } else if (error?.data?.detail) {
        errorMessage = error.data.detail;
      } else if (typeof error?.data === 'string') {
        // If the backend returned a string (like the FileNotFoundError), show it
        errorMessage = `Server Error: ${error.data.substring(0, 100)}...`;
      }

      alert(errorMessage);
    }
  };

  const handleClose = () => {
    if (files.length > 0) {
      setShowDiscardAlert(true);
    } else {
      closePostDialog();
    }
    setImageConfirmed(false);
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
          <DialogHeader className="mb-8 flex items-center flex-row justify-between">
            <DialogTitle className={cn(!imageConfirmed && 'sr-only')}>Create New Post</DialogTitle>
            <PostSchedule />
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

              {/* Custom Pagination */}
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
                  imageConfirmed={imageConfirmed}
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

          {imageConfirmed && (
            <div className="space-y-3 mt-8">
              <input
                type="text"
                placeholder="Add a title for your post"
                className="p-0 m-0 block w-full border-0 outline-0 placeholder:text-black-7 text-[32px] text-black-10"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Add a short description"
                className="p-0 m-0 border-0 block w-full outline-0 placeholder:text-black-7 text-2xl text-black-10"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
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
              <>
                {imageConfirmed ? (
                  <Button size="lg" disabled={isCreating || isUploading} onClick={handlePost}>
                    {isCreating || isUploading ? 'Posting...' : 'Post now'}
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    onClick={() => {
                      setImageConfirmed(true);
                    }}
                  >
                    Next
                  </Button>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <DiscardAlert
        isOpen={showDiscardAlert}
        onClose={() => setShowDiscardAlert(false)}
        onConfirm={handleDiscardConfirm}
      />

      <ConfirmModal
        icon="happy_image"
        iconWidth={398}
        iconHeight={340}
        open={isSubmitted}
        setOpen={setIsSubmitted}
        title="Post scheduled!"
        buttonLabel="Go to home"
        subTitle={
          <p>
            Your post is successfully scheduled for <br />{' '}
            <span className="text-black-10 font-medium">12:00 PM</span> at{' '}
            <span className="text-black-10 font-medium">13 January</span>.
          </p>
        }
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
