import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Link, withRouter } from "react-router-dom";
import Profile from "./Profile.js";
import NavBar from "./NavBar.js";
import Register from './Register.js'
import Login from './Login.js'
import Clothing from './Clothing.js'
import PostClothing from './PostClothing.js'
import EditClothing from './EditClothing.js'
import PostCategory from './PostCategory.js'
import EditCategory from './EditCategory.js'
import DeleteClothing from './DeleteClothing.js'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Route path="/profile" component={Profile}></Route>
      <Route path="/register" component={Register}></Route>
      <Route path="/login" component={Login}></Route>
      <Route exact path="/clothing" component={Clothing}></Route>
      <Route exact path="/clothing/add" component={PostClothing}></Route>
      <Route exact path="/clothing/edit/:id" component={EditClothing}></Route>
      <Route exact path="/clothing/delete/:id" component={DeleteClothing}></Route>

      <Route exact path="/clothing/category/add" component={PostCategory}></Route>
      <Route exact path="/clothing/category/edit/:id" component={EditCategory}></Route>








    </div>
  );
}

export default App;
