import {ENDPOINT_CONFIG} from "../globals";

export const environment = {
  production: false,
   baseUrl: 'https://testcrmapi.pasha-insurance.az/api/' + ENDPOINT_CONFIG.apiVersion,
   loginUrl: 'https://testlogin.pasha-insurance.az/',

  ...ENDPOINT_CONFIG,
};
