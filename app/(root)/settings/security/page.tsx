import { Metadata } from 'next';
import SettingsHeader from '../_components/settings-header';
import SecuritySetting from './_components/security-setting';

export const metadata: Metadata = {
  title: 'Passwords & Others',
};

export default function SecuritySettingsPage() {
  return (
    <div>
      <SettingsHeader
        title="Passwords & Others"
        subTitle="Control your security settings and manage account protection"
      />

      <SecuritySetting />
    </div>
  );
}
