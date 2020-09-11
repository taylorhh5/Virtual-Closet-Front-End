import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.scss";
import { Link } from "react-router-dom";

export default function Profile(props) {
  // console.log(props, "props in profile");
  const [categories, setCategories] = useState([]);

  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/closet/categories")
      .then((response) => {
        // console.log(response.data, "response.data");
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
      <section>
        {userCatergories.map((category) => {
          return (
            <div key={category.id}>
              <h1> {category.name}</h1>
              <Link  onClick={e => localStorage.setItem('category_id', category.id)}  className="movelist-move" to={`/clothing`}>
                <img className="category-img" src={category.image_url} />
                {/* <button className="edit-button" onClick={e => localStorage.setItem('category_id', category.id)}>Edit this move</button> */}
              </Link>
              <h3>{category.description}</h3>
            </div>
          );
        })}
      </section>
    </div>
  );
}
