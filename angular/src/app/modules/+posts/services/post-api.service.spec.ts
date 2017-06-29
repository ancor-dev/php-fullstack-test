import { TestBed, inject } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';

import { ApiService } from 'app/core/services/api.service';
import { PostApiService } from './post-api.service';
import { PostModel } from '../models/post.model';
import { CollectionModel } from 'app/models/collection.model';

export class ApiServiceMock {
  request() {}
}


describe('PostApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostApiService,
        {
          provide: ApiService,
          useClass: ApiServiceMock,
        },
      ],
    });
  });

  it('should be created', inject([ PostApiService ], (service: PostApiService) => {
    expect(service).toBeTruthy();
  }));

  it('listPosts() should fire http and returns observable collection',
    inject([ PostApiService, ApiService ], (service: PostApiService, api: ApiService) => {
      spyOn(CollectionModel, 'fromApi').and.returnValue('collection-1');
      spyOn(api, 'request').and.returnValue(Observable.of('server-response'));

      service.listPosts(222).subscribe((res) => {
        expect(res).toBe('collection-1');
      });

      expect(api.request).toHaveBeenCalledWith('GET', '/posts', { params: { page: 222 } });
      expect(CollectionModel.fromApi).toHaveBeenCalledWith('server-response', PostModel, 222);
    })
  );
});
