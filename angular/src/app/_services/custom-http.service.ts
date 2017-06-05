import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { API_CONST } from './constants';

@Injectable()
export class CustomHttp extends Http {
    // NG#4 already Done
    constructor(backend: XHRBackend, options: RequestOptions) {
        super(backend, options);
    }

    public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.get(API_CONST.url + url, this.extendOptions(options));
    }

    private extendOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (!options) {
            options = new RequestOptions();
        }

        if (!('headers' in options) || !options['headers']) {
            options['headers'] = new Headers({ 'Content-Type': 'application/json' });
        }
        return options;
    }
}
