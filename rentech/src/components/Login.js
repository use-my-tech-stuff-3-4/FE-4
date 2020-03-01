import React from "react";
/* import { useFormik, withFormik, Form, Field } from "formik";
import * as yup from "yup"; */
import { axiosWithAuth } from '../utilities/axiosWithAuth';

/* Commented this out because I am still figuring out how to incorporate it into the
class component I wrote below. Didn't want to delete the code that Pedro wrote with 
Formik / Yup since that is part of his build week requirements -- Christine 

  const Login = ({ touched, errors, values, status }) => {
  console.log(status); //DATA FROM FORM, A USESTATE SHOULD BE CREATED TO SET FORM VALUES
}
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
})(Login); */

////////////


const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: ""
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  }

  login = e => {
    e.preventDefault();
    //console.log('credentials', this.state.credentials);
    //console.log('headers', config)
    axiosWithAuth()
      .post("/users/login", this.state.credentials, config)
      .then(res => {
        console.log('in the post request')
        localStorage.setItem("token", res.data.payload);
        this.props.history.push("/");
      })
      .catch(err => {
        localStorage.removeItem("token");
        console.log("invalid login: ", err);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button>Log In</button>
        </form>
        <button onClick={localStorage.clear()}>Log Out</button>
      </div>
    )
  }
}
export default Login;
