import {firebase} from '@react-native-firebase/app-check';

let rnfbProvider = firebase.appCheck().newReactNativeFirebaseAppCheckProvider();
rnfbProvider.configure({
  android: {
    provider: 'debug',
    debugToken: 'B2DE0923-F426-4805-AFFC-F271824B59E7',
  },
  apple: {
    provider: 'debug',
    debugToken: 'B2DE0923-F426-4805-AFFC-F271824B59E7',
  },
  web: {
    provider: 'reCaptchaV3',
    siteKey: 'unknown',
  },
});

firebase
  .appCheck()
  .initializeAppCheck({
    provider: rnfbProvider,
    isTokenAutoRefreshEnabled: true,
  });
