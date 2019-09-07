import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FormControl, FormLabel, FormGroup } from "@material-ui/core";
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
      user_permissions: []
    }
  };
  handleChange = e => {
    const { value, name } = e.currentTarget;
    let userRegister = { ...this.state.userRegister };
    userRegister[name] = value;
    // console.log(userRegister);
    this.setState({ userRegister });
  };
  registerForm = [
    { label: "User Name", name: "username", type: "text" },
    { label: "password", name: "password", type: "password" },
    { label: "first Name", name: "first_name", type: "text" },
    { label: "Middle Name", name: "middle_name", type: "text" },
    { label: "Last Name", name: "last_name", type: "text" },
    { label: "Email Address", name: "email", type: "email" },
    { label: "Phone Number", name: "primary_phone", type: "text" }
  ];
  handleSubmit = e => {
    e.preventDefault();
    const { userRegister } = this.state;
    let today = new Date().toUTCString();
    userRegister.date_joined = today;
    userRegister.last_login = today;
    console.log(today);
    console.log(userRegister);
    console.log(typeof today);
  };
  render() {
    const { classes } = this.props;
    const { userRegister } = this.state;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <form onSubmit={this.handleSubmit}>
            <FormControl fullWidth>
              {this.registerForm.map(field => (
                <FormGroup key={field.name} style={{ width: "100%" }}>
                  <TextField
                    label={field.label}
                    value={userRegister[field.name]}
                    onChange={this.handleChange}
                    type={field.type}
                    margin="normal"
                    fullWidth
                    name={field.name}
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
        </Paper>
      </div>
    );
  }
}

export default withStyles(style)(Register);
