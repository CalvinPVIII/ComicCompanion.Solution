import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.comiccompanion',
  appName: 'Comic Companion',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
