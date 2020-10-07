import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.scss";
import { Link } from "react-router-dom";
import DatePlanner from './DatePlanner.js'
import Clothing from './Clothing.js'

export default function Profile(props) {
  const [categories, setCategories] = useState([]);

  const user_email = localStorage.getItem("email");

  const user_id = localStorage.getItem("user_id");

  const [allClothing, setAllClothing] = useState(false);

  const [showCategoryClothing, setShowCategoryClothing] = useState(false);

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

  const [clothing, setClothing] = useState([]);

  
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/closet/clothing")
      .then((response) => {
        setClothing(response.data);
      })
      .catch((error) => console.log("error"));
  }, []);


  console.log(categories, "categories");
  console.log(allClothing,"allclothing")

  return (
    <div>
      <h1 className="profile-heading">{user_email}'s closet</h1>
      <Link to={`/clothing/category/add`}>
        <button className="edit-button">Add New Category</button>
      </Link>
      <button onClick={ () => setAllClothing(!allClothing)}>
        {allClothing ? "View Clothing Categories" : "View All Clothing"}
        </button>
   
      <div className="outer-div"> 
     { allClothing ? <div className="clothing-div"> <Clothing allClothing={allClothing}/> </div> :
      <div className="clothing-list-div">
       
        {userCatergories.map((category) => {
          return (
            <div className="clothing-div" key={category.id}>
              <h1 className="cat-name"> {category.name}</h1>

              <button
              onClick={ () => setShowCategoryClothing(!showCategoryClothing)}
                onClick={(e) => {
                  localStorage.setItem("category_id", category.id);
                  localStorage.setItem("category_name", category.name);
                }}
                className="movelist-move"
                to={`/clothing`}
              >
                <img className="category-img" src={category.image_url} />
              </button>

              
              <h3>{category.description}</h3>
              <Link to={`/clothing/category/edit/${category.id}`}>
            <button className="edit-button">Edit category</button>
          </Link>
          <Link to={`/clothing/category/delete/${category.id}`}>
            <button className="edit-button">Delete category</button>
          </Link>
            </div>
          );
        })
        }
      </div>
}
{ !allClothing ? 
      <div className="calendar-div">
      <DatePlanner/>
      </div>
      : null
      }
      </div>
    </div>
  );
}
