import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
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
}));

function SubDominePopUp({ error, subDomain, handleSubmit, handleChange }) {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <form onSubmit={handleSubmit}>
        <FormLabel className={classes.formLabel}>
          Create A Custom Sub-Domine
        </FormLabel>
        <FormGroup className={classes.textField}>
          <TextField
            error={error ? true : false}
            label="Enter Your Sub-Domine"
            value={subDomain}
            onChange={handleChange}
            margin="normal"
            fullWidth
            name="subDomain"
          />
          <FormHelperText error={error ? true : false}>{error}</FormHelperText>
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
  );
}
SubDominePopUp.propTypes = {
  subDomain: PropTypes.string,
  error: PropTypes.string
};

export default SubDominePopUp;
