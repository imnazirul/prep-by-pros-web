'use client';
import CustomSelectModal from '@/components/ui/custom-select-modal';
import { Switch } from '@/components/ui/switch';
import Icon from '@/lib/icon';
import {
  useGetNotificationSettingsQuery,
  usePatchNotificationSettingsMutation,
} from '@/redux/api/authApi';
import { useEffect, useState } from 'react';

export default function NotificationForm() {
  const { data: notificationSettings, refetch } = useGetNotificationSettingsQuery({});
  const [patchNotificationSettings] = usePatchNotificationSettingsMutation();

  const [activityEnabled, setActivityEnabled] = useState(true);
  const [generalUpdates, setGeneralUpdates] = useState(false);
  const [invoiceUpdates, setInvoiceUpdates] = useState(true);
  const [reminderInterval, setReminderInterval] = useState('TEN_MINUTES');

  const intervals = [
    { label: '02 minutes', value: 'TWO_MINUTES' },
    { label: '05 minutes', value: 'FIVE_MINUTES' },
    { label: '10 minutes', value: 'TEN_MINUTES' },
    { label: '15 minutes', value: 'FIFTEEN_MINUTES' },
  ];

  const getIntervalLabel = (value: string) => {
    return intervals.find((i) => i.value === value)?.label || '10 minutes';
  };

  useEffect(() => {
    if (notificationSettings) {
      if (notificationSettings.is_notification_enabled !== undefined)
        setActivityEnabled(notificationSettings.is_notification_enabled);
      if (notificationSettings.is_email_general_updates_enabled !== undefined)
        setGeneralUpdates(notificationSettings.is_email_general_updates_enabled);
      if (notificationSettings.is_email_invoice_updates_enabled !== undefined)
        setInvoiceUpdates(notificationSettings.is_email_invoice_updates_enabled);
      if (notificationSettings.reminder_interval)
        setReminderInterval(notificationSettings.reminder_interval);
    }
  }, [notificationSettings]);

  const handleUpdate = async (key: string, value: any) => {
    try {
      const payload = { [key]: value };
      await patchNotificationSettings(payload).unwrap();
      refetch();
      // toast.success('Settings updated successfully'); // Kept commented as per user preference
    } catch (err) {
      console.error('Failed to update settings', err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="mb-8 space-y-6 md:mb-10 lg:mb-12">
        {/* Activity and Reminders Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <h2 className="text-black-10 text-[22px] font-semibold">Activity and Reminders</h2>
            <p className="text-black-7 text-base">
              Receive notifications of all the updates, message, followings and others
            </p>
          </div>
          <Switch
            checked={activityEnabled}
            onCheckedChange={(checked) => {
              setActivityEnabled(checked);
              handleUpdate('is_notification_enabled', checked);
            }}
            className="scale-125"
          />
        </div>

        {/* Reminders Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <h2 className="text-black-10 text-[22px] font-semibold">Reminders</h2>
            <p className="text-black-7 text-base">Reminder interval</p>
          </div>

          <CustomSelectModal
            options={intervals}
            label="Reminder interval"
            setValue={(val) => {
              setReminderInterval(val);
              handleUpdate('reminder_interval', val);
            }}
            value={reminderInterval}
          >
            <div className="bg-primary-200 text-primary hover:bg-primary-300 flex h-12 cursor-pointer items-center gap-1 rounded-lg px-6 py-3 text-lg transition-all duration-300">
              {getIntervalLabel(reminderInterval)}
              <Icon name="arrow_down" height={24} width={24} />
            </div>
          </CustomSelectModal>
        </div>
      </div>

      {/* Email Notifications Section */}
      <div>
        <h2 className="text-black-10 mb-4 text-[22px] font-semibold">Email Notifications</h2>

        {/* General Updates */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium text-[#404040]">General Updates</h3>
            <p className="mt-1 text-sm text-[#737373]">
              Receive emails of all the announcements, updates, followings and subscription
            </p>
          </div>
          <Switch
            checked={generalUpdates}
            onCheckedChange={(checked) => {
              setGeneralUpdates(checked);
              handleUpdate('is_email_general_updates_enabled', checked);
            }}
            className="mt-1 scale-125"
          />
        </div>

        {/* Invoice Updates */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium text-[#404040]">Invoice Updates</h3>
            <p className="mt-1 text-sm text-[#737373]">Get payment and other invoices by emils</p>
          </div>
          <Switch
            checked={invoiceUpdates}
            onCheckedChange={(checked) => {
              setInvoiceUpdates(checked);
              handleUpdate('is_email_invoice_updates_enabled', checked);
            }}
            className="mt-1 scale-125"
          />
        </div>
      </div>
    </div>
  );
}
