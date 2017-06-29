import { BaseModel } from 'app/models/base-model';
import { UserModel } from 'app/models/user.model';
import { To } from 'app/utils/to';

/**
 * Universal comment model. This model can be used as independent comment model.
 * It doesn't require on PostModel or any other entity, but in this example the model placed at here.
 *
 * In real application i would create separate universal module with it own models,
 * service and components for comments.
 */
export class CommentModel extends BaseModel<CommentModel> {

  public id: number;
  public content: string;
  public publishedAt: Date;
  public author: UserModel;

  public constructor(data: CommentModel = {} as CommentModel) {
    super();

    const fields: Array<keyof CommentModel> = [
      'id',
      'content',
      'publishedAt',
      'author',
    ];

    this.fillAll(data, fields);
  } // end constructor()

  public static fromApi(data: object): CommentModel {
    const mapped = <CommentModel> {
      id:      To.number(data[ 'id' ]),
      content: To.string(data[ 'content' ]),

      publishedAt: To.empty(
        data[ 'published_at' ],
        undefined,
        () => new Date(data[ 'published_at' ]),
      ),

      author: To.empty(data[ 'author' ], undefined, () => UserModel.fromApi(data[ 'author' ])),
    };

    return new CommentModel(mapped);
  } // end fromApi()
}
