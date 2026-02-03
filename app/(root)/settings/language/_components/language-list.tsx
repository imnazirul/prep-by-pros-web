'use client';

import Icon, { IconName } from '@/lib/icon';
import { useGetMeMutation, usePatchMeMutation } from '@/redux/api/authApi';
import { selectCurrentUser, setCredentials } from '@/redux/features/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect, useState } from 'react';

interface Language {
  id: string;
  name: string;
  flag: IconName;
}

const languages: Language[] = [
  { id: 'en', name: 'English', flag: 'global' as IconName }, // Using global as fallback or until specific flag is added
  { id: 'bn', name: 'Bangla', flag: 'global' as IconName },
  { id: 'es', name: 'Spanish', flag: 'global' as IconName },
  { id: 'fr', name: 'French', flag: 'global' as IconName },
  { id: 'de', name: 'German', flag: 'global' as IconName },
  { id: 'ar', name: 'Arabic', flag: 'global' as IconName },
  { id: 'hi', name: 'Hindi', flag: 'global' as IconName },
  { id: 'pt', name: 'Portuguese', flag: 'global' as IconName },
  { id: 'ru', name: 'Russian', flag: 'global' as IconName },
  { id: 'ja', name: 'Japanese', flag: 'global' as IconName },
  { id: 'zh', name: 'Chinese', flag: 'global' as IconName },
];

export default function LanguageList() {
  const currentUser = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const [patchMe] = usePatchMeMutation();
  const [getMe, { data: fetchedUser }] = useGetMeMutation();
  const token = useAppSelector((state) => state.auth.token);

  const user = fetchedUser || currentUser;

  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    getMe({});
  }, [getMe]);

  useEffect(() => {
    if (user && user.language) {
      setSelectedLanguage(user.language);
    }
  }, [user]);

  const handleLanguageChange = async (languageId: string) => {
    setSelectedLanguage(languageId);
    try {
      const payload = { language: languageId };
      const updatedUser = await patchMe(payload).unwrap();
      dispatch(setCredentials({ ...updatedUser, access: token }));
    } catch (err) {
      console.error('Failed to update language', err);
    }
  };

  return (
    <div className="space-y-6">
      {languages.map((language) => (
        <button
          key={language.id}
          onClick={() => handleLanguageChange(language.id)}
          className="bg-black-4 hover:bg-black-4/70 flex w-full cursor-pointer items-center justify-between rounded-2xl p-4 text-left transition-colors"
        >
          <div className="flex items-center gap-5">
            <div className="overflow-hidden rounded-lg shrink-0">
              <Icon name={language.flag} height={63} width={100} />
            </div>
            <span className="text-black-8 text-xl md:text-2xl">{language.name}</span>
          </div>

          {selectedLanguage === language.id ? (
            <Icon name="checkmark_circle_fill" height={32} width={32} className="text-primary" />
          ) : (
            <Icon name="checkmark_circle" height={32} width={32} className="text-black-6" />
          )}
        </button>
      ))}
    </div>
  );
}
