import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.scss";
import { Link } from "react-router-dom";
import DatePlanner from "./DatePlanner.js";
import Clothing from "./Clothing.js";

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
  console.log(clothingCategories, "clothingCategories");
  console.log(showCategoryClothing, "showCategoryClothing");

  return (
    <div>
      <h1 className="profile-heading">{user_email}'s closet</h1>
      <div className="button-div">
        {showCategoryClothing === false ? (
          <Link to={`/clothing/category/add`}>
            <button className="button-style button-left">
              Add New Category
            </button>
          </Link>
        ) : (
          <button
            className="button-style button-left"
            onClick={() => setShowCategoryClothing(!showCategoryClothing)}
          >
            View Categories
          </button>
        )}
      
        <Link to={`/clothing`}>
          <button
            className="button-style button-right"
            onClick={() => setShowCategoryClothing(!showCategoryClothing)}
          >
            View All Clothing
          </button>
        </Link>

        <h2 className="calendar-header">Calendar</h2>
      </div>

      <div className="outer-div">
        {showCategoryClothing ? (
          <div className="clothing-list-div">
            <Clothing clothingCategories={clothingCategories} />
          </div>
        ) : (
          <div className="clothing-list-div">
            <h3>You have {userCatergories.length} categories.</h3>
            {userCatergories.map((category) => {
              return (
                <div className="clothing-div" key={category.id}>
                  <h1 className="cat-name"> {category.name}</h1>

                  <img
                    onClick={(e) => {
                      setShowCategoryClothing(!showCategoryClothing);

                      localStorage.setItem("category_id", category.id);
                      localStorage.setItem("category_name", category.name);
                    }}
                    className="category-img"
                    src={category.image_url}
                  />

                  <h3>{category.description}</h3>
                  <Link to={`/clothing/category/edit/${category.id}`}>
                    <button className="button-style">Edit category</button>
                  </Link>
                  <Link to={`/clothing/category/delete/${category.id}`}>
                    <button className="button-style">Delete category</button>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
        {clothingCategories ? (
          <div className="calendar-div">
            <DatePlanner />
          </div>
        ) : null}
      </div>
    </div>
  );
}
