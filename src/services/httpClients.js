import axios from "axios";
import config from "../config";

const { defaultConfig } = config.restApi;

const customDomain = name => `https://${name}.api.convin.ai`;

function getHttp(url, subDomain = "app") {
  return axios.get(`${customDomain(subDomain)}${url}`);
}
function postHttp(url, data, subDomain = "app") {
  return axios.post(`${customDomain(subDomain)}${url}`, data, defaultConfig);
}
export default {
  getHttp,
  postHttp,
  customDomain
};
