import { IUser } from './user.interface';

export interface IAuthContext {
  token: string | null;
  userData: IUser | null;
  isAuthenticated: boolean;
  login: (token: string, userData: IUser) => void;
  logout: () => void;
}
