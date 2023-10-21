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
import { getUserObject } from '../../domain/services/user';

class AuthService {
  async register(params: RegisterParams) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      params.email,
      params.password,
    );

    const user = getUserObject(userCredential.user);

    const docRef = doc(db, 'users', user.uid);
    await setDoc(docRef, user);

    return user;
  }

  async login(params: LoginParams) {
    const userCredential = await signInWithEmailAndPassword(auth, params.email, params.password);

    return getUserObject(userCredential.user);
  }

  async loginViaGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  }

  async loginViaGithub() {
    const provider = new GithubAuthProvider();
    await signInWithRedirect(auth, provider);
  }

  async getRedirectAuthResult(): Promise<User | null> {
    const userCredential = await getRedirectResult(auth);

    if (!userCredential) {
      return null;
    }

    const user = getUserObject(userCredential.user);

    const docRef = doc(db, 'users', user.uid);
    await setDoc(docRef, user);

    return user;
  }

  async logout() {
    await signOut(auth);

    return true;
  }
}

export default new AuthService();
