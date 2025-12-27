import { Metadata } from 'next';
import SettingsHeader from '../_components/settings-header';
import NotificationForm from './_components/notification-form';

export const metadata: Metadata = {
  title: 'Notification Center',
};

export default function NotificationSettingsPage() {
  return (
    <div>
      <SettingsHeader
        title="Notifications Center"
        subTitle="Manage alerts, reminders, and email preferences your way"
      />

      <NotificationForm />
    </div>
  );
}
