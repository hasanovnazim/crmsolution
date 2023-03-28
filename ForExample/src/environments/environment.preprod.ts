import { ENDPOINT_CONFIG } from '../globals';

export const environment = {
  production: true,
  baseUrl: 'https://predebitormodule.pasha-insurance.az',
  loginUrl: 'https://prelogin.pasha-insurance.az/',
  ...ENDPOINT_CONFIG,
};
