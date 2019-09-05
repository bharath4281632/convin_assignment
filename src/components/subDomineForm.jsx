import React, { Component } from "react";
import httpClients from "../services/httpClients";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import {
  FormLabel,
  FormGroup,
  TextField,
  Button,
  FormHelperText
} from "@material-ui/core";
const style = theme => ({
  root: {
    position: "absolute",
    width: 620,
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    justifyContent: "center"
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
    subDomain: ""
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };
  handleSubmit = async e => {
    e.preventDefault();
    // console.log(this.state.subDomain);
    try {
      const response = await httpClients.postHttp("/domains/", {
        name: this.state.subDomain
      });
      console.log("The response try");
      console.log(response);
    } catch (ex) {
      console.log("error is executied");
      if (ex.data && ex.status(504)) {
        console.error("The request not reponding");
      }
    }
  };
  render() {
    const { classes } = this.props;
    const { subDomain } = this.state;
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <form onSubmit={this.handleSubmit}>
            <FormLabel classes={{ root: classes.formLabel }}>
              Create A Custom Sub-Domine
            </FormLabel>
            <FormGroup className={classes.textField}>
              <TextField
                id="standard-name"
                label="Enter Your Sub-Domine"
                value={subDomain}
                onChange={this.handleChange}
                margin="normal"
                fullWidth
                name="subDomain"
              />
              <FormHelperText>
                You can access the subDomain as a Independent Url
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
