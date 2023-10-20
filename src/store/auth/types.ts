import { User } from 'domain/entities/user';

export interface AuthState {
  authorized: boolean;
  user?: User;
}
