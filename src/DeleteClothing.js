import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function DeleteClothing(props) {
    
  const handleDelete = (event) => {
    event.preventDefault();
    axios
      .delete(
        `http://localhost:5000/api/closet/clothing/${props.match.params.id}`
      )
      .then((response) => {
        props.history.push("/profile");
      })
      .catch((err) => alert("Clothing could not be deleted, please try again"));
  };

  return (
    <div>
      <h2>Are you sure you want to delete this item of clothing?</h2>
      <button
        onClick={(event) => {
          handleDelete(event);
        }}
      >
        Delete
      </button>

      <Link to={`/clothing`}>
        <button>Cancel</button>
      </Link>
    </div>
  );
}

export default DeleteClothing;
