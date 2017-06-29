import { TestBed, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { ApiService } from 'app/core/services/api.service';
import { CollectionModel } from 'app/models/collection.model';

import { CommentApiService } from './comment-api.service';
import { CommentModel } from '../models/comment.model';

const apiMock = {
  request() {}
};

describe('CommentApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommentApiService,
        {
          provide: ApiService,
          useValue: apiMock,
        },
      ]
    });
  });

  it('should be created', inject([CommentApiService], (service: CommentApiService) => {
    expect(service).toBeTruthy();
  }));

  it(
    'should be created',
    inject([ CommentApiService, ApiService ], (service: CommentApiService, api: ApiService) => {
      spyOn(CollectionModel, 'fromApi').and.returnValue('collection-1');
      spyOn(api, 'request').and.returnValue(Observable.of('server-response'));

      service.getListByPost(222, 111).subscribe((res) => {
        expect(res).toBe('collection-1');
      });

      expect(api.request)
        .toHaveBeenCalledWith('GET',
          '/posts/222/comments',
          { params: { page: 111, perPage: 1000 } },
        );
      expect(CollectionModel.fromApi).toHaveBeenCalledWith('server-response', CommentModel, 111);
    }),
  );
});
