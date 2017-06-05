import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { PostInterface } from '../models/posts';
import { CustomHttp } from '../_services/custom-http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public posts: PostInterface[];

  constructor(private http: CustomHttp) { }

  ngOnInit() {
    this.loadPosts();
  }

  public loadPosts() {
      this.http.get('posts')
          .subscribe((data: Response) => {
              this.posts = data.json();
          });
  }

}
