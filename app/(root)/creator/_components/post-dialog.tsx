/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
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
import { useCreateMeContentMutation, useUpdateMeContentMutation } from '@/redux/api/authApi';
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

// Helper to convert URL to File object (for editing preview)
// Ideally we would just use the URL, but the existing logic heavily relies on File objects
// For now, we'll adapt state to handle mixed content (existing URLs vs new Files)
// OR simpler: just show preview for existing images differently.
// Let's modify the state to be flexible.

export function PostDialog() {
  const { isOpen, closePostDialog, initialData } = usePostDialog();
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  // Store existing file items for editing mode
  const [existingFiles, setExistingFiles] = useState<any[]>([]);

  const [showDiscardAlert, setShowDiscardAlert] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const [showZoomSlider, setShowZoomSlider] = useState(false);
  const [showPostImgOrdering, setShowPostImgOrdering] = useState(false);
  const [zoomValue, setZoomValue] = useState([1]);

  const [imageConfirmed, setImageConfirmed] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Scheduling State
  const [scheduleDateStr, setScheduleDateStr] = useState('');
  const [scheduleTimeStr, setScheduleTimeStr] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);

  const [createMeContent, { isLoading: isCreating }] = useCreateMeContentMutation();
  const [updateMeContent, { isLoading: isUpdating }] = useUpdateMeContentMutation();
  const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();

  // Populate form when initialData changes (Edit Mode)
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setImageConfirmed(true); // Jump to details view for editing

      // Handle existing files
      if (initialData.file_items && initialData.file_items.length > 0) {
        setExistingFiles(initialData.file_items);
      } else if (initialData.file_item) {
        setExistingFiles([initialData.file_item]);
      }
      // Reset scheduling on edit for now, or populate if data has future date
      setIsScheduled(false);
      setScheduleDateStr('');
      setScheduleTimeStr('');
    } else {
      // Reset if no data (Create Mode)
      setTitle('');
      setDescription('');
      setFiles([]);
      setExistingFiles([]);
      setImageConfirmed(false);
      setIsScheduled(false);
      setScheduleDateStr('');
      setScheduleTimeStr('');
    }
  }, [initialData]);

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
      'video/*': ['.3gp', '.mp4', '.mov'],
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

  const removeExistingFile = (index: number) => {
    setExistingFiles((prev) => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handlePost = async () => {
    try {
      let finalScheduleDate = new Date().toISOString();

      // 1. Parse Schedule Date
      if (isScheduled && scheduleDateStr && scheduleTimeStr) {
        // Parse the hardcoded string format: "1 September, 2025 (Monday)"
        const datePart = scheduleDateStr.split('(')[0].trim();
        const timePart = scheduleTimeStr;
        const combined = `${datePart} ${timePart}`;
        const parsed = new Date(combined);
        if (!isNaN(parsed.getTime())) {
          finalScheduleDate = parsed.toISOString();
        } else {
          console.warn('Failed to parse schedule date, defaulting to now');
        }
      }

      let contentUid = initialData?.uid;

      // 2. Create Content First (if new) or Update (if existing)
      if (initialData) {
        // UPDATE Mode
        await updateMeContent({
          uid: initialData.uid,
          data: {
            title,
            description,
            schedule: finalScheduleDate,
          } as any,
        }).unwrap();
      } else {
        // CREATE Mode
        // We create content FIRST to get the UID, without file_items (linking happens via upload)
        const newContent = await createMeContent({
          title,
          description,
          schedule: finalScheduleDate,
          file_items: [],
        }).unwrap();
        contentUid = newContent.uid;
      }

      // 3. Upload NEW files (Linked to contentUid)
      if (files.length > 0 && contentUid) {
        for (const file of files) {
          const formData = new FormData();
          formData.append('file', file);
          const isVideo = file.type.startsWith('video');
          formData.append('kind', isVideo ? 'VIDEO' : 'IMAGE');
          formData.append('status', 'ACTIVE');
          formData.append('content_uid', contentUid); // Critical Link

          await uploadFile(formData).unwrap();
        }
      }

      // 4. Success handling
      closePostDialog();
      setImageConfirmed(false);
      setIsSubmitted(true);
      // Reset form
      setTitle('');
      setDescription('');
      setFiles([]);
      setExistingFiles([]);
      // Reset schedule
      setIsScheduled(false);
      setScheduleDateStr('');
      setScheduleTimeStr('');
    } catch (error: any) {
      console.error('Failed to save post:', error);

      let errorMessage = 'Failed to save post. Please try again.';

      if (error?.status === 'PARSING_ERROR' && error?.originalStatus === 500) {
        errorMessage =
          'Server Error: The backend failed to process the request (500). Please check with the administrator.';
      } else if (error?.data?.detail) {
        errorMessage = error.data.detail;
      } else if (typeof error?.data === 'string') {
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

  // Combined list for swiper
  const totalItemsCount = existingFiles.length + files.length;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent showCloseButton={false} className="sm:max-w-265">
          <DialogHeader className="mb-8 flex items-center flex-row justify-between">
            <DialogTitle className={cn(!imageConfirmed && 'sr-only')}>
              {initialData ? 'Edit Post' : 'Create New Post'}
            </DialogTitle>
            <PostSchedule
              date={scheduleDateStr}
              setDate={setScheduleDateStr}
              time={scheduleTimeStr}
              setTime={setScheduleTimeStr}
              isScheduled={isScheduled}
              setIsScheduled={setIsScheduled}
            />
          </DialogHeader>

          {totalItemsCount === 0 ? (
            <DropzoneArea
              getRootProps={getRootProps}
              isDragActive={isDragActive}
              getInputProps={getInputProps}
            />
          ) : (
            <div className="group bg-primary-200 relative grid aspect-980/640 w-full overflow-hidden rounded-3xl md:rounded-4xl">
              {/* ... existing swiper code ... */}
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
                {/* Render Existing Files First */}
                {existingFiles.map((file, index) => {
                  const src = file.file || file.preview;
                  const isVideo = src?.match(/\.(mp4|mov|3gp)$/i) || file.kind === 'VIDEO';
                  return (
                    <SwiperSlide key={`existing-${index}`} className="relative">
                      {isVideo ? (
                        <video src={src} className="h-full w-full object-cover" controls />
                      ) : (
                        <img src={src} alt="preview" className="h-full w-full object-cover" />
                      )}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeExistingFile(index);
                        }}
                        className="absolute top-4 right-4 z-50 rounded-full bg-red-500 p-2 text-white"
                      >
                        <Icon name="trash" width={20} height={20} />
                      </button>
                    </SwiperSlide>
                  );
                })}

                {/* Render New Files */}
                {files.map((file) => {
                  const isVideo = file.type.startsWith('video');
                  return (
                    <SwiperSlide key={file.preview} className="relative">
                      {isVideo ? (
                        <video src={file.preview} className="h-full w-full object-cover" controls />
                      ) : (
                        <img
                          src={file.preview}
                          alt="preview"
                          className="h-full w-full object-cover"
                        />
                      )}
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              {/* ... rest of swiper controls ... */}
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

            {totalItemsCount === 0 ? (
              <DropzoneTrigger getInputProps={getInputProps} />
            ) : (
              <>
                {imageConfirmed ? (
                  <Button
                    size="lg"
                    disabled={isCreating || isUploading || isUpdating}
                    onClick={handlePost}
                  >
                    {isCreating || isUploading || isUpdating
                      ? initialData
                        ? 'Updating...'
                        : 'Posting...'
                      : initialData
                        ? 'Update'
                        : isScheduled
                          ? 'Schedule'
                          : 'Post now'}
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
        title={initialData ? 'Post updated!' : isScheduled ? 'Post scheduled!' : 'Post published!'}
        buttonLabel="Go to home"
        subTitle={
          isScheduled ? (
            <span>
              Your post is successfully scheduled for <br />{' '}
              <span className="text-black-10 font-medium">{scheduleTimeStr}</span> at{' '}
              <span className="text-black-10 font-medium">
                {scheduleDateStr.split('(')[0].trim()}
              </span>
              .
            </span>
          ) : (
            <span>Your post has been successfully published.</span>
          )
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
