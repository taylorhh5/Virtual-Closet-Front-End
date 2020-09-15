import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.scss";
import { Link } from "react-router-dom";

export default function Profile(props) {
  const [categories, setCategories] = useState([]);

  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/closet/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => console.log("error"));
  }, []);

  const userCatergories = categories.filter(
    (data) => `${data.user_id}` === user_id
  );
  console.log(categories, "categories");

  return (
    <div>
      <h1>Profile</h1>
      <Link to={`/clothing/category/add`}>
        <button className="edit-button">Add New Category</button>
      </Link>
      <section>
        {userCatergories.map((category) => {
          return (
            <div key={category.id}>
              <h1> {category.name}</h1>
              <Link
                onClick={(e) => {
                  localStorage.setItem("category_id", category.id);
                  localStorage.setItem("category_name", category.name);
                }}
                className="movelist-move"
                to={`/clothing`}
              >
                <img className="category-img" src={category.image_url} />
              </Link>
              <h3>{category.description}</h3>
              <Link to={`/clothing/category/edit/${category.id}`}>
            <button className="edit-button">Edit category</button>
          </Link>
            </div>
          );
        })}
      </section>
    </div>
  );
}
