import { SessionService } from './session.service';
import { ApiService } from './api.service';
import { configProvider } from './app-config';

export const SERVICES = [
  configProvider,
  SessionService,
  ApiService,
];
