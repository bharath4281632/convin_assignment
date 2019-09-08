import React, { useState, useEffect } from "react";
import "./App.css";
import SubDomainForm from "./components/subDomineForm";
import StartUp from "./components/StartUp";
import config from "./config";
import localStorageClients from "./services/localStorageClients";

function App() {
  const { defaultDomain } = config.restApi;
  const [userInfo, setUserInfo] = useState({
    domain: defaultDomain,
    isNew: true
  });

  const setLocalUserInfo = (isNew, domain = userInfo.domain) => {
    const mod_userInfo = {
      domain,
      isNew
    };
    localStorageClients.setLocalUserInfo(mod_userInfo);
    setUserInfo(mod_userInfo);
  };
  useEffect(() => {
    let loc_userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const mod_userInfo = { ...userInfo, ...loc_userInfo };
    loc_userInfo
      ? setUserInfo(mod_userInfo)
      : localStorageClients.setLocalUserInfo(userInfo);
    console.log(mod_userInfo);
    return () => {};
  }, []);
  return (
    <div>
      <StartUp hidden={userInfo.isNew}></StartUp>
      <div hidden={!userInfo.isNew}>
        <SubDomainForm setLocalUserInfo={setLocalUserInfo}></SubDomainForm>
      </div>
    </div>
  );
}

export default App;
