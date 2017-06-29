import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { ApiService } from 'app/core/services/api.service';
import { CollectionModel } from 'app/models/collection.model';
import { PostModel } from '../models/post.model';

@Injectable()
export class PostApiService {

  private readonly baseUrl: string = '/posts';

  public constructor(
    private api: ApiService,
  ) {
  }

  public listPosts(page: number = 1): Observable<CollectionModel<PostModel>> {
    return this
      .api
      .request(
        'GET',
        `${this.baseUrl}`,
        {
          params: { page },
        },
      )
      .map((data: object) => CollectionModel.fromApi(data, PostModel, page));
  }

}