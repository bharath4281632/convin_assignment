import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { FormControl, FormLabel, FormGroup } from "@material-ui/core";
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
    console.log(userLogin);
    this.setState({ userLogin });
  };
  render() {
    const { classes } = this.props;
    const { userLogin } = this.state;
    return (
      <div className={classes.root}>
        <Paper>
          <form>
            <FormControl>
              <FormLabel>Register Here</FormLabel>
              <FormGroup>
                <TextField
                  label="Enter Your Sub-Domine"
                  value={userLogin.username}
                  onChange={this.handleChange}
                  margin="normal"
                  fullWidth
                  name="username"
                ></TextField>
              </FormGroup>
              <FormGroup>
                <TextField
                  label="Enter Your Sub-Domine"
                  value={userLogin.password}
                  onChange={this.handleChange}
                  margin="normal"
                  fullWidth
                  name="password"
                ></TextField>
              </FormGroup>
            </FormControl>
          </form>
        </Paper>
      </div>
    );
  }
}

export default withStyles(style)(Login);
