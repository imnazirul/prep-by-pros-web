'use client';

import Icon from '@/lib/icon';
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import CustomSelectModal from '@/components/ui/custom-select-modal';

export default function NotificationForm() {
  const [activityEnabled, setActivityEnabled] = useState(true);
  const [generalUpdates, setGeneralUpdates] = useState(false);
  const [invoiceUpdates, setInvoiceUpdates] = useState(true);
  const [reminderInterval, setReminderInterval] = useState('10 minutes');

  const intervals = [
    { label: '02 minutes', value: '02 minutes' },
    { label: '05 minutes', value: '05 minutes' },
    { label: '10 minutes', value: '10 minutes' },
    { label: '15 minutes', value: '15 minutes' },
  ];

  return (
    <div className="space-y-8">
      <div className="mb-8 space-y-6 md:mb-10 lg:mb-12">
        {/* Activity and Reminders Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <h2 className="text-black-10 text-[22px] font-semibold">
              Activity and Reminders
            </h2>
            <p className="text-black-7 text-base">
              Receive notifications of all the updates, message, followings and
              others
            </p>
          </div>
          <Switch
            checked={activityEnabled}
            onCheckedChange={setActivityEnabled}
            className="scale-125"
          />
        </div>

        {/* Reminders Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <h2 className="text-black-10 text-[22px] font-semibold">
              Reminders
            </h2>
            <p className="text-black-7 text-base">Reminder interval</p>
          </div>

          <CustomSelectModal
            options={intervals}
            label="Reminder interval"
            setValue={setReminderInterval}
            value={reminderInterval}
          >
            <div className="bg-primary-200 text-primary hover:bg-primary-300 flex h-12 cursor-pointer items-center gap-1 rounded-lg px-6 py-3 text-lg transition-all duration-300">
              {reminderInterval}
              <Icon name="arrow_down" height={24} width={24} />
            </div>
          </CustomSelectModal>
        </div>
      </div>

      {/* Email Notifications Section */}
      <div>
        <h2 className="text-black-10 mb-4 text-[22px] font-semibold">
          Email Notifications
        </h2>

        {/* General Updates */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium text-[#404040]">
              General Updates
            </h3>
            <p className="mt-1 text-sm text-[#737373]">
              Receive emails of all the announcements, updates, followings and
              subscription
            </p>
          </div>
          <Switch
            checked={generalUpdates}
            onCheckedChange={setGeneralUpdates}
            className="mt-1 scale-125"
          />
        </div>

        {/* Invoice Updates */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium text-[#404040]">
              Invoice Updates
            </h3>
            <p className="mt-1 text-sm text-[#737373]">
              Get payment and other invoices by emils
            </p>
          </div>
          <Switch
            checked={invoiceUpdates}
            onCheckedChange={setInvoiceUpdates}
            className="mt-1 scale-125"
          />
        </div>
      </div>
    </div>
  );
}
