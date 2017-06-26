import { ResponseContentType, Headers, URLSearchParams } from '@angular/http';

export interface ApiRequestOptionsArgs {
  params?: string | URLSearchParams | {
    [key: string]: any | any[];
  } | null;
  headers?: Headers | null;
  body?: any;
  withCredentials?: boolean | null;
  responseType?: ResponseContentType | null;
}
