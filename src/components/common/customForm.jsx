import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles({
  root: {},
  paper: {
    padding: 25
  }
});

function CustomForm({ fields, userRegister, error }) {
  const classes = useStyles();
  return (
    <div>
      <form onSubmit={this.handleSubmit}>
        <FormControl fullWidth>
          {fields.map(field => (
            <FormGroup key={field.name}>
              <TextField
                label={field.label}
                value={userRegister[field.name]}
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
          <FormGroup>
            <Button variant={"contained"} color="primary" type="submit">
              Register Now
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </div>
  );
}
CustomForm.prototype = {
  fields: PropTypes.array.isRequired,
  userRegister: PropTypes.object.isRequired,
  error: PropTypes.object
};

export default CustomForm;
