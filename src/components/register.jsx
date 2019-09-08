import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FormControl, FormGroup } from "@material-ui/core";

import config from "../config";
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
      primary_phone: "+91 ",
      team: 0,
      groups: [],
      user_permissions: ["admin"]
    }
  };
  handleChange = e => {
    const { value, name } = e.currentTarget;
    let userRegister = { ...this.state.userRegister };
    userRegister[name] = value;
    // console.log(userRegister);
    this.setState({ userRegister });
  };
  handleSubmit = e => {
    e.preventDefault();
    const { userRegister } = this.state;
    const today = new Date().toUTCString();
    userRegister.date_joined = today;
    userRegister.last_login = today;
    console.log(today);
    console.log(userRegister);
    console.log(typeof today);
  };
  render() {
    const { classes } = this.props;
    const { userRegister } = this.state;
    const { fields } = config.registrationForm;
    return (
      <div className={classes.root}>
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
                  ></TextField>
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
