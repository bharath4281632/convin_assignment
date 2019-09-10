import config from "../config/config";

const getDomainName = () => {
  const userInfoStr = localStorage.getItem("userInfo");
  const loc_userInfo = JSON.parse(userInfoStr);
  return loc_userInfo ? loc_userInfo.domain : config.restApi.defaultDomain;
};
const setLocalUserInfo = userInfo => {
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
  return userInfo;
};
export default {
  getDomainName,
  setLocalUserInfo
};
