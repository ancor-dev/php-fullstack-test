import { TestBed, inject } from '@angular/core/testing';

import { PostListDataService } from './post-list-data.service';
import { PostApiService } from '../../services/post-api.service';
import { Subject } from 'rxjs/Subject';

const postApiMock = {
  getList(page: number) { },
};

describe('PostsDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostListDataService,
        {
          provide:  PostApiService,
          useValue: postApiMock,
        },
      ],
    });
  });

  it('should be created', inject([ PostListDataService ], (service: PostListDataService) => {
    expect(service).toBeTruthy();
  }));

  it(
    `changePage() should put new collection to 'collection$' stream and toggle 'loading' stream`,
    inject([ PostListDataService, PostApiService ], (service: PostListDataService, api) => {
      const s = new Subject();
      let loading, collection;
      spyOn(api, 'getList').and.returnValue(s);

      service.loading$.subscribe((res) => loading = res);
      service.collection$.subscribe((res) => collection = res);

      service.changePage(222);
      expect(api.getList).toHaveBeenCalledWith(222);
      expect(loading).toBeTruthy();
      expect(collection).toBeUndefined();

      s.next('collection-1');
      s.complete();
      expect(loading).toBeFalsy();
      expect(collection).toBe('collection-1');
    }),
  );

  it(
    'method init() should call changePage() only first time',
    inject([ PostListDataService ], (service: PostListDataService) => {
      spyOn(service, 'changePage');

      service.init();
      service.init();

      expect(service.changePage).toHaveBeenCalledTimes(1);
    }),
  );
});
