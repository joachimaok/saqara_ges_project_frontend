import { IUser } from './user.interface';

export interface ILoginResponse {
  token: string;
  message: string;
  user: IUser;
}
