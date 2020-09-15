import React, { useState, useEffect } from "react";
import axios from "axios";

import { withRouter } from "react-router";

const EditClothing = (props) => {
  console.log(props, "props in edit");
  const category_id = localStorage.getItem("category_id");
  const user_id = localStorage.getItem("user_id");
  const category_name = localStorage.getItem("category_name");

  const details = {
    name: "",
    description: "",
    image_url: "",
  };
  const [clothing, setClothing] = useState(details);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/closet/clothing/${props.match.params.id}`)
      .then((response) => {
        setClothing(response.data);
      })
      .catch((error) => console.log("error"));
  }, []);


  const handleChange = (event) => {
    event.persist();
    setClothing({
      ...clothing,
      [event.target.name]: event.target.value,
    });
  };

  const handleInput = (event) => {
    event.preventDefault();
    axios
      .put(
        `http://localhost:5000/api/closet/clothing/${props.match.params.id}`,
        clothing
      )
      .then((response) => {
        props.history.push("/profile");
      })
      .catch((err) => alert("Clothing could not be eidted, please try again"));
  };

  return (
    <>
      <form className="registerForm" onSubmit={handleInput}>
        <h1 className="signup">Edit clothing</h1>

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

        <button className="signup-button">Edit Clothing</button>
      </form>
    </>
  );
};

export default EditClothing;
