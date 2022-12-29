import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'kayrot',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins:{
    presentationOptions:['badge','sound','alert']
  }
};

export default config;
