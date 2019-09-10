import React, { Component } from "react";
import CustomForm from "./uiComponents/customForm";

import httpClients from "../services/httpClients";
import localStorageClients from "../services/localStorageClients";

import config from "../config/config";

//Material-ui custom design

export class Login extends Component {
  state = {
    userLogin: config.loginForm.defaultValue,
    error: {}
  };
  // componentDidMount(){
  // this.set
  // }
  handleChange = e => {
    const { value, name } = e.currentTarget;
    let userLogin = { ...this.state.userLogin };
    userLogin[name] = value;
    this.setState({ userLogin });
  };

  handleSubmit = async e => {
    try {
      e.preventDefault();
      const response = await httpClients.postHttp(
        "/persons/get_token/",
        this.state.userLogin,
        localStorageClients.getDomainName()
      );
      if (response.statusText === "OK") {
        localStorage.setItem("token", response.data.token);
        window.location.href = "/home";
      }
    } catch (err) {
      err.response
        ? this.setState({ error: err.response.data })
        : console.error(err.message);
    }
  };
  render() {
    const { userLogin, error } = this.state;
    const { fields } = config.loginForm;
    return (
      <div style={{ padding: 25 }}>
        Base Url: {httpClients.baseUrl()}
        <CustomForm
          fields={fields}
          fieldState={userLogin}
          error={error}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          submitContent={"Login Now"}
        ></CustomForm>
      </div>
    );
  }
}

export default Login;
