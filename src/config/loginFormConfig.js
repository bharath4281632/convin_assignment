const loginForm = {
  defaultValue: {
    username: "",
    password: ""
  },
  fields: [
    { label: "User Name", name: "username", type: "text", required: true },
    { label: "Password", name: "password", type: "password", required: true }
  ]
};
export default loginForm;
