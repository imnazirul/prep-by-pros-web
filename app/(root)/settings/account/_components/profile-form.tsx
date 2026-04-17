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
  // Guard: only initialize form fields once from backend data. 
  // Prevents tag-invalidated refetches from resetting in-session user selections.
  const initializedRef = useRef(false);

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
  
  const [isEditing, setIsEditing] = useState(false);

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
      console.log('--- Initializing Form with User Data ---');
      console.log('Raw User Object:', user);
      
      // Always update basic fields (these are safe to sync)
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

      // GUARD: Only set association fields once on initial load.
      // After a save, we manually patch Redux state with the user's selections.
      // Without this guard, any subsequent 'user' reference change would reset
      // the dropdowns back to stale backend data.
      if (!initializedRef.current) {
        initializedRef.current = true;

        const extractSlug = (val: any) => {
          if (typeof val === 'string') return val;
          if (Array.isArray(val) && val.length > 0) {
            const lastItem = val[val.length - 1];
            return lastItem.slug || lastItem.value || '';
          }
          return '';
        };

        const sportVal = user.sport_slug || extractSlug(user.playing_sports) || extractSlug(user.sports) || extractSlug(user.sport) || '';
        const levelVal = user.professional_level_slug || extractSlug(user.professional_levels) || extractSlug(user.professional_level) || '';
        const styleVal = user.playing_style_slug || extractSlug(user.playing_styles) || extractSlug(user.Playing_style) || extractSlug(user.playing_style) || '';
        const clubVal = user.club_slug || extractSlug(user.clubs) || extractSlug(user.club) || '';

        console.log('Extracted Initial Slugs (first load only):', { sport: sportVal, level: levelVal, style: styleVal, club: clubVal });
        
        setSport(sportVal);
        setLevel(levelVal);
        setPlayingStyle(styleVal);
        setClub(clubVal);

        if (typeof user.is_currentyly_playing !== 'undefined') {
          setCurrentPlaying(!!user.is_currentyly_playing);
        }
      }

      console.log('--- Form Initialization Complete ---');
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

  const onSaveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      let imageUrl = previewUrl;
      // If a new image is selected, upload it first
      if (imageFile) {
        console.log('Uploading new profile image...');
        const imageFormData = new FormData();
        imageFormData.append('file', imageFile);
        imageFormData.append('title', `profile_${userName || name}`);
        const uploadRes = await uploadFile(imageFormData).unwrap();
        console.log('Image uploaded successfully:', uploadRes);
        imageUrl = uploadRes.file || uploadRes.link;
      }

      // Construct plain JSON object for PATCH /me
      const updateData: any = {
        first_name: name,
        email: email,
        username: userName,
        phone: phone,
        country: nationality,
        address: address,
        gender: gender,
        description: description,
        // Send both typo and correct spelling as a troubleshooting measure
        is_currentyly_playing: !!currentPlaying,
        is_currently_playing: !!currentPlaying,
      };

      // Only include image if it was actually changed and uploaded
      if (imageFile) {
        updateData.image = imageUrl;
      }

      if (user?.last_name) updateData.last_name = user.last_name;

      const findUid = (val: string, options: any[]) => {
        return options?.find(opt => opt.slug === val)?.uid;
      }
      
      // COMPREHENSIVE PAYLOAD SHOTGUN: Send ALL variants (Slugs, UIDs, IDs, Plurals)
      if (sport) {
        const sportUid = findUid(sport, sportsData?.results || []);
        updateData.sport_slug = sport;
        updateData.sport = sportUid || sport;
        updateData.sport_id = sportUid || sport;
        updateData.sports = [sportUid || sport];
        updateData.sport_ids = [sportUid || sport];
        updateData.playing_sports = [sportUid || sport];
      }
      if (level) {
        const levelUid = findUid(level, levelsData?.results || []);
        updateData.professional_level_slug = level;
        updateData.professional_level = levelUid || level;
        updateData.professional_level_id = levelUid || level;
        updateData.professional_levels = [levelUid || level];
        updateData.professional_level_ids = [levelUid || level];
      }
      if (playingStyle) {
        const styleUid = findUid(playingStyle, stylesData?.results || []);
        updateData.playing_style_slug = playingStyle;
        updateData.playing_style = styleUid || playingStyle;
        updateData.playing_style_id = styleUid || playingStyle;
        updateData.playing_styles = [styleUid || playingStyle];
        updateData.playing_style_ids = [styleUid || playingStyle];
        updateData.Playing_style = [styleUid || playingStyle];
      }
      if (club) {
        const clubUid = findUid(club, clubsData?.results || []);
        updateData.club_slug = club;
        updateData.club = clubUid || club;
        updateData.club_id = clubUid || club;
        updateData.clubs = [clubUid || club];
        updateData.club_ids = [clubUid || club];
      }

      console.log('--- PAYLOAD BEING SENT TO BACKEND ---');
      console.table(updateData);
      console.log('JSON Payload:', JSON.stringify(updateData, null, 2));

      const updatedUser = await patchMe(updateData).unwrap();
      console.log('--- RESPONSE FROM BACKEND ---', updatedUser);

      // KEY FIX: Do NOT call getMe() after save.
      // getMe() re-fetches stale backend data and triggers useEffect([user])
      // which resets the form state back to stale backend values.
      //
      // Instead, build a mergedUser that embeds our local selections so the
      // UI immediately reflects what the user picked without waiting for a refetch.
      const mergedUser = {
        ...updatedUser,
        // Embed local slug values so extractSlug() resolves correctly on next render
        sports: sport ? [{ slug: sport, title: sport, created_at: '' }] : (updatedUser.sports || updatedUser.playing_sports || []),
        clubs: club ? [{ slug: club, title: club, kind: 'CLUB', created_at: '' }] : (updatedUser.clubs || []),
        professional_levels: level ? [{ slug: level, title: level, created_at: '' }] : (updatedUser.professional_levels || []),
        playing_styles: playingStyle ? [{ slug: playingStyle, title: playingStyle, created_at: '' }] : (updatedUser.playing_styles || updatedUser.Playing_style || []),
        is_currentyly_playing: !!currentPlaying,
      };

      dispatch(setCredentials({ ...mergedUser, access: token }));

      alert('Profile updated successfully!');
      setImageFile(null);
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
    <form id="profile-form" onSubmit={onSaveSubmit}>
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
              disabled={!isEditing}
            />

            {isEditing && (
              <Button
                type="button"
                className="border-primary-200! hover:bg-primary! hover:border-primary! text-primary! absolute right-2 bottom-0 z-10 size-7 border bg-white! hover:text-white!"
                size={'icon'}
                onClick={() => fileInputRef.current?.click()}
              >
                <Icon name="camera" height={14} width={14} />
              </Button>
            )}
          </Avatar>
          <div className="grid max-w-119 gap-2">
            <h4 className="text-black-10 text-[22px] font-semibold">{name || 'Your Name'}</h4>
            <p className="text-black-8 text-lg">{description || 'No description available'}</p>
          </div>
        </div>

        <Button
          type="button"
          className="bg-primary-200 hover:bg-primary-300 hover:text-primary text-primary gap-2.5"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Icon name={isEditing ? 'checkmark_circle' : 'pencil_edit_2'} height={20} width={20} />
          {isEditing ? 'Finish editing' : 'Edit'}
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
          disabled={!isEditing}
        />
        <CustomInputBox
          icon="email"
          label="Email Address"
          placeholder="Enter Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={true}
        />
        <CustomInputBox
          icon="at"
          label="User Name"
          placeholder="Enter User Name"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          disabled={true}
        />
        <CustomRadioBox
          icon="fi"
          label="Gender"
          placeholder="Enter Name"
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          disabled={!isEditing}
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
          disabled={!isEditing}
        />
        <CustomCountryBox
          icon="global"
          label="Nationality"
          placeholder="Enter Nationality"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          disabled={!isEditing}
        />
        <CustomInputBox
          icon="location"
          label="Address"
          placeholder="Enter Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={!isEditing}
        />
        <CustomInputBox
          icon="pencil_edit"
          label="Bio / Description"
          placeholder="Enter your professional bio"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={!isEditing}
        />
      </div>

      <div className="space-y-5">
        <div className="flex items-center gap-1.5">
          <Checkbox
            id="current"
            disabled={!isEditing}
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
            disabled={!isEditing || !currentPlaying}
          />
          <CustomSelectBox
            icon="award"
            label="Playing level"
            placeholder="Select here"
            options={levelOptions}
            value={level}
            setValue={setLevel}
            disabled={!isEditing || !currentPlaying}
          />

          <CustomSelectBox
            icon="busketball"
            label="Sport"
            placeholder="Select here"
            options={sportOptions}
            value={sport}
            setValue={setSport}
            disabled={!isEditing || !currentPlaying}
          />

          <CustomSelectBox
            icon="football_pitch"
            label="Playing Style"
            placeholder="Select here"
            options={styleOptions}
            value={playingStyle}
            setValue={setPlayingStyle}
            disabled={!isEditing || !currentPlaying}
          />
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
