import { Inject, Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptionsArgs } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import * as HttpStatus from 'http-status';

import { ApiRequestOptionsArgs } from 'app/models/request-options';
import { ResponseWrap } from 'app/models/response-wrap';
import { SessionService } from './session.service';
import { APP_CONFIG, AppConfig } from './app-config';


/**
 * @todo: finish the unit test
 */
@Injectable()
export class ApiService {

  public constructor(
    @Inject(APP_CONFIG) private config: AppConfig,
    private session: SessionService,
    private http: Http,
  ) {
  }

  public request(
    method: string,
    url: string,
    options?: ApiRequestOptionsArgs,
  ): Observable<ResponseWrap> {
    const preparedOptions = this.prepare({
      method,
      ...options,
    });

    return this
      .http
      .request(`${this.config.baseUrl}${url}`, preparedOptions)
      .catch(this.handleError.bind(this))
      .map(this.handleResponse.bind(this))
    ;
  }

  private prepare(params: RequestOptionsArgs): RequestOptionsArgs {
    if (!params.headers) {
      params.headers = new Headers();
    }

    if (!params.headers.has('Authorization')) {
      if (this.session.token) {
        params.headers.set('Authorization', `Bearer ${this.session.token}`);
      }
    }
    if (!params.headers.has('Content-Type')) {
      params.headers.set('Content-Type', 'application/json');
    }
    if (!params.headers.has('Accept')) {
      params.headers.set('Accept', 'application/json');
    }

    return params;
  }

  private handleResponse(res: Response): ResponseWrap {
    const wrapper: ResponseWrap = res.json();

    if (wrapper instanceof Object) {
      Object.defineProperty(wrapper, 'rawResponse', {
        get() { return res; },
      });
    }

    return wrapper;
  }

  private handleError(res: Response): ErrorObservable {
    if (res.status === HttpStatus.UNAUTHORIZED) {
      this.session.logout();
    }

    return Observable.throw(res);
  }

}
