import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./NavBar.scss";

const NavBar = (props) => {

 


  return (
    <div>
   
        <div className="Nav">
          <div className="navleft">
              <NavLink to="/">
          <p className="quote">Virtual Closet</p>
           </NavLink>
               
            </div>
          {/* <NavLink >Home</NavLink> */}
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/login">Login</NavLink>

          <NavLink to="/register">Register</NavLink>


          {/* <NavLink >
            Logout
          </NavLink> */}
         
        </div>
     
    </div>
  );
};

export default withRouter(NavBar);
