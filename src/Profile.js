import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Profile() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/closet/clothing")
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
          return <div><h1> {category.name}</h1>
          <h2>{category.description}</h2>
          </div>;
        })}
      </section>

     
    </div>
  );
}
