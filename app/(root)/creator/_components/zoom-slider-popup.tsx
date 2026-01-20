import Icon from '@/lib/icon';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Dispatch, SetStateAction } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const ZoomSliderPopup = ({
  showZoomSlider,
  setShowZoomSlider,
  zoomValue,
  setZoomValue,
}: {
  zoomValue: number[];
  setZoomValue: Dispatch<SetStateAction<number[]>>;
  showZoomSlider: boolean;
  setShowZoomSlider: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Popover open={showZoomSlider} onOpenChange={setShowZoomSlider}>
      <PopoverTrigger asChild>
        <Button
          size={'icon'}
          variant={'secondary'}
          className={cn(
            'hover:text-primary group/btn border-0 shadow-[0_18px_11px_0_rgba(0,0,0,0.05)] backdrop-blur-[20px] hover:bg-white',
            showZoomSlider ? 'bg-white text-primary' : 'bg-white/40 text-white'
          )}
        >
          <Icon
            name={showZoomSlider ? 'zoom_in_area_fill' : 'zoom_in_area'}
            height={24}
            width={24}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="start"
        sideOffset={16}
        className="w-49.5 rounded-full h-10 flex items-center justify-center bg-white px-3.5 py-3 shadow-lg border-none"
      >
        <Slider
          defaultValue={zoomValue}
          max={3}
          min={1}
          step={0.1}
          onValueChange={(value) => setZoomValue(value)}
        />
      </PopoverContent>
    </Popover>
  );
};

export default ZoomSliderPopup;
