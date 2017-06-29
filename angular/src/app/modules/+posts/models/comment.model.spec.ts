import { BaseModel } from 'app/models/base-model';
import { CommentModel } from './comment.model';
import { UserModel } from 'app/models/user.model';

describe('CommentModel', () => {

  it('should be instance of BaseModel', () => {
    const ins = new CommentModel();
    expect(ins instanceof BaseModel).toBeTruthy();
  });

  it('fromApi() should transform set all fields via constructor', () => {
    const data = {
      id:           111,
      content:      'some-content',
      published_at: '2017-01-11T22:20:12+0200',
      author:       'author-object' as any,
    };
    spyOn(UserModel, 'fromApi').and.returnValue('parsed-author-object');
    const ins = CommentModel.fromApi(data);

    expect(ins instanceof CommentModel).toBeTruthy();
    expect(ins.id).toBe(data.id);
    expect(ins.content).toBe(data.content);
    expect(+ins.publishedAt).toBe(+new Date(data.published_at));
    expect(ins.author).toBe('parsed-author-object');

    expect(UserModel.fromApi).toHaveBeenCalledWith('author-object');
  });

});
