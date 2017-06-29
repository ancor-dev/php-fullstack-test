import { BaseModel } from './base-model';
import { To } from 'app/utils/to';

export class UserModel extends BaseModel<UserModel> {

  public id: number;
  public userName: string;
  public email: string;
  public roles: string[];

  public constructor(data: UserModel = {} as UserModel) {
    super();

    const fields: Array<keyof UserModel> = [
      'id',
      'userName',
      'email',
      'roles',
    ];

    this.fillAll(data, fields);
  } // end constructor()

  public static fromApi(data: object): UserModel {
    const mapped = <UserModel> {
      id:       To.number(data[ 'id' ]),
      userName: To.string(data[ 'username' ]),
      email:    To.string(data[ 'email' ]),
      roles:    To.array(data[ 'roles' ]),
    };

    return new UserModel(mapped);
  } // end fromApi()

}
