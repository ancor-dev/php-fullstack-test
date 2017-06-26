import { TestBed, inject } from '@angular/core/testing';

import { SessionService } from './session.service';

import 'app/rxjs-operators';
import { Observable } from 'rxjs/Observable';

describe('SessionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ SessionService ],
    });
  });

  it('should be created', inject([ SessionService ], (service: SessionService) => {
    expect(service).toBeTruthy();
  }));

  it('.token$ and .user$ should be observable', inject([ SessionService ], (service: SessionService) => {
    expect(service.token$ instanceof Observable).toBeTruthy();
    expect(service.user$ instanceof Observable).toBeTruthy();
  }));

  it('login() and logout() methods should works correctly', inject([ SessionService ], (service: SessionService) => {
    let user, token, isLoggedIn;

    service.isLoggedIn$.subscribe((curr) => isLoggedIn = curr);
    service.user$.subscribe((curr) => user = curr);
    service.token$.subscribe((curr) => token = curr);

    const originalUser: any = { name: 'test' };
    const originalToken = 'test-token';

    service.login(originalUser, originalToken).subscribe((res) => expect(res).toBeTruthy());

    expect(isLoggedIn).toBeTruthy();
    expect(user).toBe(originalUser);
    expect(token).toBe(originalToken);

    expect(service.isLoggedIn).toBeTruthy();
    expect(service.user).toBe(originalUser);
    expect(service.token).toBe(originalToken);


    service.logout().subscribe((res) => expect(res).toBeTruthy());

    expect(isLoggedIn).toBeFalsy();
    expect(user).toBe(undefined);
    expect(token).toBe(undefined);

    expect(service.isLoggedIn).toBeFalsy();
    expect(service.user).toBe(undefined);
    expect(service.token).toBe(undefined);
  }));
});
