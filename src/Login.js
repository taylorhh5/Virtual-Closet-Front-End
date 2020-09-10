import React, { useState, useEffect } from "react";
import axios from 'axios';
import { withRouter } from "react-router";
import "./Login.scss";

const Login = (props) => {
  const credentials = {
    email: "",
    password: "",
  };
  const [login, setlogin] = useState(credentials);

  const handleChange = (event) => {
    event.persist();
    setlogin({
      ...login,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = event => {
    event.preventDefault();
    axios
      .post('http://localhost:5000/api/users/login', login)
      .then(response => {
        console.log(response, "login response")
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user_id', response.data.id)
        localStorage.setItem('email', response.data.email)
        props.history.push('/')
      })
      .catch(err => 
       
        alert("Incorrect credentials, please try logging in again.") );
  }
 

  return (
    <>
      <form className="loginForm" onSubmit={handleLogin}>
        <label className ="loginLabel">
          Email
          <input
          className="loginInput"
            type="text"
            name="email"
            value={login.email}
            onChange={handleChange}
          />
        </label>
        <label className ="loginLabel">
          Password
        <input
          type="password"
          name="password"
          value={login.password}
          onChange={handleChange}
          // placeholder=" Password"
        />
</label>
        <button className="loginButton">Log In</button>
      </form>
    </>
  );
};


export default Login;
