import React from "react";
import axios from 'axios';
import TextField from "material-ui/TextField";



const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}



class Register extends React.Component {

  state = {
    userInfo: {
      username: "",
      password: "",
      type: ""
    },

    userErrors: {
      usernameError: "",
      passwordError: "",
      typeError: ""
    }
  };


  handleChange = e => {
  
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        [e.target.name]: e.target.value
      }
    });
  
  }

  validate = () => {

    let isError = false;
    const errors = {

      usernameError: "",
      passwordError: "",
      typeError: ""
    };

    if (this.state.userInfo.username.length < 4) {
      isError = true;
      errors.usernameError = "Username needs to be at least 3 characters long"
      console.log(errors)
    }

    if (!this.state.userInfo.password) {
      isError = true;
      errors.passwordError = "password required"
      console.log(errors)
    }

    if (!this.state.userInfo.type) {
      isError = true;
      errors.typeError = "are you owner or renter? choose an option"
      console.log(errors)
    }

    if (isError) {

      this.setState({
        userErrors: {
          ...this.state.userErrors,
          ...errors
        }
      })
    }


    return isError;



  }

  registerUser = e => {
    e.preventDefault();

    const errorCheck = this.validate();
    console.log(errorCheck)
    if (!errorCheck) {
      console.log(this.state.userInfo)
      axios
        .post("https://use-my-tech-stuff-4.herokuapp.com/api/users/register", this.state.userInfo, config)
        .then(res => {
          console.log('in the registration form post request')
          this.props.history.push("/login");
         
        })
        .catch(err => {
          console.log("unable to register user due to error:", err);
        });
    }
    
    
  };

  render() {
    return (
      <div>
        <form onSubmit={this.registerUser} className="form">
        <h2>REGISTER</h2>
          <TextField
            type="text"
            name="username"
            floatingLabelText="username"
            hintText="username"
            value={this.state.userInfo.username}
            onChange={this.handleChange}
            errorText={this.state.userErrors.usernameError}
            floatingLabelFixed
            className="field"
          />


          <TextField
            type="password"
            name="password"
            floatingLabelText="password"
            hintText="password"
            value={this.state.userInfo.password}
            onChange={this.handleChange}
            errorText={this.state.userErrors.passwordError}
            floatingLabelFixed
            className="field"
          />
          <TextField
            type="text"
            name="type"
            floatingLabelText="'owner' or 'renter'?"
            hintText="'owner' or 'renter'?"
            value={this.state.userInfo.type}
            onChange={this.handleChange}
            errorText={this.state.userErrors.typeError}
            loatingLabelFixed
            className="field"
          />
          <button class="ui green button" >Register</button>
        </form>
      </div>
    )
  }
}
export default Register;


// OLD CODE 

//import { withFormik, Form, Field } from "formik";
//import * as yup from "yup"; // for everything

/* const Register = ({ touched, errors, values, status }) => {

  //console.log(status);
  //DATA FROM FORM, A USESTATE SHOULD BE CREATED TO SET FORM VALUES

  return (
    <Form className="form">
      <label>
        <Field
          className="field"
          name="username"
          type="text"
          placeholder="username"
          onChange={handleChange}
          value={credentials.username}
        />
        {touched.username && errors.username && (
          <div className="error">{errors.username}</div>
        )}
      </label>
      <label>
        <Field
          className="field"
          name="password"
          type="current-password"
          placeholder="password"
          onChange={handleChange}
          value={credentials.password}
        />
        {touched.password && errors.password && (
          <div className="error">{errors.password}</div>
        )}
      </label>
      <label>
        <Field className="field" component="select" name="type">
          <option>owner or renter?</option>
          <option value="renter">Renter</option>
          <option value="owner">Owner</option>
        </Field>
        {touched.type && errors.type && (
          <div className="error">{errors.type}</div>
        )}
      </label>
      <label>
        <button className="button">Register</button>
      </label>
    </Form>
  );
}; */

/* export default withFormik({
  mapPropsToValues: props => ({

    username: "",
    password: "",
    type: ""

  }),

  validationSchema: yup.object().shape({
    username: yup
      .string()
      .required('required'),
    password: yup.string().min(8),
    type: yup
      .string()
      .required('select an option')
  }),

  handleSubmit: (values, { resetForm, setStatus }) => {
    axios
      .post("/users/register", credentials, config)
      .then(res => {
        console.log('in the registration form post request')
        // props.history.push("/login");
      })
      .catch(err => {
        console.log("could not register user due to error: ", err);
      });

    setStatus(values);
    resetForm();
  }
})(Register); */
