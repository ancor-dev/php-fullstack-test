import { BaseModel } from 'app/models/base-model';
import { UserModel } from 'app/models/user.model';

import { PostModel } from './post.model';

describe('PostModel', () => {

  it('should be instance of BaseModel', () => {
    const ins = new PostModel();
    expect(ins instanceof BaseModel).toBeTruthy();
  });

  it('all fields should be available to set via constructor', () => {
    const data = {
      id:           123,
      title:        'Some title',
      slug:         'some-slag',
      summary:      'post summary',
      published_at: '2017-01-11T22:20:12+0200',
      author:       'author-object',
    };
    spyOn(UserModel, 'fromApi').and.returnValue('parsed-author-object');
    const ins = PostModel.fromApi(data);

    expect(ins instanceof PostModel).toBeTruthy();
    expect(ins.id).toBe(data.id);
    expect(ins.title).toBe(data.title);
    expect(ins.slug).toEqual(data.slug);
    expect(ins.summary).toBe(data.summary);
    expect(+ins.publishedAt).toBe(+new Date(data.published_at));
    expect(ins.author).toBe('parsed-author-object');

    expect(UserModel.fromApi).toHaveBeenCalledWith('author-object');
  });

});
