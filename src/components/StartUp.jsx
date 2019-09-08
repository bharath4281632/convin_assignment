import React, { Component } from "react";

import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import { withStyles } from "@material-ui/core/styles";
import Login from "./login";
import Register from "./register";
import { currentUser } from "../services/authUser";

//material-ui custom Style

const styles = theme => ({
  root: {
    position: "absolute",
    left: "50%",
    top: "50px",
    transform: "translateX(-50%)",
    width: 540
  }
});
class StartUp extends Component {
  state = {
    tabValue: 0
  };
  componentDidMount() {
    console.log(currentUser());
  }
  handleTabChange = (valu, newValue) => {
    this.setState({ tabValue: newValue });
  };
  render() {
    const { classes, ...rest } = this.props;
    const { tabValue } = this.state;
    return (
      <div className={classes.root} {...rest}>
        <Paper>
          <Tabs
            value={tabValue}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleTabChange}
            centered
          >
            <Tab label="Register Now" />
            <Tab label="Log In"></Tab>
          </Tabs>
          {tabValue === 1 ? <Login></Login> : null}
          {tabValue === 0 ? <Register></Register> : null}
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(StartUp);
