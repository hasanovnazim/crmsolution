import { ENDPOINT_CONFIG } from "../globals";
export const environment = {
  production: true,
  baseUrl: "https://precrmapi.pasha-insurance.az/api/",
  loginUrl: "https://prelogin.pasha-insurance.az/",
  ...ENDPOINT_CONFIG,
};
