import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve } from '@angular/router';
import { Response } from '@angular/http';

import * as HttpStatus from 'http-status';
import { Observable } from 'rxjs/Observable';

import { PostModel } from '../../models/post.model';
import { PostApiService } from '../../services/post-api.service';

@Injectable()
export class PostViewResolver implements Resolve<PostModel> {

  public constructor(
    private postApi: PostApiService,
    private router: Router,
  ) {
  }

  public resolve(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<PostModel> {
    const slug = next.params[ 'slug' ];

    return this
      .postApi
      .getOne(slug)
      .catch((res: Response) => {
        if (res.status === HttpStatus.NOT_FOUND) {
          this.router.navigate(['/not-found']);
        }

        return Observable.throw(res);
      });
  }
}
