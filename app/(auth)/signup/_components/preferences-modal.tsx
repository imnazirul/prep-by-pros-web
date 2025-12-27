'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Icon from '@/lib/icon';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import 'react-range-slider-input/dist/style.css';
import { Dispatch, SetStateAction, useState } from 'react';

const sports = [
  'Baseball',
  'Hockey',
  'Cricket',
  'Football',
  'Tennis',
  'Squash',
  'Athletics',
  'Swimming',
];
const positions = [
  'Pitcher',
  'Catcher',
  'Baseman',
  'Shortstop',
  'Fielder',
  'Fielder',
  'Hitter',
];
const teams = [
  'New York Yankees',
  'Atlanta Braves',
  'Red Sox',
  'St Louis Cardinals',
];

const PreferenceModal = ({
  openPreference,
  setOpenPreference,
}: {
  openPreference: boolean;
  setOpenPreference: Dispatch<SetStateAction<boolean>>;
}) => {
  const [selectedSport, setSelectedSport] = useState(1);
  const [selectedPosition, setSelectedPosition] = useState(1);

  const router = useRouter();

  return (
    <Dialog open={openPreference} onOpenChange={setOpenPreference}>
      <DialogContent className="sm:max-w-170" showCloseButton={false}>
        <div className="flex flex-col gap-10">
          <DialogHeader>
            <DialogTitle>Choose your preferences</DialogTitle>
            <DialogDescription>
              Personalise your feed according to your needs
            </DialogDescription>
          </DialogHeader>

          <FilterGroup
            title="Sports"
            options={sports}
            selectedIndex={selectedSport}
            onSelect={setSelectedSport}
          />

          <FilterGroup
            title="Position"
            options={positions}
            selectedIndex={selectedPosition}
            onSelect={setSelectedPosition}
          />

          <div className="space-y-4">
            <h3 className="text-black-12 text-xl font-semibold md:text-2xl">
              Teams
            </h3>
            <div className="flex flex-wrap gap-4">
              {teams.map((team) => {
                return (
                  <button
                    key={team}
                    className={cn(
                      'hover:bg-black-12 flex h-14 cursor-pointer items-center gap-2 rounded-full bg-[#212121] px-8 text-lg font-semibold text-white transition-colors',
                    )}
                  >
                    {team}
                    <Icon
                      name="close"
                      height={20}
                      width={20}
                      className="text-white"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <Button
            size={'lg'}
            className="w-full"
            onClick={() => {
              setOpenPreference(false);
              router.push('/');
            }}
          >
            Discover your feed
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreferenceModal;

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
