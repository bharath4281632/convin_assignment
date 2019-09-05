import React, { Component } from "react";
import axios from "axios";
import httpClients from "../services/httpClients";
export default class SubDomineForm extends Component {
  async componentDidMount() {
    const response = await httpClients.getHttp("/domains/ping/");
    console.log(response);
  }
  render() {
    return <div>Hello World subDomineForm is working</div>;
  }
}
