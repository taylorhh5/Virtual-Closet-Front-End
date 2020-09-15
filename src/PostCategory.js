import React, { useState, useEffect } from "react";
import axios from "axios";

import { withRouter } from "react-router";

const PostCategory = (props) => {
  const user_id = localStorage.getItem("user_id");

  const details = {
    name: "",
    description: "",
    image_url: "",
    user_id: user_id,
  };
  const [category, setCategory] = useState(details);

  const handleChange = (event) => {
    event.persist();
    setCategory({
      ...category,
      [event.target.name]: event.target.value,
    });
  };

  const handleForm = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/closet/category", category)
      .then((response) => {
        console.log(response, "post category response");
        props.history.push("/profile");
      })
      .catch((err) => alert("Category could not be added, please try again"));
  };

  return (
    <>
      <form className="registerForm" onSubmit={handleForm}>
        <h1 className="signup">Add category</h1>

        <input
          className="registerInput"
          type="text"
          name="name"
          value={category.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          className="registerInput"
          type="text"
          name="description"
          value={category.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          className="registerInput"
          type="text"
          name="image_url"
          value={category.image_url}
          onChange={handleChange}
          placeholder="Image URL"
        />

        <button className="signup-button">Add category</button>
      </form>
    </>
  );
};

export default PostCategory;
