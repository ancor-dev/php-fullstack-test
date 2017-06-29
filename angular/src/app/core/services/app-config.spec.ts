import { InjectionToken } from '@angular/core';

import { APP_CONFIG, config } from './app-config';

describe('AppConfig', () => {

  it('API_CONFIG should be instance InjectToken', () => {
    expect(APP_CONFIG instanceof InjectionToken).toBeTruthy();
  });

  it('config object fields', () => {
    expect(typeof config.baseUrl).toEqual('string');
  });

});
