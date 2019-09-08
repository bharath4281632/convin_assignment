import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FormControl, FormGroup, FormHelperText } from "@material-ui/core";

import config from "../config";
import httpClients from "../services/httpClients";
import localStorageClients from "../services/localStorageClients";
//Material-ui custom design
const style = theme => ({
  root: {},
  paper: {
    padding: 25
  }
});
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
    error: {
      username: "User Name is already filled"
    }
  };
  handleChange = e => {
    const { value, name } = e.currentTarget;
    let userRegister = { ...this.state.userRegister };
    userRegister[name] = value;
    // console.log(userRegister);
    this.setState({ userRegister });
  };
  handleSubmit = async e => {
    e.preventDefault();

    const { userRegister } = this.state;
    const today = new Date().toISOString();
    userRegister.date_joined = today;
    userRegister.last_login = today;
    console.log(userRegister);
    try {
      const response = await httpClients.postHttp(
        "/persons/create_admin/",
        userRegister
      );
      console.log(response);
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
        console.log(err.response.data);
        return;
      }
    }
  };
  render() {
    const { classes } = this.props;
    const { userRegister, error } = this.state;
    const { fields } = config.registrationForm;
    return (
      <div className={classes.root}>
        Base Url: {httpClients.baseUrl()}
        <div className={classes.paper}>
          <form onSubmit={this.handleSubmit}>
            <FormControl fullWidth>
              {fields.map(field => (
                <FormGroup key={field.name} style={{ width: "100%" }}>
                  <TextField
                    label={field.label}
                    value={userRegister[field.name]}
                    onChange={this.handleChange}
                    type={field.type}
                    margin="normal"
                    fullWidth
                    name={field.name}
                    required={field.required}
                    error={error[field.name] ? true : false}
                  ></TextField>
                  <FormHelperText error={error[field.name] ? true : false}>
                    {error[field.name]}
                  </FormHelperText>
                </FormGroup>
              ))}
              <FormGroup>
                <Button variant={"contained"} color="primary" type="submit">
                  Register Now
                </Button>
              </FormGroup>
            </FormControl>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(style)(Register);
