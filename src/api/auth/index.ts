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
import { getUserObject } from 'domain/services/user';

class AuthService {
  async register(params: RegisterParams): Promise<User> {
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

  async login(params: LoginParams): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(auth, params.email, params.password);

    return getUserObject(userCredential.user);
  }

  async loginViaGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });

    await signInWithRedirect(auth, provider);
  }

  async loginViaGithub(): Promise<void> {
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

  async logout(): Promise<void> {
    await signOut(auth);
  }
}

export default new AuthService();
