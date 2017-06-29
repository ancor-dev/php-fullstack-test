import { BaseModel } from 'app/models/base-model';
import { UserModel } from 'app/models/user.model';

import { To } from 'app/utils/to';

export class PostModel extends BaseModel<PostModel> {

  public id: number;
  public title: string;
  public slug: string;
  public summary: string;
  public content: string;
  public readonly publishedAt: Date;
  public readonly author: UserModel;

  public constructor(data: PostModel = {} as PostModel) {
    super();

    const fields: Array<keyof PostModel> = [
      'id',
      'title',
      'slug',
      'summary',
      'content',
      'publishedAt',
      'author',
    ];

    this.fillAll(data, fields);
  } // end constructor();

  public static fromApi(data: object): PostModel {
    const mapped = <PostModel> {
      id:      To.number(data[ 'id' ]),
      title:   To.string(data[ 'title' ]),
      slug:    To.string(data[ 'slug' ]),
      summary: To.string(data[ 'summary' ]),
      content: To.string(data[ 'content' ]),

      publishedAt: To.empty(
        data[ 'published_at' ],
        undefined,
        () => new Date(data[ 'published_at' ]),
      ),

      author: To.empty(data[ 'author' ], undefined, () => UserModel.fromApi(data[ 'author' ])),
    };

    return new PostModel(mapped);
  } // end fromApi()

}
