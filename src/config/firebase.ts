import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyAPY55WvIGmwwkk8EpU2Kq2_a_5F-OyHZU',
  authDomain: 'insane-dfa7d.firebaseapp.com',
  projectId: 'insane-dfa7d',
  storageBucket: 'insane-dfa7d.appspot.com',
  messagingSenderId: '146725686412',
  appId: '1:146725686412:web:0ddd67851e3ec556c2bfa9',
  measurementId: 'G-3CSLBLSVT8',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
