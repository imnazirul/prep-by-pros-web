'use client';

import Icon from '@/lib/icon';
import { useState } from 'react';
import ChangePassword from './change-password';
import { Button } from '@/components/ui/button';
import TwoFactorAuthentication from './two-factor-authentication';

interface Device {
  id: string;
  name: string;
  location: string;
  date: string | null;
  isCurrentDevice: boolean;
  type: 'Desktop' | 'Mobile';
}

export default function SecuritySetting() {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'Xiaomi Redmi Note 13',
      location: 'Dhaka, Bangladesh',
      date: null,
      isCurrentDevice: true,
      type: 'Desktop',
    },
    {
      id: '2',
      name: 'iPhone 16 Pro',
      location: 'Chittagong, Bangladesh',
      date: '24 October, 2025',
      isCurrentDevice: false,
      type: 'Mobile',
    },
    {
      id: '3',
      name: 'Xiaomi Redmi Note 13',
      location: 'Dhaka, Bangladesh',
      date: '12 October, 2025',
      isCurrentDevice: false,
      type: 'Mobile',
    },
  ]);

  const handleDisconnectDevice = (deviceId: string) => {
    setDevices(devices.filter((device) => device.id !== deviceId));
    console.log('Device disconnected:', deviceId);
  };

  return (
    <div className="space-y-8 md:space-y-10 lg:space-y-12">
      {/* Change Password Section */}
      <ChangePassword />

      {/* Two Factor Authentication Section */}
      <TwoFactorAuthentication />

      {/* Account Log In Activity Section */}
      <section className="space-y-4">
        <h2 className="text-black-10 text-[22px] font-semibold">
          Account log in activity
        </h2>

        <div className="space-y-5">
          {devices.map((device) => (
            <div key={device.id} className="flex gap-3 sm:items-center">
              {device.type === 'Desktop' ? (
                <Icon
                  name="laptop"
                  height={32}
                  width={32}
                  className="text-[#404040] max-sm:mt-1"
                />
              ) : (
                <Icon
                  name="smart_phone"
                  height={32}
                  width={32}
                  className="text-[#404040] max-sm:mt-1"
                />
              )}
              <div className="flex flex-1 flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="mb-1 text-lg font-medium text-[#404040]">
                    {device.name}
                  </h3>
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <span className="text-[#737373]">{device.location}</span>
                    {device.date && (
                      <>
                        <span className="size-1.5 rounded-full bg-[#D4D4D4]" />
                        <span className="text-[#A1A1A1]">{device.date}</span>
                      </>
                    )}
                    {device.isCurrentDevice && (
                      <>
                        <span className="size-1.5 rounded-full bg-[#D4D4D4]" />
                        <span className="text-[#16A34A]">This device</span>
                      </>
                    )}
                  </div>
                </div>

                {!device.isCurrentDevice && (
                  <Button
                    variant="link"
                    className="text-primary h-auto p-0! text-base font-semibold underline"
                    onClick={() => handleDisconnectDevice(device.id)}
                  >
                    Disconnect
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
