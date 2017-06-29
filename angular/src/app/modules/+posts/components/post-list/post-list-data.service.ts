import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { CollectionModel } from 'app/models/collection.model';
import { PostModel } from '../../models/post.model';
import { PostApiService } from '../../services/post-api.service';

@Injectable()
export class PostListDataService {

  public loading$: Observable<boolean>;
  public collection$: Observable<CollectionModel<PostModel>>;

  private _collection$ = new BehaviorSubject<CollectionModel<PostModel>>(undefined);
  private _loading$    = new BehaviorSubject<boolean>(false);

  public constructor(
    private postApi: PostApiService,
  ) {
    this.loading$    = this._loading$.asObservable();
    this.collection$ = this._collection$.filter((data) => !!data);
  }

  public changePage(page: number): void {
    this._loading$.next(true);
    this
      .postApi
      .listPosts(page)
      .finally(() => this._loading$.next(false))
      .subscribe(
        (collection) => this._collection$.next(collection),
        // @todo: handle errors
      );
  }

}
