import { UserModel } from './user.model';
import { BaseModel } from './base-model';

describe('UserModel', () => {

  it('should extends of BaseModel', () => {
    const ins = new UserModel();

    expect(ins instanceof BaseModel).toBeTruthy();
  });

  it('all user fields should be available to set via constructor', () => {
    const data = <UserModel> {
      id: 1,
      username: 'test',
      email: 'test@test',
      roles: [ 'test-role' ],
    };
    const ins = new UserModel(data);

    expect(ins).toEqual(jasmine.objectContaining(data));
  });

});
