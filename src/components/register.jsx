import React, { Component } from "react";
import CustomForm from "./common/customForm";

import httpClients from "../services/httpClients";

import config from "../config/config";

export class Register extends Component {
  state = {
    userRegister: config.registrationForm.defaultValue,
    error: {}
  };
  handleChange = e => {
    const { value, name } = e.currentTarget;
    let userRegister = { ...this.state.userRegister };
    userRegister[name] = value;
    this.setState({ userRegister });
  };
  handleSubmit = async e => {
    e.preventDefault();
    const { userRegister } = this.state;
    const today = new Date().toISOString();
    userRegister.date_joined = today;
    userRegister.last_login = today;
    try {
      const response = await httpClients.postHttp(
        "/persons/create_admin/",
        userRegister
      );
      this.setState({ error: {} });
      if (response.statusText === "Created")
        return this.setState({
          userRegister: config.registrationForm.defaultValue
        });
    } catch (err) {
      if (err.response) {
        this.setState({ error: err.response.data });

        return;
      }
    }
  };
  render() {
    const { userRegister, error } = this.state;
    const { fields } = config.registrationForm;

    return (
      <div style={{ padding: 25 }}>
        Base Url: {httpClients.baseUrl()}
        <CustomForm
          fields={fields}
          fieldState={userRegister}
          error={error}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          submitContent={"Register Now"}
        ></CustomForm>
      </div>
    );
  }
}

export default Register;
