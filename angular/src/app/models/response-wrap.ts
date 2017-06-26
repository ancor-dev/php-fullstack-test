import { Response } from '@angular/http';

export interface ResponseWrap {
  [key: string]: any;
  rawResponse: Response;
}
