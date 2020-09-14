import React, { useState, useEffect } from "react";
import axios from "axios";

import { withRouter } from "react-router";

const PostClothing = (props) => {
    
  const category_id = localStorage.getItem("category_id");
  const user_id = localStorage.getItem("user_id");
  const category_name = localStorage.getItem("category_name");

  const credentials = {
    name: "",
    description: "",
    image_url: "",
    user_id: user_id,
    category_id: category_id,
  };
  const [clothing, setClothing] = useState(credentials);

  const handleChange = (event) => {
    event.persist();
    setClothing({
      ...clothing,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/closet/clothing", clothing)
      .then((response) => {
        console.log(response, "post clothing response");
        props.history.push('/profile')
      })
      .catch((err) => alert("Clothing could not be added, please try again"));
  };

  return (
    <>
      <form className="registerForm" onSubmit={handleLogin}>
  <h1 className="signup">Add clothing to {category_name}</h1>

        <input
          className="registerInput"
          type="text"
          name="name"
          value={clothing.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          className="registerInput"
          type="text"
          name="description"
          value={clothing.description}
          onChange={handleChange}
          placeholder="Description"
        />
             <input
          className="registerInput"
          type="text"
          name="image_url"
          value={clothing.image_url}
          onChange={handleChange}
          placeholder="Image URL"
        />
 
        <button className="signup-button">Add Clothing</button>
      </form>
    </>
  );
};

export default PostClothing;
