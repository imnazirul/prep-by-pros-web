/* eslint-disable @typescript-eslint/no-explicit-any */
import Icon from '@/lib/icon';
import { cn } from '@/lib/utils';

export function DropzoneArea({
  getRootProps,
  isDragActive,
  getInputProps,
}: {
  getRootProps: any;
  isDragActive: any;
  getInputProps: any;
}) {
  return (
    <div
      {...getRootProps()}
      className={cn(
        'border-black-7 flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed py-28 transition-all md:rounded-4xl',
        isDragActive ? 'bg-primary-50 border-primary' : 'hover:bg-gray-50'
      )}
    >
      <input {...getInputProps()} />
      <div className="bg-primary-300/64 mb-8 flex size-37.5 items-center justify-center rounded-2xl">
        <Icon
          name="folder"
          height={64}
          width={64}
          className={cn('text-[#507773] transition-transform', isDragActive && 'scale-110')}
        />
      </div>
      <h4 className="text-black-10 mb-3 text-center text-2xl font-semibold">
        Drag your photos or videos here or upload from Computer
      </h4>
      <p className="text-black-7 text-center text-xl">
        Images (jpg, png) and videos (mp4, mov) are supported
      </p>
    </div>
  );
}
