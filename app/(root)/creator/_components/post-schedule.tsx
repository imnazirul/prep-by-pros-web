import Icon from '@/lib/icon';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CustomSelectBox } from '@/components/shared/custom-input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const PostSchedule = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isScheduled, setIsScheduled] = useState(false); // Track if saved

  const getFormattedDate = (fullDate: string) => {
    if (!fullDate) return '';
    return fullDate.split(',')[0];
  };

  const handleSave = () => {
    console.log('first');
    if (date && time) {
      setIsScheduled(true);
      setOpen(false); // Close the dropdown after saving
    }
  };

  return (
    <>
      <DropdownMenu onOpenChange={setOpen} open={open}>
        <DropdownMenuTrigger asChild>
          <button className="text-2xl cursor-pointer font-semibold text-[#1D4440] flex items-center gap-2 outline-none disabled:cursor-default">
            {isScheduled ? (
              <>
                <Icon name="checkmark_circle_fill" height={24} width={24} />
                <span>Scheduled for {getFormattedDate(date)}</span>
              </>
            ) : (
              'Schedule this post'
            )}
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          sideOffset={20}
          className="border-black-5 w-85.5 bg-black-4 rounded-3xl md:rounded-4xl lg:rounded-[40px] p-4 shadow-[0_12px_8px_0_rgba(0,0,0,0.16)]"
          align="end"
        >
          <div className="space-y-3">
            <CustomSelectBox
              icon="calendar"
              label="Set Date"
              isRequired
              placeholder="Select a date"
              value={date}
              setValue={setDate}
              className="bg-white border-black-5"
              options={[
                { label: '1 September, 2025 (Monday)', value: '1 September, 2025 (Monday)' },
                { label: '2 September, 2025 (Tuesday)', value: '2 September, 2025 (Tuesday)' },
                { label: '3 September, 2025 (Wednesday)', value: '3 September, 2025 (Wednesday)' },
                { label: '4 September, 2025 (Thursday)', value: '4 September, 2025 (Thursday)' },
              ]}
            />

            <CustomSelectBox
              icon="calendar"
              label="Set Time"
              isRequired
              placeholder="Select a time"
              value={time}
              setValue={setTime}
              className="bg-white border-black-5"
              options={[
                { label: '12:00 PM', value: '12:00 PM' },
                { label: '01:00 PM', value: '01:00 PM' },
                { label: '02:00 PM', value: '02:00 PM' },
                { label: '03:00 PM', value: '03:00 PM' },
              ]}
            />
          </div>

          <div className="flex mt-6 gap-3">
            <Button
              size={'icon'}
              variant={'secondary'}
              className="bg-primary-200 hover:bg-primary-300 text-primary"
              onClick={() => setOpen(false)} // Close without saving
            >
              <Icon name="close" height={20} width={20} />
            </Button>
            <Button
              className="flex-1"
              onClick={handleSave}
              disabled={!date || !time} // Prevent saving empty values
            >
              Save
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default PostSchedule;
