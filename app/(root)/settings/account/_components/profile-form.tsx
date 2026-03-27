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
import { useUploadFileMutation } from '@/redux/api/globalApi';
import {
  useGetClubsQuery,
  useGetPlayingStylesQuery,
  useGetProfessionalLevelsQuery,
  useGetSportsQuery,
} from '@/redux/api/globalApi';
import { selectCurrentUser, setCredentials } from '@/redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect, useRef, useState } from 'react';

const ProfileForm = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const [patchMe, { isLoading: isUpdating }] = usePatchMeMutation();
  const [getMe, { data: fetchedUser }] = useGetMeMutation();
  const [uploadFile, { isLoading: isUploadingFile }] = useUploadFileMutation();

  const fileInputRef = useRef<HTMLInputElement>(null);

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
  const [description, setDescription] = useState('');

  // Image State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.first_name || user.name || '');
      setEmail(user.email || '');
      setUserName(user.username || '');
      setPhone(user.phone || user.phone_number || '');
      setNationality(user.country || user.nationality || '');
      setAddress(user.address || '');
      setGender(user.gender || '');
      setDescription(user.description || '');

      if (user.image && !imageFile) {
        setPreviewUrl(user.image);
      }

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const onSaveClick = async () => {
    if (!token) return;
    try {
      const formData = new FormData();

      // Append standard fields
      formData.append('first_name', name);
      formData.append('name', name); // Compatibility
      if (user?.last_name) formData.append('last_name', user.last_name);
      formData.append('email', email);
      formData.append('username', userName);
      formData.append('phone', phone);
      formData.append('phone_number', phone); // Compatibility
      formData.append('country', nationality);
      formData.append('address', address);
      formData.append('gender', gender);
      formData.append('description', description);
      formData.append('is_currentyly_playing', String(currentPlaying));

      // Append image if a new one is selected
      if (imageFile) {
        console.log('Appending image file to FormData...');
        formData.append('image', imageFile);
      }

      // Append conditional slugs
      if (currentPlaying) {
        if (sport) formData.append('sport_slug', sport);
        if (level) formData.append('professional_level_slug', level);
        if (playingStyle) formData.append('playing_style_slug', playingStyle);
        if (club) formData.append('club_slug', club);
      }

      console.log('Patching profile with FormData...');
      const updatedUser = await patchMe(formData).unwrap();
      console.log('Profile updated successfully:', updatedUser);

      // Merge with existing token for setCredentials
      dispatch(setCredentials({ ...updatedUser, access: token }));
      alert('Profile updated successfully!');
      setImageFile(null); // Clear selected file after success
    } catch (err: any) {
      console.error('Failed to update profile:', err);
      const errorMsg =
        err?.data?.detail ||
        (err?.data && typeof err.data === 'object' ? JSON.stringify(err.data) : err.data) ||
        JSON.stringify(err);
      alert(`Failed to update profile: ${errorMsg}`);
    }
  };

  return (
    <div>
      <div className="mb-10 flex items-center justify-between max-md:flex-wrap max-md:gap-4">
        <div className="flex items-center gap-5 max-md:flex-wrap max-md:gap-4">
          <Avatar className="relative size-30">
            <AvatarImage src={previewUrl} className="object-cover" />
            <AvatarFallback className="bg-primary text-2xl text-white">
              {name ? name.charAt(0).toUpperCase() : 'U'}
            </AvatarFallback>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />

            <Button
              className="border-primary-200! hover:bg-primary! hover:border-primary! text-primary! absolute right-2 bottom-0 z-10 size-7 border bg-white! hover:text-white!"
              size={'icon'}
              onClick={() => fileInputRef.current?.click()}
            >
              <Icon name="camera" height={14} width={14} />
            </Button>
          </Avatar>
          <div className="grid max-w-119 gap-2">
            <h4 className="text-black-10 text-[22px] font-semibold">{name || 'Your Name'}</h4>
            <p className="text-black-8 text-lg">{description || 'No description available'}</p>
          </div>
        </div>

        <Button
          className="bg-primary-200 hover:bg-primary-300 hover:text-primary text-primary gap-2.5"
          onClick={onSaveClick}
          disabled={isUpdating || isUploadingFile}
        >
          <Icon name="pencil_edit_2" height={20} width={20} />
          {isUpdating || isUploadingFile ? 'Saving...' : 'Save Changes'}
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
        <CustomInputBox
          icon="pencil_edit"
          label="Bio / Description"
          placeholder="Enter your professional bio"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
