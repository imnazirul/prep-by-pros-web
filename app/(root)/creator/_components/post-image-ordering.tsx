/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import Icon from '@/lib/icon';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

// DND Kit Imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface FileWithPreview extends File {
  preview: string;
}

// 1. Create a Sortable Item Component
const SortableFileItem = ({
  file,
  index,
  removeFile,
}: {
  file: FileWithPreview;
  index: number;
  removeFile: (index: number) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: file.preview,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-25 h-25 overflow-hidden rounded-2xl bg-primary-200 relative cursor-grab active:cursor-grabbing"
    >
      {/* Drag handle area (the whole image except the close button) */}
      <div {...attributes} {...listeners} className="absolute inset-0 z-10" />

      <Button
        onClick={(e) => {
          e.stopPropagation();
          removeFile(index);
        }}
        className="absolute top-1.5 right-1.5 z-50 size-5 rounded-full bg-black-10 text-white hover:bg-red-500"
        size="icon"
      >
        <Icon name="close" height={10} width={10} />
      </Button>

      <img src={file.preview} alt="preview" className="h-full w-full object-cover" />
    </div>
  );
};

const PostImageOrdering = ({
  showPostImgOrdering,
  setShowPostImgOrdering,
  files,
  removeFile,
  getInputProps,
  setFiles,
  imageConfirmed
}: {
  showPostImgOrdering: boolean;
  setShowPostImgOrdering: Dispatch<SetStateAction<boolean>>;
  files: FileWithPreview[];
  removeFile: (index: number) => void;
  getInputProps: any;
  setFiles: Dispatch<SetStateAction<FileWithPreview[]>>;
  imageConfirmed: boolean
}) => {
  // 2. Setup Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // 3. Handle Drag End
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setFiles((items) => {
        const oldIndex = items.findIndex((item) => item.preview === active.id);
        const newIndex = items.findIndex((item) => item.preview === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <Popover open={showPostImgOrdering} onOpenChange={setShowPostImgOrdering}>
      <PopoverTrigger asChild>
        <Button
          size={'icon'}
          variant={'secondary'}
          className={cn(
            'hover:text-primary group/btn border-0 shadow-[0_18px_11px_0_rgba(0,0,0,0.05)] backdrop-blur-[20px] hover:bg-white',
            showPostImgOrdering ? 'bg-white text-primary' : 'bg-white/40 text-white'
          )}
        >
          <Icon
            name={showPostImgOrdering ? 'layer_add_fill' : 'layer_add'}
            height={24}
            width={24}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        sideOffset={16}
        className="w-fit max-w-[90vw] overflow-x-auto rounded-3xl h-31 flex items-center bg-white p-3 border-none scrollbar-hide"
      >
        <div className="flex items-center gap-3">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={files.map((f) => f.preview)}
              strategy={horizontalListSortingStrategy}
            >
              {files.map((file, index) => (
                <SortableFileItem
                  key={file.preview}
                  file={file}
                  index={index}
                  removeFile={removeFile}
                />
              ))}
            </SortableContext>
          </DndContext>

          {
            !imageConfirmed && <label className="size-25 shrink-0 rounded-2xl border bg-primary-200 border-primary-300 flex items-center justify-center cursor-pointer hover:bg-primary-300 transition-colors">
              <input {...getInputProps()} />
              <Icon name="plus_sign" className="text-primary" height={40} width={40} />
            </label>
          }
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PostImageOrdering;
