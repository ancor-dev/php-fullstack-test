/**
 * This interface should be in a separate file because next warning will be shown:
 *
 * WARNING in ./src/app/core/services/api.service.ts
 * 81:57-66 "export 'AppConfig' was not found in '../app-config'
 *
 */
export interface AppConfig {
  baseUrl: string;
}
