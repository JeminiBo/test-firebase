import {initializeApp} from 'firebase/app';
import {initializeFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDUIe17PbxKF3H1SU12rNpwt2S4BdN6yaY',
  authDomain: 'testiap-f12d4.firebaseapp.com',
  databaseURL:
    'https://testiap-f12d4-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'testiap-f12d4',
  storageBucket: 'testiap-f12d4.appspot.com',
  messagingSenderId: '443646832281',
  appId: '1:443646832281:web:2e03d60f0b3fb240e3d208',
  measurementId: 'G-DPJ1Y5KMJ5',
};

const app = initializeApp(firebaseConfig);

const firebase = app;

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export {db, firebase};
