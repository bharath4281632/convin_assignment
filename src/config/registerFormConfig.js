const registrationForm = {
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
  ]
};
export default registrationForm;
