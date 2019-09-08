import Joi from "@hapi/joi";
const config = {
  restApi: {
    defaultDomain: "https://app.api.convin.ai",
    defaultConfig: {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNTY3NDMzNTcxLCJlbWFpbCI6ImFkbWluQGNvbnZpbi5haSJ9.89f8tqaVy16JRbCOqoWIHFwQ1m5dQnVe8fEqLrtziTU"
      }
    }
  },
  registrationForm: {
    fields: [
      { label: "User Name", name: "username", type: "text", required: true },
      { label: "Password", name: "password", type: "password", required: true },
      { label: "First Name", name: "first_name", type: "text", required: true },
      {
        label: "Middle Name",
        name: "middle_name",
        type: "text",
        required: true
      },
      { label: "Last Name", name: "last_name", type: "text", required: true },
      { label: "Email Address", name: "email", type: "email", required: true },
      {
        label: "Phone Number",
        name: "primary_phone",
        type: "text",
        required: true
      }
    ],
    validationSchema: {}
  },
  loginForm: {
    fields: [
      { label: "User Name", name: "username", type: "text", required: false },
      { label: "Password", name: "password", type: "password", required: false }
    ],
    validationConditions: {
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
    }
  }
};

export default config;
