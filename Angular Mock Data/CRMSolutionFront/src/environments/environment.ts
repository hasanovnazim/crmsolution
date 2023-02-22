import {ENDPOINT_CONFIG} from "../globals";

export const environment = {
  production: true,
  baseUrl: 'https://testcrmapi.pasha-insurance.az/api/',
  loginUrl: 'https://testlogin.pasha-insurance.az/',

  // baseUrl: 'https://localhost:7097/api/',
  // loginUrl: 'https://localhost:7097/api/',
  ...ENDPOINT_CONFIG,
};
