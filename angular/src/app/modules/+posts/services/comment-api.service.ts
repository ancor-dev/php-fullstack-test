import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { ApiService } from 'app/core/services/api.service';
import { CollectionModel } from 'app/models/collection.model';
import { CommentModel } from '../models/comment.model';

/**
 * PostCommentApiService is better name...
 */
@Injectable()
export class CommentApiService {

  private readonly baseUrl = '/posts/:postId/comments';

  public constructor(
    private api: ApiService,
  ) {
  }

  public getListByPost(
    postId: number,
    page: number = 1,
    perPage: number = 1000,
  ): Observable<CollectionModel<CommentModel>> {
    return this
      .api
      .request(
        'GET',
        this.baseUrl.replace(':postId', String(postId)),
        {
          params: {
            page,
            perPage,
          },
        },
      )
      .map((raw: object) => CollectionModel.fromApi(raw, CommentModel, page));
  } // end getListByPost()

}
