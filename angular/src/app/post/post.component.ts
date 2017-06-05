import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

import { PostInterface } from '../models/posts';
import {CustomHttp} from '../_services/custom-http.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {
  public post: PostInterface;
  public loading = true;


  constructor(private http: CustomHttp,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];

    this.http.get('posts/' + id)
        .subscribe((data: Response) => {
          this.post = data.json();
          this.loading = false;
        });
  }

}
