import React, { Component } from "react";
import CustomForm from "./common/customForm";

import httpClients from "../services/httpClients";

import config from "../config/config";

export class Register extends Component {
  state = {
    userRegister: {
      password: "",
      last_login: "",
      username: "",
      date_joined: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      primary_phone: "+91",
      user_permissions: [3]
    },
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
          userRegister: {
            password: "",
            last_login: "",
            username: "",
            date_joined: "",
            first_name: "",
            middle_name: "",
            last_name: "",
            email: "",
            primary_phone: "+91",
            user_permissions: [3]
          }
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
