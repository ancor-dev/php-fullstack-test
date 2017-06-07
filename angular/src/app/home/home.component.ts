import { Component, Inject, OnInit } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { PostInterface } from '../models/posts';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ApiService]
})
export class HomeComponent implements OnInit {
  public posts: PostInterface[];

  constructor(private api: ApiService, @Inject('API_URL') private apiUrl: string) { }

  ngOnInit() {
    this.loadPosts();
  }

  public loadPosts() {
    const headers: Headers = new Headers({});

    this.api.getHttp().get(this.apiUrl + 'api/posts', { headers: headers })
        .subscribe((data: Response) => {
          this.posts = data.json();
        });
  }

}
