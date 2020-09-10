import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.scss";


export default function Profile() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/closet/categories")
      .then((response) => {
        console.log(response.data, "response.data");
        setCategories(response.data);
      })
      .catch((error) => console.log("error"));
  }, []);
  console.log(categories,"categories")

  return (
    <div>
         <h1>Profile</h1>
      <section>
        {categories.map((category) => {
          return <div key={category.id}><h1> {category.name}</h1>
       
          <img className="category-img" src={category.image_url} /> 
            <h3>{category.description}</h3>
          </div>;
        })}
      </section>

     
    </div>
  );
}
