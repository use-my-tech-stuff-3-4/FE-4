import React from "react";
import { axiosWithAuth } from '../utilities/axiosWithAuth';
import { connect } from 'react-redux';
import { loginUser, getAllUsers, setCurrentUser } from '../actions';
import TextField from "material-ui/TextField";


const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

class Login extends React.Component {
  state = {
    credentials: {
      id: 0,
      username: "",
      password: "",
      items: []
    }
  };

  componentDidMount() {
    this.props.getAllUsers();
  }

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  }

  findCurrentUser = (username) => {
    for (let i = 0; i < this.props.allUsers.length; i++) {
      if (username === this.props.allUsers[i].username) {
        this.setState({
          credentials: {
            ...this.state.credentials,
            id: this.props.allUsers[i].id,
            items: this.props.allUsers[i].items
          }
        })
        //console.log('updated current user upon login, should have id now', this.state.credentials)
      }
    }
  }


  login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/users/login", this.state.credentials, config)
      .then(res => {
        window.localStorage.setItem("token", res.data.token);
        this.findCurrentUser(this.state.credentials.username);
        window.localStorage.setItem("current_user", JSON.stringify(this.state.credentials))
        this.props.setCurrentUser(this.state.credentials);
        this.props.history.push("/profile")
      })
      .catch(err => {
        localStorage.removeItem("token");
        console.log("error in login POST request ", err);
      });

  };

  render() {
    //console.log('localStorage', window.localStorage)
    return (
      <div>
        <form onSubmit={this.login} className="form">
          <h2>LOGIN</h2>
          <TextField hintText="username">
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          /></TextField>
          <TextField hintText="password" >
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          /></TextField>
          <button class="ui green button">Log In</button>
        </form>
        <button class="ui red button" id="log-out">Log Out</button>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    allUsers: state.allUsers,
    userData: state.userData,
    error: state.error,
    isPostingData: state.isPostingData
  }
}

export default connect(
  mapStateToProps,
  { loginUser, getAllUsers, setCurrentUser }
)(Login);


////OLD CODE///// 
/* import { useFormik, withFormik, Form, Field } from "formik";
import * as yup from "yup"; */

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