import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CollectionModel } from 'app/models/collection.model';

import { CommentApiService } from '../../services/comment-api.service';
import { CommentModel } from '../../models/comment.model';

/**
 * @todo: pagination or infinite scroll
 */
@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnChanges {

  public collection: CollectionModel<CommentModel>;

  @Input()
  public postId: number;

  public constructor(
    private api: CommentApiService,
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes[ 'postId' ] && this.postId) {
      this
        .api
        .getListByPost(this.postId)
        .subscribe((collection) => this.collection = collection);
    }
  }

}
