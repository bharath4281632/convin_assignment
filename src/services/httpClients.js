import axios from "axios";
function getHttp(url) {
  let config = {
    headers: { "Access-Control-Allow-Origin": "*" }
  };
  return axios.get(url);
}

export default {
  getHttp
};
