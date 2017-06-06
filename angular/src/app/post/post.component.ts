import { Component, Inject, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { PostInterface } from '../models/posts';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  public post: PostInterface;

  constructor(private http: Http, @Inject('API_URL') private apiUrl: string, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(params => {

      this.loadPost(params['id']);
    });
  }

  public loadPost(postId) {
    const headers: Headers = new Headers({});

    if (postId) {
      this.http.get(this.apiUrl + 'posts/' + postId, { headers: headers })
          .subscribe((data: Response) => {
            this.post = data.json();
            console.log(this.post);
          });
    }
  }
}
