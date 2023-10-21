import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: 'AIzaSyCmvj1t2f_TOEQymwM0mzyaFY3FFNrjWVo',
  authDomain: 'ax-connects.firebaseapp.com',
  projectId: 'ax-connects',
  storageBucket: 'ax-connects.appspot.com',
  messagingSenderId: '803049381147',
  appId: '1:803049381147:web:57522265f334e6951a07be',
  measurementId: 'G-1XN02345GP',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
