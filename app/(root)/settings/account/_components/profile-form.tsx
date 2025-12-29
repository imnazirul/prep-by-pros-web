'use client';

import Icon from '@/lib/icon';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  CustomCountryBox,
  CustomInputBox,
  CustomNumberBox,
  CustomRadioBox,
  CustomSelectBox,
} from '@/components/shared/custom-input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';

const ProfileForm = () => {
  const [currentPlaying, setCurrentPlaying] = useState(false);
  const [lavel, setLavel] = useState('');
  const [sport, setSport] = useState('');
  const [playingStyle, setPlayingStyle] = useState('');

  return (
    <div>
      <div className="mb-10 flex items-center justify-between max-md:flex-wrap max-md:gap-4">
        <div className="flex items-center gap-5 max-md:flex-wrap max-md:gap-4">
          <Avatar className="relative size-30">
            <AvatarImage
              src={'/images/instructor/1.png'}
              className="object-cover"
            />
            <AvatarFallback className="bg-primary text-2xl text-white">
              DM
            </AvatarFallback>

            <Button
              className="border-primary-200! hover:bg-primary! hover:border-primary! text-primary! absolute right-2 bottom-0 z-10 size-7 border bg-white! hover:text-white!"
              size={'icon'}
            >
              <Icon name="camera" height={14} width={14} />
            </Button>
          </Avatar>
          <div className="grid max-w-119 gap-2">
            <h4 className="text-black-10 text-[22px] font-semibold">
              Your Name
            </h4>
            <p className="text-black-8 text-lg">
              From game highlights and training tips, I share my journey to
              inspire, entertain, and connect with fans ⚽️📊
            </p>
          </div>
        </div>

        <Button className="bg-primary-200 hover:bg-primary-300 hover:text-primary text-primary gap-2.5">
          <Icon name="pencil_edit_2" height={20} width={20} />
          Edit
        </Button>
      </div>

      <div className="mb-12 grid gap-4 sm:grid-cols-2">
        <CustomInputBox
          icon="user_2"
          label="Name"
          placeholder="Enter Name"
          type="text"
        />
        <CustomInputBox
          icon="email"
          label="Email Address"
          placeholder="Enter Email Address"
          type="email"
        />
        <CustomInputBox
          icon="at"
          label="User Name"
          placeholder="Enter User Name"
          type="text"
        />
        <CustomRadioBox
          icon="fi"
          label="Gender"
          placeholder="Enter Name"
          name="gendar"
          options={[
            {
              label: 'Male',
              value: 'Male',
            },
            {
              label: 'Female',
              value: 'Female',
            },
          ]}
        />
        <CustomNumberBox
          icon="call"
          label="Phone Number"
          placeholder="Enter Name"
        />
        <CustomCountryBox
          icon="global"
          label="Nationality"
          placeholder="Enter Nationality"
        />
        <CustomInputBox
          icon="location"
          label="Address"
          placeholder="Enter Address"
        />
      </div>

      <div className="space-y-5">
        <div className="flex items-center gap-1.5">
          <Checkbox
            id="current"
            onCheckedChange={(checked) => setCurrentPlaying(!!checked)}
            checked={currentPlaying}
            className="cursor-pointer"
          />
          <label
            htmlFor="current"
            className="text-black-7 cursor-pointer text-sm"
          >
            Currently playing or coaching in professional level
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <CustomInputBox
            icon="honour_star"
            label="Club"
            placeholder="Enter Name"
            type="text"
            disabled={!currentPlaying}
          />
          <CustomSelectBox
            icon="award"
            label="Playing level"
            placeholder="Select here"
            options={[
              { label: 'Beginner', value: 'Beginner' },
              { label: 'Intermediate', value: 'Intermediate' },
              { label: 'Advanced', value: 'Advanced' },
              { label: 'Professional', value: 'Professional' },
            ]}
            value={lavel}
            setValue={setLavel}
            disabled={!currentPlaying}
          />

          <CustomSelectBox
            icon="busketball"
            label="Sport"
            placeholder="Select here"
            options={[
              { label: 'Football', value: 'Football' },
              { label: 'Cricket', value: 'Cricket' },
              { label: 'Badminton', value: 'Badminton' },
              { label: 'Basketball', value: 'Basketball' },
              { label: 'Volleyball', value: 'Volleyball' },
              { label: 'Tennis', value: 'Tennis' },
            ]}
            value={sport}
            setValue={setSport}
            disabled={!currentPlaying}
          />

          <CustomSelectBox
            icon="football_pitch"
            label="Playing Style"
            placeholder="Select here"
            options={[
              { label: 'Offensive', value: 'Offensive' },
              { label: 'Defensive', value: 'Defensive' },
              { label: 'All-Rounder', value: 'All-Rounder' },
              { label: 'Aggressive', value: 'Aggressive' },
              { label: 'Balanced', value: 'Balanced' },
            ]}
            value={playingStyle}
            setValue={setPlayingStyle}
            disabled={!currentPlaying}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
