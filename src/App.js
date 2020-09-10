import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Link, withRouter } from "react-router-dom";
import Profile from "./Profile.js";
import NavBar from "./NavBar.js";
import Register from './Register.js'
import Login from './Login.js'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Route exact path="/profile" component={Profile}></Route>
      <Route exact path="/register" component={Register}></Route>
      <Route exact path="/login" component={Login}></Route>



    </div>
  );
}

export default App;
