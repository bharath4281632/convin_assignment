import React, { Component } from "react";
import httpClients from "../services/httpClients";
// import config from "../config";
//material design Ui components
import Paper from "@material-ui/core/Paper";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";

import { withStyles } from "@material-ui/core/styles";

//Material-ui custom design
const style = theme => ({
  root: {
    position: "absolute",
    width: 620,
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)"
  },
  paper: {
    padding: 25
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  button: {
    float: "right",
    "&::after": {
      content: "gg",
      background: "black",
      clear: "both"
    }
  },
  formLabel: {
    color: "black"
  }
});

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
    const { classes } = this.props;
    const { subDomain, error } = this.state;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <form onSubmit={this.handleSubmit}>
            <FormLabel className={classes.formLabel}>
              Create A Custom Sub-Domine
            </FormLabel>
            <FormGroup className={classes.textField}>
              <TextField
                error={error ? true : false}
                label="Enter Your Sub-Domine"
                value={subDomain}
                onChange={this.handleChange}
                margin="normal"
                fullWidth
                name="subDomain"
              />
              <FormHelperText error={error ? true : false}>
                {error}
              </FormHelperText>
            </FormGroup>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Create a SubDomain
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}
export default withStyles(style)(SubDomainForm);
