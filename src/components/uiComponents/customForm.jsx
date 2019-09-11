import React from "react";
import PropTypes from "prop-types";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";

function CustomForm({
  fields,
  fieldState,
  error,
  handleChange,
  handleSubmit,
  submitContent
}) {
  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth>
        {fields.map(field => (
          <FormGroup key={field.name}>
            <TextField
              label={field.label}
              value={fieldState[field.name]}
              onChange={handleChange}
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
            {submitContent}
          </Button>
        </FormGroup>
      </FormControl>
    </form>
  );
}
CustomForm.propTypes = {
  fields: PropTypes.array.isRequired,
  fieldState: PropTypes.object.isRequired,
  error: PropTypes.object,
  submitContent: PropTypes.string.isRequired
};

export default CustomForm;
