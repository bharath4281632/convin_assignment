import * as jwt_decoder from "jwt-decode";

export function logOutUser() {
  localStorage.removeItem("token");
  window.location.href = "/";
}
export function Unix_timestamp(t) {
  var dt = new Date(t * 1000);
  var hr = dt.getHours();
  var m = "0" + dt.getMinutes();
  var s = "0" + dt.getSeconds();
  return hr + ":" + m.substr(-2) + ":" + s.substr(-2);
}
export function currentUser() {
  if (localStorage.getItem("token")) {
    var userInfo = jwt_decoder(localStorage.getItem("token"));
    if (userInfo.email) {
      return userInfo;
    }
  }
  localStorage.removeItem("token");
  return false;
}
