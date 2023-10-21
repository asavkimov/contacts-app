import firebase from 'firebase/auth';
import { User } from 'domain/entities/user';

export const getUserObject = (user: firebase.User): User => {
  return {
    uid: user.uid,
    email: user.email,
    photoUrl: user.photoURL,
    displayName: user.displayName,
  };
};
