import { TestBed, inject } from '@angular/core/testing';
import { Http } from '@angular/http';

import { ApiService } from './api.service';
import { SessionService } from './session.service';
import { APP_CONFIG, AppConfig } from './app-config';

class SessionServiceMock {

}

class HttpMock {

}

const configMock: AppConfig = {
  baseUrl: 'http://test',
};

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        {
          provide: APP_CONFIG,
          useValue: configMock,
        },
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
