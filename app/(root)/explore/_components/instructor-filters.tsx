'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Icon from '@/lib/icon';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

export default function InstructorFilters() {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="secondary" className="p-1.5 pr-3.5">
          <Avatar className="size-9">
            <AvatarImage src="/images/sports.png" />
          </Avatar>
          <Select>
            <SelectTrigger
              arrowIcon={
                <Icon
                  name="arrow_down"
                  className="text-black-8 size-6"
                  height={24}
                  width={24}
                />
              }
              className="w-fit cursor-pointer border-0 p-0 text-lg font-medium shadow-none focus-visible:ring-0"
            >
              <SelectValue placeholder="Sports" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Football">Football</SelectItem>
                <SelectItem value="Cricket">Cricket</SelectItem>
                <SelectItem value="Busketball">Busketball</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Button>

        <Button variant="secondary" className="p-1.5 pr-3.5">
          <Avatar className="size-9">
            <AvatarImage src="/images/gender.png" />
          </Avatar>
          <Select>
            <SelectTrigger
              arrowIcon={
                <Icon
                  name="arrow_down"
                  className="text-black-8 size-6"
                  height={24}
                  width={24}
                />
              }
              className="w-fit cursor-pointer border-0 p-0 text-lg font-medium shadow-none focus-visible:ring-0"
            >
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Button>

        <Button variant="secondary" className="p-1.5 pr-3.5">
          <Avatar className="size-9">
            <AvatarImage src="/images/position.png" />
          </Avatar>
          <Select>
            <SelectTrigger
              arrowIcon={
                <Icon
                  name="arrow_down"
                  className="text-black-8 size-6"
                  height={24}
                  width={24}
                />
              }
              className="w-fit cursor-pointer border-0 p-0 text-lg font-medium shadow-none focus-visible:ring-0"
            >
              <SelectValue placeholder="Position" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Mid">Mid</SelectItem>
                <SelectItem value="Top">Top</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Button>
      </div>

      <Button variant="secondary" className="px-8">
        <Icon
          name="filter_vertical"
          height={24}
          width={24}
          className="text-black-8"
        />
        Sort by
      </Button>
    </div>
  );
}
