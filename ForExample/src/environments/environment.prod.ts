import { ENDPOINT_CONFIG } from '../globals';

export const environment = {
  production: true,
  baseUrl: 'https://debitormodule.pasha-insurance.az',
  loginUrl: 'https://login.pasha-insurance.az/',
  ...ENDPOINT_CONFIG,
};
