'use client';
import {
  CustomCountryBox,
  CustomInputBox,
  CustomNumberBox,
  CustomRadioBox,
  CustomSelectBox,
} from '@/components/shared/custom-input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/lib/icon';
import { useGetMeMutation, usePatchMeMutation } from '@/redux/api/authApi';
import {
  useGetClubsQuery,
  useGetPlayingStylesQuery,
  useGetProfessionalLevelsQuery,
  useGetSportsQuery,
} from '@/redux/api/globalApi';
import { selectCurrentUser, setCredentials } from '@/redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect, useState } from 'react';

const ProfileForm = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const [patchMe, { isLoading: isUpdating }] = usePatchMeMutation();
  const [getMe, { data: fetchedUser }] = useGetMeMutation();

  // Fetch latest user data on mount
  useEffect(() => {
    getMe({});
  }, [getMe]);

  const user = fetchedUser || currentUser;

  const [currentPlaying, setCurrentPlaying] = useState(false);
  const [level, setLevel] = useState('');
  const [sport, setSport] = useState('');
  const [playingStyle, setPlayingStyle] = useState('');

  const { data: sportsData } = useGetSportsQuery();
  const { data: clubsData } = useGetClubsQuery('');
  const { data: levelsData } = useGetProfessionalLevelsQuery();
  const { data: stylesData } = useGetPlayingStylesQuery();

  const sportOptions =
    sportsData?.results?.map((item) => ({ label: item.title, value: item.slug })) || [];
  const clubOptions =
    clubsData?.results?.map((item) => ({ label: item.title, value: item.slug })) || [];
  const levelOptions =
    levelsData?.results?.map((item) => ({ label: item.title, value: item.slug })) || [];
  const styleOptions =
    stylesData?.results?.map((item) => ({ label: item.title, value: item.slug })) || [];

  const [club, setClub] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [nationality, setNationality] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.first_name || user.name || '');
      setEmail(user.email || '');
      setUserName(user.username || '');
      setPhone(user.phone || user.phone_number || '');
      setNationality(user.country || user.nationality || '');
      setAddress(user.address || '');
      setGender(user.gender || '');

      // Populate other fields if available in user object
      const extractSlug = (val: any) => {
        if (typeof val === 'string') return val;
        if (Array.isArray(val) && val.length > 0) return val[0].slug || val[0].value || '';
        return '';
      };

      setSport(user.sport_slug || extractSlug(user.sports) || extractSlug(user.sport) || '');
      setLevel(
        user.professional_level_slug ||
          extractSlug(user.professional_levels) ||
          extractSlug(user.professional_level) ||
          ''
      );
      setPlayingStyle(
        user.playing_style_slug ||
          extractSlug(user.Playing_style) ||
          extractSlug(user.playing_style) ||
          ''
      );
      setClub(user.club_slug || extractSlug(user.clubs) || extractSlug(user.club) || '');

      if (user.is_currentyly_playing) setCurrentPlaying(user.is_currentyly_playing);
    }
  }, [user]);

  // Custom wrapper to dispatch update after save
  const token = useAppSelector((state) => state.auth.token);

  const onSaveClick = async () => {
    if (!token) return;
    try {
      const payload: any = {
        first_name: name,
        email,
        username: userName,
        phone,
        country: nationality,
        address,
        gender,
        is_currentyly_playing: currentPlaying,
      };

      // Only include slugs if they have a value and the user is currently playing
      if (currentPlaying) {
        if (sport) payload.sport_slug = sport;
        if (level) payload.professional_level_slug = level;
        if (playingStyle) payload.playing_style_slug = playingStyle;
        if (club) payload.club_slug = club;
      }

      console.log('PatchMe Payload:', payload);
      const updatedUser = await patchMe(payload).unwrap();

      // Merge with existing token for setCredentials
      dispatch(setCredentials({ ...updatedUser, access: token }));
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Failed to update', JSON.stringify(err, null, 2));
      alert(`Failed to update profile: ${JSON.stringify(err)}`);
    }
  };

  return (
    <div>
      <div className="mb-10 flex items-center justify-between max-md:flex-wrap max-md:gap-4">
        <div className="flex items-center gap-5 max-md:flex-wrap max-md:gap-4">
          <Avatar className="relative size-30">
            <AvatarImage src={'/images/instructor/1.png'} className="object-cover" />
            <AvatarFallback className="bg-primary text-2xl text-white">
              {name ? name.charAt(0).toUpperCase() : 'U'}
            </AvatarFallback>

            <Button
              className="border-primary-200! hover:bg-primary! hover:border-primary! text-primary! absolute right-2 bottom-0 z-10 size-7 border bg-white! hover:text-white!"
              size={'icon'}
            >
              <Icon name="camera" height={14} width={14} />
            </Button>
          </Avatar>
          <div className="grid max-w-119 gap-2">
            <h4 className="text-black-10 text-[22px] font-semibold">{name || 'Your Name'}</h4>
            <p className="text-black-8 text-lg">
              From game highlights and training tips, I share my journey to inspire, entertain, and
              connect with fans ⚽️📊
            </p>
          </div>
        </div>

        <Button
          className="bg-primary-200 hover:bg-primary-300 hover:text-primary text-primary gap-2.5"
          onClick={onSaveClick}
          disabled={isUpdating}
        >
          <Icon name="pencil_edit_2" height={20} width={20} />
          {isUpdating ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="mb-12 grid gap-4 sm:grid-cols-2">
        <CustomInputBox
          icon="user_2"
          label="Name"
          placeholder="Enter Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <CustomInputBox
          icon="email"
          label="Email Address"
          placeholder="Enter Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <CustomInputBox
          icon="at"
          label="User Name"
          placeholder="Enter User Name"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <CustomRadioBox
          icon="fi"
          label="Gender"
          placeholder="Enter Name"
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          options={[
            {
              label: 'Male',
              value: 'MALE',
            },
            {
              label: 'Female',
              value: 'FEMALE',
            },
          ]}
        />
        <CustomNumberBox
          icon="call"
          label="Phone Number"
          placeholder="Enter Name"
          value={phone}
          onChange={setPhone}
        />
        <CustomCountryBox
          icon="global"
          label="Nationality"
          placeholder="Enter Nationality"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
        />
        <CustomInputBox
          icon="location"
          label="Address"
          placeholder="Enter Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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
          <label htmlFor="current" className="text-black-7 cursor-pointer text-sm">
            Currently playing or coaching in professional level
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Changed Club to CustomSelectBox to support fetched options */}
          <CustomSelectBox
            icon="honour_star"
            label="Club"
            placeholder="Enter Name"
            options={clubOptions}
            value={club}
            setValue={setClub}
            disabled={!currentPlaying}
          />
          <CustomSelectBox
            icon="award"
            label="Playing level"
            placeholder="Select here"
            options={levelOptions}
            value={level}
            setValue={setLevel}
            disabled={!currentPlaying}
          />

          <CustomSelectBox
            icon="busketball"
            label="Sport"
            placeholder="Select here"
            options={sportOptions}
            value={sport}
            setValue={setSport}
            disabled={!currentPlaying}
          />

          <CustomSelectBox
            icon="football_pitch"
            label="Playing Style"
            placeholder="Select here"
            options={styleOptions}
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
