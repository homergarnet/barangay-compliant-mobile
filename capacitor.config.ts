import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'barangay-crime-compliant-mobile',
  webDir: 'www',

  plugins: {
    LocalNotifications: {
      iconColor: "#488AFF",
    },
  },
};

export default config;
