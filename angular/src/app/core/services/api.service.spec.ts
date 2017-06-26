import { TestBed, inject } from '@angular/core/testing';
import { Http } from '@angular/http';

import { ApiService } from './api.service';
import { SessionService } from './session.service';

class SessionServiceMock {

}

class HttpMock {

}

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        {
          provide: SessionService,
          useClass: SessionServiceMock,
        },
        {
          provide: Http,
          useClass: HttpMock,
        },
      ],
    });
  });

  it('should be created', inject([ ApiService ], (service: ApiService) => {
    expect(service).toBeTruthy();
  }));
});
