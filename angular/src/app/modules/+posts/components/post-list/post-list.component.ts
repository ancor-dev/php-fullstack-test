import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { CollectionModel } from 'app/models/collection.model';
import { PostModel } from '../../models/post.model';
import { PostListDataService } from './post-list-data.service';

/**
 * It is better to use query parameter for current pagination page, but this example without it
 */
@Component({
  templateUrl: './post-list.component.html',
  styleUrls:   [ './post-list.component.scss' ],
  providers:   [ PostListDataService ],
})
export class PostListComponent implements OnInit {

  public loading$: Observable<boolean>;
  public collection$: Observable<CollectionModel<PostModel>>;

  public constructor(
    private data: PostListDataService,
  ) {
  }

  public ngOnInit() {
    this.loading$    = this.data.loading$;
    this.collection$ = this.data.collection$;

    this.data.changePage(1);
  }

  public onChangePage(page: number): void {
    this.data.changePage(page);
  }

}
