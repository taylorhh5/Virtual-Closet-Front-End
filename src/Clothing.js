import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.scss";

export default function Clothing(props) {
    console.log(props,"props on clothing")


  const [clothing, setClothing] = useState([]);

  const category_id = localStorage.getItem("category_id");

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
    return <h1>Loading...</h1>
  }
  const userClothing = clothing.filter(
    (data) => `${data.category_id}` === category_id
  );


  return (
    <div>
      <h1>Clothes</h1>
      <section>
        {userClothing.map((clothing) => {
          return (
            <div key={clothing.id}>
              <h1> {clothing.name}</h1>

              <img className="clothing-img" src={clothing.image_url} />
              <h3>{clothing.description}</h3>
            </div>
          );
        })}
      </section>
    </div>
  );
}
