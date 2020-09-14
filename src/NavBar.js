import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./NavBar.scss";

const NavBar = (props) => {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("category_id");
    props.history.push("/");
  };

  return (
    <div>
      <div className="Nav">
        <div className="navleft">
          <NavLink to="/">
            <p className="quote">Virtual Closet</p>
          </NavLink>
        </div>
        {/* <NavLink >Home</NavLink> */}
        {token ? (
          <NavLink to="/profile">Profile</NavLink>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
        {token ? (
          <NavLink to="/" onClick={handleLogout}>
            Logout
          </NavLink>
        ) : (
          <NavLink to="/register">Register</NavLink>
        )}
      </div>
    </div>
  );
};

export default withRouter(NavBar);
