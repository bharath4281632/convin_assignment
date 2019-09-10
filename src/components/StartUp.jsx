import React, { useState } from "react";
import Login from "./login";
import Register from "./register";

//Material Ui Component
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

//material-ui custom Style
const useStyles = makeStyles({
  root: {
    position: "absolute",
    left: "50%",
    top: "50px",
    transform: "translateX(-50%)",
    width: 540
  }
});
function StartUp({ ...rest }) {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (valu, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div className={classes.root} {...rest}>
      <Paper>
        <Tabs
          value={tabValue}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleTabChange}
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

export default StartUp;
