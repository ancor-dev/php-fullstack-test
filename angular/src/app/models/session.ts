import { UserModel } from './user.model';

export interface Session {
  user: UserModel;
  token: string;
}
