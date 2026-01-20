'use client';

import { useState } from 'react';
import Icon, { IconName } from '@/lib/icon';

interface Language {
  id: string;
  name: string;
  flag: IconName;
}

const languages: Language[] = [
  {
    id: 'en-AU',
    name: 'English (Australia)',
    flag: 'australia_flag' as IconName,
  },
  { id: 'en-GB', name: 'English (UK)', flag: 'australia_flag' as IconName },
  { id: 'en-US', name: 'English (USA)', flag: 'australia_flag' as IconName },
  { id: 'es-ES', name: 'Spanish (Spain)', flag: 'australia_flag' as IconName },
];

export default function LanguageList() {
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');

  const handleLanguageChange = (languageId: string) => {
    setSelectedLanguage(languageId);
    console.log('Language changed to:', languageId);
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
