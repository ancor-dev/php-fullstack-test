import { Component, Input, OnInit } from '@angular/core';

import { PostModel } from '../../models/post.model';

@Component({
  selector:    'app-post',
  templateUrl: './post.component.html',
  styleUrls:   ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input()
  public post: PostModel;

  public constructor() { }

  public ngOnInit() {
  }

}
