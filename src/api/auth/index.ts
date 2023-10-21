import { LoginParams, RegisterParams } from './types';
import { doc, setDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import { auth, db } from 'config/firebase';
import { User } from 'domain/entities/user';

class AuthService {
  async register(params: RegisterParams) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      params.email,
      params.password,
    );

    const user: User = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      photoUrl: userCredential.user.photoURL,
      displayName: userCredential.user.displayName,
    };

    const docRef = doc(db, 'users', user.uid);
    await setDoc(docRef, user);

    return user;
  }

  async login(params: LoginParams) {
    const userCredential = await signInWithEmailAndPassword(auth, params.email, params.password);

    const user: User = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      photoUrl: userCredential.user.photoURL,
      displayName: userCredential.user.displayName,
    };

    return user;
  }

  async loginViaGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  }

  async getGoogleRedirectResult(onSuccess?: () => void, onError?: () => void) {
    const userCredential = await getRedirectResult(auth);

    if (userCredential) {
      const user: User = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        photoUrl: userCredential.user.photoURL,
        displayName: userCredential.user.displayName,
      };

      const docRef = doc(db, 'users', user.uid);
      await setDoc(docRef, user);

      onSuccess && onSuccess();
    } else {
      onError && onError();
    }
  }

  async loginViaGithub() {
    const provider = new GithubAuthProvider();
    await signInWithRedirect(auth, provider);
  }

  async logout() {
    await signOut(auth);

    return true;
  }
}

export default new AuthService();
