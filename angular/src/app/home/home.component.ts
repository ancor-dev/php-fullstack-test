import { Component, Inject, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { PostInterface } from '../models/posts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public posts: PostInterface[];

  constructor(private http: Http, @Inject('API_URL') private apiUrl: string) { }

  ngOnInit() {
    this.loadPosts();
  }

  public loadPosts() {
    const headers: Headers = new Headers({ 'Content-Type': 'application/json' });

    this.http.get(this.apiUrl + 'posts', { headers: headers })
        .subscribe((data: Response) => {
          this.posts = data.json();
        });
  }

}
