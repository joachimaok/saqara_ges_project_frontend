export interface IUser {
  username: string;
  password?: string; // Optional because we may not always have the password in the context
}
