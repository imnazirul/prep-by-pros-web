import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import SettingsHeader from '../_components/settings-header';
import ProfileForm from './_components/profile-form';

export const metadata: Metadata = {
  title: 'Account Settings',
};

const AccountSettingsPage = () => {
  return (
    <div>
      <SettingsHeader
        title="Profile information"
        subTitle="Keep your profile up to date with accurate information"
      >
        {/* <Button>Save changes</Button> */}
      </SettingsHeader>

      <ProfileForm />
    </div>
  );
};

export default AccountSettingsPage;
