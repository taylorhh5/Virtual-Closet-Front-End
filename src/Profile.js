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

  const [clothingCategories, setclothingCategories] = useState(true);

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
  console.log(clothingCategories,"clothingCategories")
  console.log(showCategoryClothing,"showCategoryClothing")


  return (
    <div>
      <h1 className="profile-heading">{user_email}'s closet</h1>

      { showCategoryClothing === false ? 
      <Link to={`/clothing/category/add`}>
        <button className="button-style">Add New Category</button>
      </Link>
    :
    
    <button className="button-style" onClick={ () => setShowCategoryClothing(!showCategoryClothing)} >View Categories</button>  
    }
      {/* <button onClick={ () => setShowCategoryClothing(!showCategoryClothing)}>
        {clothingCategories ? "View Clothing Categories" : "View All Clothing"}
        </button> */}
        <Link to={`/clothing`}>
            <button className="button-style" onClick={ () => setShowCategoryClothing(!showCategoryClothing)}>View All Clothing</button>
          </Link>
   
      <div className="outer-div"> 
     { showCategoryClothing ? <div className="clothing-list-div"> <Clothing clothingCategories={clothingCategories}/> </div> :
      <div className="clothing-list-div">
       
        {userCatergories.map((category) => {
          return (
            <div className="clothing-div" key={category.id}>
              <h1 className="cat-name"> {category.name}</h1>

              <button
             
                onClick={(e) => {
                  localStorage.setItem("category_id", category.id);
                  localStorage.setItem("category_name", category.name);
                }}
                className="movelist-move"
                to={`/clothing`}
              >
                <img   onClick={ (e) => setShowCategoryClothing(!showCategoryClothing)}className="category-img" src={category.image_url} />
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
{ clothingCategories ? 
      <div className="calendar-div">
      <DatePlanner/>
      </div>
      : null
      }
      </div>
    </div>
  );
}
