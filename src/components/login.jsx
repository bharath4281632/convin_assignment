import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import localStorageClients from "../services/localStorageClients";
import httpClients from "../services/httpClients";

import config from "../config";
//Material Ui component
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";

//Material-ui custom design
const style = theme => ({
  root: {},
  paper: {
    padding: 25
  }
});

export class Login extends Component {
  state = {
    userLogin: {
      username: "",
      password: ""
    },
    error: {}
  };
  handleChange = e => {
    const { value, name } = e.currentTarget;
    let userLogin = { ...this.state.userLogin };
    userLogin[name] = value;
    this.setState({ userLogin });
  };

  handleSubmit = async e => {
    e.preventDefault();

    try {
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
    const { classes } = this.props;
    const { userLogin, error } = this.state;
    const { fields } = config.loginForm;
    return (
      <div className={classes.root}>
        <div className={classes.paper}>
          <form onSubmit={this.handleSubmit}>
            <FormControl fullWidth>
              {fields.map(field => (
                <FormGroup key={field.name}>
                  <TextField
                    label={field.label}
                    value={userLogin[field.name]}
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

              <Button variant="contained" color="primary" type="submit">
                Log In
              </Button>
            </FormControl>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles(style)(Login);
