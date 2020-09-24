import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.scss";

import { Link } from "react-router-dom";

export default function Clothing(props) {
  console.log(props, "props in clothing");

  const [clothing, setClothing] = useState([]);

  const category_id = localStorage.getItem("category_id");
  const category_name = localStorage.getItem("category_name");
  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/closet/clothing")
      .then((response) => {
        console.log(response.data, "response.data");
        setClothing(response.data);
      })
      .catch((error) => console.log("error"));
  }, []);
  console.log(clothing, "clothing");

  //   if (!clothing) {
  //     return <h1>Loading...</h1>;
  //   }
  if (props.loading) {
    return <h1>Loading...</h1>;
  }
  const userClothing = clothing.filter(
    (data) => `${data.category_id}` === category_id
  );

  const userAllClothing = clothing.filter(
    (data) => `${data.user_id}` === user_id
  );

  return (
    <div>
      <h1>{category_name}</h1>
      <Link to={`/clothing/add`}>
        <h2>Add Clothing</h2>
      </Link>
{props.allClothing ?
      <section className="clothing-items-div">
        {userAllClothing.map((clothing) => {
          return (
            <div  key={clothing.id}>
              <h1> {clothing.name}</h1>

              <img className="clothing-img" src={clothing.image_url} />
              <h3>{clothing.description}</h3>
              <Link to={`/clothing/edit/${clothing.id}`}>
                <button className="edit-button">Edit clothing item</button>
              </Link>
              <Link to={`/clothing/delete/${clothing.id}`}>
                <button className="edit-button">Delete clothing item</button>
              </Link>
            </div>
          );
        })}
      </section>
      :
      <section>
        {userClothing.map((clothing) => {
          return (
            <div key={clothing.id}>
              <h1> {clothing.name}</h1>

              <img className="clothing-img" src={clothing.image_url} />
              <h3>{clothing.description}</h3>
              <Link to={`/clothing/edit/${clothing.id}`}>
                <button className="edit-button">Edit clothing item</button>
              </Link>
              <Link to={`/clothing/delete/${clothing.id}`}>
                <button className="edit-button">Delete clothing item</button>
              </Link>
            </div>
          );
        })}
      </section>
}
    </div>
  );
}
