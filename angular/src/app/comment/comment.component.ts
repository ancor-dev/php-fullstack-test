import { Component, Inject, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';
import { CommentInterface } from '../models/comments';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  public comments: CommentInterface[];

  constructor(private http: Http, @Inject('API_URL') private apiUrl: string, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(params => {

      this.loadComments(params['id']);
    });
  }

  public loadComments(postId) {
    const headers: Headers = new Headers({});

    if (postId) {
      this.http.get(this.apiUrl + 'api/comments/' + postId, { headers: headers })
          .subscribe((data: Response) => {
            this.comments = data.json();
          });
    }
  }
}
