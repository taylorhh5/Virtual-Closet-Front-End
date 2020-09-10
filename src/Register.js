import React, { useState, useEffect } from "react";
import axios from 'axios';

import { withRouter } from "react-router";
import "./Register.scss"

const Register = (props) => {
    const credentials = {
        email: '',
        password: ''
      }
      const [signUp, setSignUp] = useState(credentials)
    
      const handleChange = event => {
        event.persist()
        setSignUp({
          ...signUp,
          [event.target.name]: event.target.value
        });
      }

    const handleLogin = event => {
        event.preventDefault();
        axios
          .post('http://localhost:5000/api/users/register', signUp)
          .then(response => {
            console.log(response, "register response")
            // props.history.push('/login')
          })
          .catch(err => alert("Please choose a different username and password") );
      }
    
      return (
        <>
        
          <form className="registerForm" onSubmit={handleLogin}>
            <h1 className="signup">Sign up</h1>
      
            <input
             className="registerInput"
              type="text"
              name="email"
              value={signUp.email}
              onChange={handleChange}
              placeholder=" Email"
            />
            <input
            className="registerInput"
              type="password"
              name="password"
              value={signUp.password}
              onChange={handleChange}
              placeholder=" Password"
            />
      
            <button className="signup-button">Sign up</button>
          </form>
        </>
      );
    };


    export default Register;