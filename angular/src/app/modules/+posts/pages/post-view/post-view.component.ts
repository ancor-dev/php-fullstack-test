import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { PostModel } from '../../models/post.model';

@Component({
  selector:    'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls:   [ './post-view.component.scss' ],
})
export class PostViewComponent implements OnInit, OnDestroy {

  public post: PostModel;

  /** All subscription of the page that should be closed on destroy */
  private subs: Subscription[] = [];
  private set sub(sub: Subscription) { this.subs.push(sub); }

  public constructor(
    private route: ActivatedRoute,
  ) {
  }

  public ngOnInit() {
    this.sub = this
      .route
      .data
      .subscribe(({ post }: { post: PostModel }) => this.post = post);
  }

  public ngOnDestroy(): void {
    this.subs.forEach((sub: Subscription) => sub.unsubscribe());
  }

}
