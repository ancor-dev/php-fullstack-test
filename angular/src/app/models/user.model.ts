import { BaseModel } from './base-model';

export class UserModel extends BaseModel<UserModel> {

  public id: number;
  public username: string;
  public email: string;
  public roles: string[];

  public constructor(data: UserModel = {} as UserModel) {
    super();

    const fields: Array<keyof UserModel> = [
      'id',
      'username',
      'email',
      'roles',
    ];

    this.fillAll(data, fields);
  } // end constructor()
}
