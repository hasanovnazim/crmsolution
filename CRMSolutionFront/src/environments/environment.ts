import {ENDPOINT_CONFIG} from "../globals";

export const environment = {
  production: true,
   //baseUrl: 'https://testcrmapi.pasha-insurance.az/api/',
   //loginUrl: 'https://testlogin.pasha-insurance.az/',

 baseUrl: 'http://localhost:4200/assets/jsons/',
 loginUrl: 'http://localhost:4200/assets/jsons/',
  ...ENDPOINT_CONFIG,
};
