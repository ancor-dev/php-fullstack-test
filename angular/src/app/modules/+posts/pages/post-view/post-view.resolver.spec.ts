import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import * as HttpStatus from 'http-status';

import { PostViewResolver } from './post-view.resolver';
import { PostApiService } from '../../services/post-api.service';

const postApiMock = {
  getOne() {}
};
const routerMock = {
  navigate() {}
};


describe('PostViewResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostViewResolver,
        {
          provide: PostApiService,
          useValue: postApiMock,
        },
        {
          provide: Router,
          useValue: routerMock,
        },
      ]
    });
  });

  it('should create instance', inject([PostViewResolver], (resolver: PostViewResolver) => {
    expect(resolver).toBeTruthy();
  }));

  it(
    'should return a post by slug',
    inject(
      [ PostViewResolver, Router, PostApiService ],
      (resolver: PostViewResolver, router: Router, api: PostApiService) => {
        spyOn(api, 'getOne').and.returnValue(Observable.of('some-post'));
        spyOn(router, 'navigate');

        let post;
        resolver.resolve({ params: { slug: 'some-slug' } } as any, {} as any)
                .subscribe((res) => post = res);

        expect(post).toBe('some-post');
        expect(api.getOne).toHaveBeenCalledWith('some-slug');
        expect(router.navigate).not.toHaveBeenCalled();
      },
    ),
  );

  it(
    'should does redirect for NOT_FOUND status',
    inject(
      [ PostViewResolver, Router, PostApiService ],
      (resolver: PostViewResolver, router: Router, api: PostApiService) => {

        const response = { status: HttpStatus.NOT_FOUND };
        spyOn(api, 'getOne').and.returnValue(Observable.throw(response));
        spyOn(router, 'navigate');

        let post, err;
        resolver.resolve({ params: {} } as any, {} as any)
                .subscribe(
                  (res) => post = res,
                  (res) => err = res,
                );

        expect(post).toBeUndefined();
        expect(err).toBe(response);
        expect(api.getOne).toHaveBeenCalledWith(undefined);
        expect(router.navigate).toHaveBeenCalled();
      },
    ),
  );

  it(
    'should does not redirect for non NOT_FOUND status',
    inject(
      [ PostViewResolver, Router, PostApiService ],
      (resolver: PostViewResolver, router: Router, api: PostApiService) => {

        const response = { status: HttpStatus.BAD_REQUEST }; // non NOT_FOUND
        spyOn(api, 'getOne').and.returnValue(Observable.throw(response));
        spyOn(router, 'navigate');

        let post, err;
        resolver.resolve({ params: {} } as any, {} as any)
                .subscribe(
                  (res) => post = res,
                  (res) => err = res,
                );

        expect(post).toBeUndefined();
        expect(err).toBe(response);
        expect(api.getOne).toHaveBeenCalledWith(undefined);
        expect(router.navigate).not.toHaveBeenCalled();
      },
    ),
  );
});
