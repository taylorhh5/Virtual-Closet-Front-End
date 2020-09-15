import React, { useState, useEffect } from "react";
import axios from "axios";

import { withRouter } from "react-router";

const EditCategory = (props) => {


  const details = {
    name: "",
    description: "",
    image_url: "",
  };
  const [category, setCategory] = useState(details);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/closet/category/${props.match.params.id}`)
      .then((response) => {
        setCategory(response.data);
      })
      .catch((error) => console.log("error"));
  }, []);


  const handleChange = (event) => {
    event.persist();
    setCategory({
      ...category,
      [event.target.name]: event.target.value,
    });
  };

  const handleInput = (event) => {
    event.preventDefault();
    axios
      .put(
        `http://localhost:5000/api/closet/category/${props.match.params.id}`,
        category
      )
      .then((response) => {
        props.history.push("/profile");
      })
      .catch((err) => alert("Category could not be eidted, please try again"));
  };

  return (
    <>
      <form className="registerForm" onSubmit={handleInput}>
        <h1 className="signup">Edit category</h1>

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

        <button className="signup-button">Edit category</button>
      </form>
    </>
  );
};

export default EditCategory;
