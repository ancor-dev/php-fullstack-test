import { InjectionToken } from '@angular/core';
import { environment } from 'environments/environment';
import { AppConfig } from './app-config.interface';

export { AppConfig } from './app-config.interface';

export const APP_CONFIG = new InjectionToken<AppConfig>('app-config');

export const config: AppConfig = {
  baseUrl: environment.production
             ? 'http://production/api/url'
             : 'http://localhost:8000/api/v1',
};

export const configProvider = {
  provide:  APP_CONFIG,
  useValue: config,
};
