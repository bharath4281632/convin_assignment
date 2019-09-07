import React, { useState, useEffect } from "react";
import "./App.css";
import SubDomainForm from "./components/subDomineForm";
import StartUp from "./components/StartUp";
import config from "./config";

function App() {
  // const [isNew, setIsNew] = useState(false);
  const { domain: url } = config.restApi;
  const [userInfo, setUserInfo] = useState({
    domain: url,
    isNew: false
  });

  const setLocalUserInfo = (isNew, domain = url) => {
    const mod_userInfo = {
      domain,
      isNew
    };
    localStorage.setItem("userInfo", JSON.stringify(mod_userInfo));
    setUserInfo(mod_userInfo);
  };
  useEffect(() => {
    try {
      let loc_userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const mod_userInfo = { ...userInfo, ...loc_userInfo };
      console.log(mod_userInfo);
      setUserInfo(mod_userInfo);
    } catch {
      console.log("No isNew value");
    }
    return () => {};
  }, []);
  return (
    <div>
      <StartUp></StartUp>
      <div hidden={!userInfo.isNew}>
        <SubDomainForm setLocalUserInfo={setLocalUserInfo}></SubDomainForm>
      </div>
    </div>
  );
}

export default App;
