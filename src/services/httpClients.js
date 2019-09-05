import axios from "axios";
let config = {
  headers: { "Content-Type": "application/json" }
};
function getHttp(url) {
  return axios.get(url);
}
function postHttp(url, data) {
  return axios.post(url, data, config);
}
export default {
  getHttp,
  postHttp
};
