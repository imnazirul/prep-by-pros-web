import { Metadata } from 'next';
import LanguageList from './_components/language-list';
import SettingsHeader from '../_components/settings-header';

export const metadata: Metadata = {
  title: 'Language Settings',
};

export default function LanguageSettingsPage() {
  return (
    <div>
      <SettingsHeader
        title="Language"
        subTitle="Set your display language and personalize your interface"
      />

      <div className="space-y-4">
        <h2 className="text-black-8 text-[22px] font-semibold">Languages</h2>

        <LanguageList />
      </div>
    </div>
  );
}
