import { ENDPOINT_CONFIG } from "../globals";

export const environment = {
  production: true,
  baseUrl:
    "https://crmapi.pasha-insurance.az/api/" + ENDPOINT_CONFIG.apiVersion,
  loginUrl: "https://login.pasha-insurance.az/",
  ...ENDPOINT_CONFIG,
};
