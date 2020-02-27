import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup"; // for everything

const Login = ({ touched, errors, values, status }) => {
  
  
  const [onSubmit, setOnSubmit] = useState([])

  useEffect(() => {
    status && setOnSubmit(status);   //DATA FROM FORM
  }, [status]);
  
console.log(onSubmit)

 

  return (
    <Form className="form">
      <label>
        <Field
          className="field"
          name="username"
          type="text"
          placeholder="username"
        />
        {touched.username && errors.username && (
          <div className="error">{errors.username}</div>
        )}
      </label>
      <label>
        <Field
          className="field"
          name="password"
          type="password"
          placeholder="password"
        />
        {touched.password && errors.password && (
          <div className="error">{errors.password}</div>
        )}
      </label>
      <label>
        <button className="button">Login</button>
      </label>
    </Form>
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    username: "",
    password: ""
  }),
  validationSchema: yup.object().shape({
    username: yup
      .string()
      .required('required'),
    password: yup.string().min(8)
  }),
  handleSubmit: (values, { resetForm, setStatus }) => {
    // console.log("Submitting!", formikBag)
    // POST body === {}
    setStatus(values);
    resetForm();
  }
})(Login);
