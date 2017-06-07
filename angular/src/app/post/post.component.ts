import { Component, Inject, OnInit } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { PostInterface } from '../models/posts';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [ApiService]
})
export class PostComponent implements OnInit {
  public post: PostInterface;

  constructor(private api: ApiService, @Inject('API_URL') private apiUrl: string, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(params => {

      this.loadPost(params['id']);
    });
  }

  public loadPost(postId) {
    const headers: Headers = new Headers({});

    if (postId) {
      this.api.getHttp().get(this.apiUrl + 'api/posts/' + postId, { headers: headers })
          .subscribe((data: Response) => {
            this.post = data.json();
          });
    }
  }
}
