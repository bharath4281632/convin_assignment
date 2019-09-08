import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FormControl, FormGroup } from "@material-ui/core";
import Joi from "@hapi/joi";
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

export class Login extends Component {
  state = {
    userLogin: {
      username: "",
      password: ""
    }
  };
  handleChange = e => {
    const { value, name } = e.currentTarget;
    let userLogin = { ...this.state.userLogin };
    userLogin[name] = value;
    this.setState({ userLogin });
  };
  validation = () => {
    const schema = Joi.object().keys({
      ...config.loginForm.validationConditions
    });
    const result = Joi.validate(this.state.userLogin, schema, {
      abortEarly: false
    });
    console.log(result);
  };
  handleSubmit = async e => {
    e.preventDefault();
    console.log(this.state.userLogin);
    this.validation();
    try {
      const response = await httpClients.postHttp(
        "/persons/get_token/",
        this.state.userLogin,
        localStorageClients.getDomainName()
      );
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };
  render() {
    const { classes } = this.props;
    const { userLogin } = this.state;
    const { fields } = config.loginForm;
    return (
      <div className={classes.root}>
        <div className={classes.paper}>
          <form onSubmit={this.handleSubmit}>
            <FormControl fullWidth>
              {fields.map(field => (
                <FormGroup key={field.name} style={{ width: "100%" }}>
                  <TextField
                    label={field.label}
                    value={userLogin[field.name]}
                    onChange={this.handleChange}
                    type={field.type}
                    margin="normal"
                    fullWidth
                    name={field.name}
                    required={field.required}
                  ></TextField>
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
