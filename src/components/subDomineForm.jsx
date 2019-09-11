import React, { Component } from "react";
import httpClients from "../services/httpClients";

import SubDominePopUp from "./uiComponents/subDominePopUp";

class SubDomainForm extends Component {
  state = {
    subDomain: "",
    error: ""
  };
  validation(data) {
    if (data.trim() === "") {
      this.setState({ error: "The Sub-Domain should not be empty" });
      return false;
    }
    return true;
  }
  handleChange = e => {
    const { value } = e.currentTarget;
    this.setState({ subDomain: value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { subDomain } = this.state;
    const baseUrl = httpClients.createBaseUrl(subDomain);
    this.setState({ error: "" });
    if (!this.validation(subDomain)) return;
    try {
      const { data: availRes } = await httpClients.getHttp(
        `/domains/availability?name=${subDomain}`
      );
      if (availRes.available) {
        const { data: domainRes } = await httpClients.postHttp("/domains/", {
          name: subDomain
        });
        if (domainRes.status) {
          this.props.setLocalUserInfo(false, baseUrl);
          return;
        }
      }
      if (availRes.status === "error") {
        this.setState({ error: availRes.message });
        return;
      }
    } catch (err) {
      if (err.response.data.message)
        return this.props.setLocalUserInfo(false, baseUrl);
      console.log(err.response.data.message);
    }
  };

  render() {
    const rootStyle = {
      position: "absolute",
      width: 620,
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)"
    };
    const { subDomain, error } = this.state;
    return (
      <div style={rootStyle}>
        <SubDominePopUp
          error={error}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          subDomain={subDomain}
        ></SubDominePopUp>
      </div>
    );
  }
}
export default SubDomainForm;
