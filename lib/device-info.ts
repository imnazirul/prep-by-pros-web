export const getDeviceInfo = () => {
  if (typeof window === 'undefined') {
    return {
      appName: 'web',
      appVersion: 'web',
      device_name: 'web',
      device_id: 'web',
      platform: 'unknown',
      userAgent: 'unknown',
    };
  }

  const userAgent = window.navigator.userAgent;
  let deviceName = 'Unknown Device';
  let deviceType = 'Desktop';

  // Simple OS detection
  if (userAgent.indexOf('Win') !== -1) deviceName = 'Windows';
  else if (userAgent.indexOf('Mac') !== -1) deviceName = 'Mac/iOS';
  else if (userAgent.indexOf('X11') !== -1) deviceName = 'Unix';
  else if (userAgent.indexOf('Linux') !== -1) deviceName = 'Linux';
  else if (userAgent.indexOf('Android') !== -1) {
    deviceName = 'Android';
    deviceType = 'Mobile';
  } else if (userAgent.indexOf('iPhone') !== -1) {
    deviceName = 'iPhone';
    deviceType = 'Mobile';
  } else if (userAgent.indexOf('iPad') !== -1) {
    deviceName = 'iPad';
    deviceType = 'Tablet';
  }

  // Browser detection
  let browserName = 'Browser';
  if (userAgent.indexOf('Chrome') !== -1 && userAgent.indexOf('Edg') === -1) {
    browserName = 'Chrome';
  } else if (userAgent.indexOf('Firefox') !== -1) {
    browserName = 'Firefox';
  } else if (userAgent.indexOf('Safari') !== -1 && userAgent.indexOf('Chrome') === -1) {
    browserName = 'Safari';
  } else if (userAgent.indexOf('Edg') !== -1) {
    browserName = 'Edge';
  }

  // Construct a readable name
  const finalName = `${browserName} on ${deviceName}`;

  // Use userAgent as a pseudo-unique ID base if needed, or just "web" with timestamp
  // Ideally, we'd store a UUID in localStorage, but for now let's just use the name
  // The API seems to just want a string.

  return {
    device_name: finalName,
    device_id: finalName, // Using the same readable name for now as ID, or could remain 'web' + timestamp
    platform: deviceName,
    userAgent: userAgent,
  };
};
