import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Link, withRouter } from "react-router-dom";
import Profile from "./Profile.js";
import NavBar from "./NavBar.js";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Route exact path="/profile" component={Profile}></Route>

      <h1>Virtual Closet</h1>
    </div>
  );
}

export default App;
