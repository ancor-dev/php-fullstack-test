import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { UserModel } from 'app/models/user.model';
import { Session } from 'app/models/session';

@Injectable()
export class SessionService {

  public get isLoggedIn(): boolean {
    const session = this.session$.getValue();
    return !!session;
  }

  public get token(): string {
    const session = this.session$.getValue();
    return session && session.token;
  }

  public get user(): UserModel {
    const session = this.session$.getValue();
    return session && session.user;
  }

  public isLoggedIn$: Observable<boolean>;
  public token$: Observable<string>;
  public user$: Observable<UserModel>;

  private session$ = new BehaviorSubject<Session>(undefined);

  public constructor() {
    this.token$      = this.session$.map((session: Session) => session && session.token);
    this.user$       = this.session$.map((session: Session) => session && session.user);
    this.isLoggedIn$ = this.session$.map((session: Session) => !!session);
  }

  public login(user: UserModel, token: string): Observable<boolean> {
    this.session$.next({ user, token });

    return Observable.of(true);
  }

  public logout(): Observable<boolean> {
    this.session$.next(undefined);

    return Observable.of(true);
  }

}
