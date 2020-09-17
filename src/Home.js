import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div>
        <h1>Welcome to Virtual Closet</h1>
        <p>A place to plan, view, and organize your closet.</p>
      </div>
      <div>
        <Link to={"/demo"}>
          <h2>Check out the demo</h2>
        </Link>
      </div>
      <img
        className="welcome-img"
        src={
          "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        }
      />
    </div>
  );
}

export default Home;
