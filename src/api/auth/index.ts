import { LoginParams, RegisterParams } from './types';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from 'config/firebase';
import { User } from 'domain/entities/user';

class AuthService {
  async register(params: RegisterParams) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      params.email,
      params.password,
    );

    const user: User = {
      id: userCredential.user.uid,
      email: userCredential.user.email,
    };

    return user;
  }

  async login(params: LoginParams) {
    const userCredential = await signInWithEmailAndPassword(auth, params.email, params.password);

    const user: User = {
      id: userCredential.user.uid,
      email: userCredential.user.email,
    };

    return user;
  }

  async logout() {
    await signOut(auth);

    return true;
  }
}

export default new AuthService();
