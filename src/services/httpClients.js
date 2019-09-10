import axios from "axios";
import config from "../config/config";
import localStorageClients from "./localStorageClients";

const { defaultConfig } = config.restApi;
const createBaseUrl = name => `https://${name}.api.convin.ai`;
const baseUrl = () => {
  return localStorageClients.getDomainName();
};

function getHttp(url, subDomain = "app") {
  return axios.get(`${baseUrl()}${url}`, defaultConfig);
}
function postHttp(url, data, subDomain = "app") {
  return axios.post(`${baseUrl()}${url}`, data, {
    ...defaultConfig,
    "Access-Control-Request-Method": "POST"
  });
}
export default {
  getHttp,
  postHttp,
  baseUrl,
  createBaseUrl
};
