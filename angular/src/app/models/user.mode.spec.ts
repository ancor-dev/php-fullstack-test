import { UserModel } from './user.model';
import { BaseModel } from './base-model';

describe('UserModel', () => {

  it('should extends of BaseModel', () => {
    const ins = new UserModel();

    expect(ins instanceof BaseModel).toBeTruthy();
  });

  it('all fields should be available to set via constructor', () => {
    const data = <UserModel> {
      id:       1,
      userName: 'test',
      email:    'test@test',
      roles:    [ 'test-role' ],
    };
    const ins = new UserModel(data);

    expect(ins).toEqual(jasmine.objectContaining(data));
  });

  it('.fromApi() should return UserModel instance and fill it fields', () => {
    const data = {
      id:       111,
      username: 'test-name',
      email:    'test@test',
      roles:    [ 'test-role' ],
    };

    const ins = UserModel.fromApi(data);

    expect(ins instanceof UserModel).toBeTruthy();
    expect(ins.id).toBe(data.id);
    expect(ins.userName).toBe(data.username);
    expect(ins.email).toEqual(data.email);
    expect(ins.roles).toEqual(data.roles);
  });

});
