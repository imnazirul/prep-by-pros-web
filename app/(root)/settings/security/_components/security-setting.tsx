'use client';

import ChangePassword from './change-password';
import SessionList from './session-list';
import TwoFactorAuthentication from './two-factor-authentication';

export default function SecuritySetting() {
  return (
    <div className="space-y-8 md:space-y-10 lg:space-y-12">
      {/* Change Password Section */}
      <ChangePassword />

      {/* Two Factor Authentication Section */}
      <TwoFactorAuthentication />

      {/* Account Log In Activity Section */}
      <SessionList />
    </div>
  );
}
